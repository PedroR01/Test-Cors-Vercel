const downloadPDF = (pdf, title) => {
  const extractDriveFileId = (driveLink) => {
    const regex = /\/d\/([a-zA-Z0-9_-]+)\//;
    const match = driveLink.match(regex);
    return match ? match[1] : null;
  };
  const pdfId = extractDriveFileId(pdf);
  if (pdfId) {
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${pdfId}`;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", title || "document");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export default downloadPDF;
