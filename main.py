#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Gera um único arquivo Markdown com o conteúdo dos arquivos de uma pasta.
"""

import sys
import mimetypes
import logging
import subprocess
import argparse
import re  # Adicionado para expressões regulares (remover comentários)
from pathlib import Path
from datetime import datetime

# Configuração do logger
logging.basicConfig(
    level=logging.INFO,
    format='[%(levelname)s] %(message)s'
)
logger = logging.getLogger(__name__)


class Config:
    """Configurações centralizadas para o script."""
    CHECK_TYPESCRIPT_ERRORS = True
    INCLUDE_SELF_IN_OUTPUT = False

    # --- NOVAS CONFIGURAÇÕES ---
    STRIP_COMMENTS_AND_BLANK_LINES = True  # Ativa a remoção de ruído
    COLLAPSIBLE_EXTENSIONS = {".json", ".css", ".html", ".svg", ".md", ".xml", ".yml", ".yaml"}
    COLLAPSIBLE_PATHS = {"components/ui"} # Pastas inteiras para colapsar

    LANG_BY_EXT = {
        ".md": "md", ".markdown": "md", ".txt": "", ".rst": "rst",
        ".html": "html", ".htm": "html", ".xml": "xml", ".json": "json",
        ".yml": "yaml", ".yaml": "yaml", ".csv": "csv", ".tsv": "tsv",
        ".py": "python", ".ipynb": "json", ".js": "javascript", ".ts": "ts",
        ".tsx": "tsx", ".jsx": "jsx", ".java": "java", ".c": "c",
        ".h": "c", ".cpp": "cpp", ".hpp": "cpp", ".cs": "csharp",
        ".go": "go", ".rb": "ruby", ".php": "php", ".sh": "bash",
        ".bash": "bash", ".zsh": "bash", ".ps1": "powershell", ".lua": "lua",
        ".rs": "rust", ".kt": "kotlin", ".swift": "swift", ".sql": "sql",
        ".R": "r", ".dockerfile": "dockerfile"
    }
    MIME_PREFIXES_TO_IGNORE = {"image/", "audio/", "font/"}
    FONT_MIME_SET = {
        "application/font-ttf", "application/x-font-ttf",
        "application/x-font-truetype", "application/font-sfnt",
        "application/x-font-sfnt", "application/vnd.ms-fontobject",
        "application/font-woff", "application/x-font-woff",
        "application/font-woff2", "application/x-font-opentype",
    }
    FONT_EXT_SET = {".ttf", ".otf", ".woff", ".woff2", ".eot", ".sfnt", ".pfa", ".pfb"}
    IGNORED_DIRS = {
        ".git", ".vscode", "__pycache__", "node_modules", "dist",
        "build", ".venv", ".cache", ".idea", ".next", "generated", "migrations", ".vercel", "android"
    }
    IGNORED_EXACT_FILENAMES = {"tsconfig.tsbuildinfo"}
    IGNORED_FILENAMES = {"jquery", "font-awesome", "fontawesome", "pnpm-lock", "package-lock", "yarn"}
    IGNORED_SUFFIXES = {".min.css", ".min.js"}
    MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024


class FileCompiler:
    """Classe principal para compilar arquivos em Markdown."""

    def __init__(self, root_path: Path, output_path: Path, include_self: bool = False):
        self.root = root_path
        self.out_path = output_path
        self.config = Config()
        self.config.INCLUDE_SELF_IN_OUTPUT = include_self
        self.generation_time = datetime.now()

    def _format_timestamp(self) -> str:
        return self.generation_time.strftime("%d/%m/%Y às %H:%M:%S")

    def _format_iso_timestamp(self) -> str:
        return self.generation_time.isoformat()

    def is_ignored(self, file_path: Path) -> bool:
        lower_name = file_path.name.lower()
        if lower_name in self.config.IGNORED_EXACT_FILENAMES:
            return True
        for suffix in self.config.IGNORED_SUFFIXES:
            if lower_name.endswith(suffix):
                return True
        file_stem_lower = file_path.stem.lower()
        if any(ignored in file_stem_lower for ignored in self.config.IGNORED_FILENAMES):
            return True
        if self._is_font(file_path):
            return True
        if self._is_large_file(file_path):
            return True
        return False

    def _is_font(self, path: Path) -> bool:
        mtype, _ = mimetypes.guess_type(str(path))
        if mtype and mtype in self.config.FONT_MIME_SET:
            return True
        if path.suffix.lower() in self.config.FONT_EXT_SET:
            return True
        return False

    def _is_large_file(self, path: Path) -> bool:
        try:
            return path.stat().st_size > self.config.MAX_FILE_SIZE_BYTES
        except FileNotFoundError:
            return False

    def _get_files_to_process(self) -> list[Path]:
        entries: list[Path] = []
        script_path = Path(__file__).resolve()
        for p in self.root.rglob("*"):
            if p.is_file():
                if p.resolve() == self.out_path.resolve():
                    logger.info(f"Ignorando arquivo de saída: {p}")
                    continue
                if p.resolve() == script_path and not self.config.INCLUDE_SELF_IN_OUTPUT:
                    logger.info(f"Ignorando o próprio script: {p} (use --incluir-script para adicioná-lo)")
                    continue
                if any(part in self.config.IGNORED_DIRS for part in p.parts):
                    continue
                entries.append(p)
        entries.sort(key=lambda p: str(p.relative_to(self.root)).lower())
        return entries

    def _strip_noise(self, content: str, lang: str) -> str:
        """Remove comentários e linhas em branco do conteúdo."""
        if not self.config.STRIP_COMMENTS_AND_BLANK_LINES:
            return content

        if lang in ["python", "javascript", "ts", "tsx", "jsx", "java", "c", "cpp", "csharp", "go", "rust", "swift", "kt", "kotlin", "sql"]:
            # Remove comentários de bloco /* ... */
            content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
            # Remove comentários de linha // ..., # ..., -- ...
            content = re.sub(r'//.*', '', content)
            content = re.sub(r'#.*', '', content)
            content = re.sub(r'--.*', '', content)
        elif lang in ["html", "xml"]:
            # Remove comentários <!-- ... -->
            content = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)

        # Remove linhas em branco extras
        lines = content.split('\n')
        non_empty_lines = [line for line in lines if line.strip() != '']
        return '\n'.join(non_empty_lines)

    def _read_text_safely(self, path: Path) -> str | None:
        """Lê um arquivo de texto de forma segura e aplica a remoção de ruído."""
        encodings = ["utf-8", "latin-1"]
        for encoding in encodings:
            try:
                content = path.read_text(encoding=encoding, errors="replace")
                content = content.replace('\u2028', '\n').replace('\u2029', '\n')
                
                lang = self.config.LANG_BY_EXT.get(path.suffix.lower(), "")
                content = self._strip_noise(content, lang)
                
                return content
            except (UnicodeDecodeError, IOError) as e:
                logger.warning(f"Erro ao ler '{path}' com '{encoding}': {e}")
        return None

    def _generate_file_tree(self, files: list[Path]) -> list[str]:
        tree_lines = ["# Estrutura do Projeto\n", "```"]
        structure = {}
        for path in files:
            parts = path.relative_to(self.root).parts
            current_level = structure
            for part in parts:
                if part not in current_level:
                    current_level[part] = {}
                current_level = current_level[part]

        def build_tree_str(d: dict, prefix: str = ""):
            entries = sorted(list(d.keys()))
            for i, entry in enumerate(entries):
                connector = "├── " if i < len(entries) - 1 else "└── "
                tree_lines.append(f"{prefix}{connector}{entry}")
                if d[entry]:
                    extension = "│   " if i < len(entries) - 1 else "    "
                    build_tree_str(d[entry], prefix + extension)

        build_tree_str(structure)
        tree_lines.append("```\n")
        return tree_lines

    def _generate_markdown(self, file_path: Path) -> list[str]:
        """Gera o Markdown para um arquivo, usando a lógica de colapsar se necessário."""
        rel_path = file_path.relative_to(self.root)
        header = f"## {rel_path}"
        # MODIFICADO: Remove a quebra de linha inicial para tornar a listagem mais compacta.
        lines = [f"\n{header}"]
        mime_type_info = mimetypes.guess_type(str(file_path))
        mime_type = mime_type_info[0] if mime_type_info else None
        is_media = any(prefix in (mime_type or "") for prefix in self.config.MIME_PREFIXES_TO_IGNORE)

        if is_media:
            lines.append(f"- **Arquivo de mídia**: `{file_path.name}`")
        elif self.is_ignored(file_path):
            try:
                size_kb = round(file_path.stat().st_size / 1024, 2)
                lines.append(f"- **Arquivo ignorado**: `{rel_path}` (Tamanho: {size_kb} KB)")
            except Exception:
                lines.append(f"- **Arquivo ignorado**: `{rel_path}`")
        else:
            text_content = self._read_text_safely(file_path)
            if text_content is None:
                lines.append(f"- **Não textual ou ilegível**: `{rel_path.name}`")
            else:
                lang = self.config.LANG_BY_EXT.get(file_path.suffix.lower(), "")
                
                is_collapsible = (
                    file_path.suffix.lower() in self.config.COLLAPSIBLE_EXTENSIONS or
                    any(part in str(rel_path) for part in self.config.COLLAPSIBLE_PATHS)
                )

                if is_collapsible:
                    lines.append(f"<details><summary>Clique para ver o conteúdo de `{file_path.name}`</summary>\n")
                    lines.append(f"```{lang}".rstrip())
                    lines.append(text_content.rstrip("\n"))
                    lines.append("```")
                    lines.append("</details>")
                else:
                    lines.append(f"```{lang}".rstrip())
                    lines.append(text_content.rstrip("\n"))
                    lines.append("```")
        return lines

    def _check_typescript_errors(self) -> list[str]:
        markdown_output = []
        package_json_path = self.root / 'package.json'
        if not package_json_path.exists():
            logger.info("Nenhum 'package.json' encontrado. Pulando verificação de TypeScript.")
            return markdown_output
        markdown_output.append("\n# Verificação de Erros de TypeScript\n")
        try:
            logger.info("Executando 'npx tsc --noEmit' para verificar erros de TypeScript...")
            result = subprocess.run(
                ["npx", "tsc", "--noEmit"],
                cwd=self.root,
                capture_output=True,
                text=True,
                check=False
            )
            if result.returncode == 0:
                logger.info("Nenhum erro de TypeScript encontrado. Sucesso!")
                markdown_output.append("Nenhum erro de TypeScript foi detectado no projeto.\n")
            else:
                logger.warning("Erros de TypeScript encontrados.")
                markdown_output.append("Os seguintes erros de TypeScript foram detectados:\n")
                markdown_output.append("```shell")
                markdown_output.append(result.stdout)
                markdown_output.append(result.stderr)
                markdown_output.append("```\n")
        except FileNotFoundError:
            logger.error("Erro: 'npx' não foi encontrado. Certifique-se de ter o Node.js/npm instalados.")
            markdown_output.append(
                "**Aviso**: O comando `npx` não foi encontrado. A verificação de TypeScript não pôde ser realizada."
            )
        except Exception as e:
            logger.error(f"Ocorreu um erro inesperado ao tentar verificar o TypeScript: {e}")
            markdown_output.append(f"**Erro inesperado**: Falha ao executar a verificação de TypeScript. Detalhes: `{e}`")
        return markdown_output

    def _generate_script_summary(self) -> list[str]:
        script_name = Path(__file__).name
        summary = [
            "\n---\n",
            f"## Sobre o Script de Geração (`{script_name}`)\n",
            "Este arquivo Markdown foi gerado automaticamente...",
            f"Para incluir o código-fonte do próprio script (`{script_name}`) execute-o com a flag `--incluir-script`."
        ]
        return summary

    def _generate_header(self) -> list[str]:
        header_lines = [
            f"# Compilação de arquivos de `{self.root}`\n",
            f"**Data de geração**: {self._format_timestamp()}  ",
            f"**Timestamp ISO**: `{self._format_iso_timestamp()}`\n",
            "> Gerado automaticamente pelo script de compilação.\n"
        ]
        return header_lines

    def compile(self):
        files_to_process = self._get_files_to_process()
        markdown_content = []
        markdown_content.extend(self._generate_header())
        markdown_content.extend(self._generate_file_tree(files_to_process))
        
        logger.info(f"Iniciando compilação de {len(files_to_process)} arquivos...")
        logger.info(f"Timestamp de geração: {self._format_timestamp()}")
        
        for file_path in files_to_process:
            markdown_content.extend(self._generate_markdown(file_path))
            
        if self.config.CHECK_TYPESCRIPT_ERRORS:
            markdown_content.extend(self._check_typescript_errors())

        if not self.config.INCLUDE_SELF_IN_OUTPUT:
            markdown_content.extend(self._generate_script_summary())
            
        try:
            self.out_path.parent.mkdir(parents=True, exist_ok=True)
            # Une as partes com duas quebras de linha para uma separação limpa
            full_content = "\n\n".join(markdown_content)
            with open(self.out_path, "w", encoding="utf-8") as f:
                f.write(full_content)
            logger.info(f"OK! Arquivo Markdown gerado em: {self.out_path}")
            logger.info(f"Gerado em: {self._format_timestamp()}")
        except Exception as e:
            logger.error(f"Erro ao escrever no arquivo de saída: {e}")
            sys.exit(1)


def main():
    parser = argparse.ArgumentParser(description="Gera um único arquivo Markdown com o conteúdo dos arquivos de uma pasta.")
    parser.add_argument("pasta", nargs="?", default=".", help="A pasta raiz a ser processada (padrão: diretório atual).")
    parser.add_argument("saida", nargs="?", default="export.md", help="O nome do arquivo Markdown de saída (padrão: export.md).")
    parser.add_argument("--incluir-script", action="store_true", help="Inclui o conteúdo do próprio script de compilação no arquivo de saída.")
    
    args = parser.parse_args()

    root_path = Path(args.pasta).expanduser()
    output_path = Path(args.saida).expanduser()
    
    if not root_path.exists() or not root_path.is_dir():
        logger.error(f"Erro: pasta '{root_path}' não existe ou não é uma pasta.")
        sys.exit(2)

    compiler = FileCompiler(root_path, output_path, include_self=args.incluir_script)
    compiler.compile()

if __name__ == "__main__":
    main()

