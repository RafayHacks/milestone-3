function toggleSection(id) {
    var section = document.getElementById(id);
    if (section.classList.contains('show')) {
        section.classList.remove('show');
    } else {
        // Hide all sections
        document.querySelectorAll('.section-content').forEach(function(sec) {
            sec.classList.remove('show');
        });
        // Show the clicked section
        section.classList.add('show');
    }
}async function generateEditablePDF() {
    const { PDFDocument, rgb, rgbColor } = PDFLib;

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Add a blank page to the PDF
    const page = pdfDoc.addPage([600, 400]);

    // Get the PDF form
    const form = pdfDoc.getForm();

    // Create form fields
    const fullNameField = form.createTextField('fullName');
    fullNameField.setText(document.getElementById('full-name').value);
    fullNameField.addToPage(page, { x: 50, y: 350, width: 400, height: 30 });

    const phoneNumberField = form.createTextField('phoneNumber');
    phoneNumberField.setText(document.getElementById('phone-number').value);
    phoneNumberField.addToPage(page, { x: 50, y: 310, width: 400, height: 30 });

    // Add more fields as needed...

    // Serialize the PDF document to bytes
    const pdfBytes = await pdfDoc.save();

    // Create a URL for the PDF and provide it for downloading
    const pdfUrl = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'resume.pdf';
    link.click();
}