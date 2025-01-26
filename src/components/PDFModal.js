import React from 'react';
import ReactDOM from 'react-dom';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './PDFModal.css';

const PDFModal = ({ pdfUrl, isOpen, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="pdf-modal-overlay" onClick={onClose}>
      <div className="pdf-modal-content" onClick={e => e.stopPropagation()}>
        <iframe
          src={pdfUrl}
          title="PDF Viewer"
          width="100%"
          height="100%"
        />
      </div>
    </div>,
    document.body
  );
};

export default PDFModal;