# to convert files from .mdx to .md use
# mdx-to-md
# https://www.npmjs.com/package/mdx-to-md
# npm install mdx-to-md
# mdx-to-md [sourcePath] [outPath]
# --------------------------------

INPUT_FILE_PATH="./i18n/uk/docusaurus-plugin-content-docs/current/Holy-Land/"
INPUT_FILE_NAME="the_term_palestine.md"
#INPUT_FILE_NAME="territory.md"
INPUT_FILE_LANGUAGE="uk"
INPUT_FILE="${INPUT_FILE_PATH}${INPUT_FILE_NAME}"

OUTPUT_FILE_PATH="./static/print/"
OUTPUT_FILE_EXTENSION="pdf" # "pdf" , "odt", "html" , "docx"
OUTPUT_FILE="${OUTPUT_FILE_PATH}${INPUT_FILE_LANGUAGE}.${INPUT_FILE_NAME}.${OUTPUT_FILE_EXTENSION}"

# default: Latin Modern Roman
# with Hebrew, Cyrillic and Arabic: "Times New Roman"
FONT="Gentium Book Plus" # "DejaVu Serif", "Times New Roman", "Latin Modern Roman", "Gentium Book Plus"

# see:
# https://pandoc.org/MANUAL.html#option--pdf-engine
# Valid values are pdflatex, lualatex, xelatex, latexmk, tectonic, wkhtmltopdf, weasyprint, pagedjs-cli, prince, context, groff, pdfroff, and typst.
# https://wkhtmltopdf.org
PDF_ENGINE="wkhtmltopdf" # "wkhtmltopdf" , "xelatex", "lualatex"

echo "converting ${INPUT_FILE} to ${OUTPUT_FILE} using ${PDF_ENGINE}"

pandoc ${INPUT_FILE} --pdf-engine="${PDF_ENGINE}" -V mainfont="${FONT}" --css=pdf.css -o "${OUTPUT_FILE}"

#okular "${OUTPUT_FILE}"
