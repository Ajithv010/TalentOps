import fitz


def extract_text_from_pdf(pdf_path):
    """
    Extract text from all pages of a PDF.

    Args:
        pdf_path: Path to the PDF file.

    Returns:
        Cleaned text extracted from the PDF.

    Raises:
        ValueError: If no readable text is found.
    """

    document = fitz.open(pdf_path)

    pages = []

    try:
        for page in document:
            text = page.get_text("text")

            if text:
                pages.append(text)

    finally:
        document.close()

    extracted_text = "\n\n".join(pages).strip()

    if not extracted_text:
        raise ValueError(
            "No readable text was found in the PDF. "
            "The resume may be scanned or image-based."
        )

    return extracted_text