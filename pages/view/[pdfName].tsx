// pages/view/[pdfName].tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function PdfPage() {
  const router = useRouter();
  const { pdfName } = router.query;

  useEffect(() => {
    if (pdfName) {
      const pdfUrl = `/pdfs/${pdfName}.pdf`;
      window.location.href = pdfUrl;
    }
  }, [pdfName]);

  return (
    <div>
      <p>Открытие PDF файла...</p>
    </div>
  );
}

export default PdfPage;
