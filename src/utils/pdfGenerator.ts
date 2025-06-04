
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (content: string, filename: string): Promise<void> => {
  // Create a temporary div to render the content
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top = '0';
  tempDiv.style.width = '210mm'; // F4 width
  tempDiv.style.maxWidth = '210mm';
  tempDiv.style.padding = '15mm';
  tempDiv.style.boxSizing = 'border-box';
  tempDiv.style.fontSize = '12px';
  tempDiv.style.lineHeight = '1.4';
  document.body.appendChild(tempDiv);

  try {
    // Convert to canvas and then to PDF
    const canvas = await html2canvas(tempDiv, {
      scale: 1.5, // Reduced scale for better text rendering
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: tempDiv.scrollWidth,
      height: tempDiv.scrollHeight
    });

    document.body.removeChild(tempDiv);

    const imgData = canvas.toDataURL('image/png');
    
    // F4/Folio dimensions: 210 x 330 mm
    const pdf = new jsPDF('p', 'mm', [210, 330]);
    
    const imgWidth = 210; // F4 width in mm
    const pageHeight = 330; // F4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage([210, 330]); // F4 size
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save(filename);
  } catch (error) {
    document.body.removeChild(tempDiv);
    throw error;
  }
};
