from services.pdf_service import extract_text_from_pdf


pdf_path = "test_files/resume.pdf"

try:
    extracted_text = extract_text_from_pdf(pdf_path)

    print("=" * 60)
    print("EXTRACTED RESUME TEXT")
    print("=" * 60)

    print(extracted_text)

    print("=" * 60)
    print("CHARACTER COUNT:", len(extracted_text))
    print("=" * 60)

except Exception as error:
    print("PDF extraction failed:")
    print(error)