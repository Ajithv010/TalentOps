import fitz


# Maximum amount of extracted resume text we allow.
# This prevents extremely large documents from being
# sent to Gemini unnecessarily.
MAX_RESUME_CHARACTERS = 50_000


def extract_text_from_pdf(pdf_path):
    """
    Extract text from all pages of a PDF.

    Args:
        pdf_path: Path to the PDF file.

    Returns:
        Cleaned text extracted from the PDF.

    Raises:
        ValueError:
            If the PDF is invalid,
            contains no readable text,
            or contains too much text.
    """

    # --------------------------------------------------------
    # 1. Open and validate the PDF
    # --------------------------------------------------------

    try:
        document = fitz.open(pdf_path)

    except Exception as error:
        raise ValueError(
            "The uploaded file is not a valid PDF."
        ) from error

    pages = []

    try:

        # ----------------------------------------------------
        # 2. Extract text from every page
        # ----------------------------------------------------

        for page in document:

            text = page.get_text("text")

            if text:
                pages.append(text)

    finally:

        # ----------------------------------------------------
        # 3. Always close the PDF
        # ----------------------------------------------------

        document.close()

    # --------------------------------------------------------
    # 4. Combine text from all pages
    # --------------------------------------------------------

    extracted_text = "\n\n".join(pages).strip()

    # --------------------------------------------------------
    # 5. Check whether any readable text was extracted
    # --------------------------------------------------------

    if not extracted_text:
        raise ValueError(
            "No readable text was found in the PDF. "
            "The resume may be scanned or image-based."
        )

    # --------------------------------------------------------
    # 6. Prevent excessively large resumes
    # --------------------------------------------------------

    if len(extracted_text) > MAX_RESUME_CHARACTERS:
        raise ValueError(
            "Resume text is too long. "
            "Please upload a shorter resume."
        )

    # --------------------------------------------------------
    # 7. Return extracted resume text
    # --------------------------------------------------------

    return extracted_text