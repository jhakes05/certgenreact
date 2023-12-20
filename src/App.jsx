// src/App.jsx
import React, { useRef, useState } from 'react';
import CertImage from './assets/Cert.png';
import html2pdf from 'html2pdf.js';

const App = () => {
  const nameRef = useRef(null);
  const courseRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    drawImage();
    drawImage2();
    setImageLoaded(true);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);
  };

  const drawImage = () => {
    if (!imageLoaded) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const name = nameRef.current.value;

    clearCanvas();

    ctx.font = '75px monotype corsiva';
    ctx.fillStyle = '#a27b42';
    const textWidth = ctx.measureText(name).width;
    const xPosition = (canvas.width - textWidth) / 2;
    ctx.fillText(name, xPosition, 270);
  };

  const drawImage2 = () => {
    if (!imageLoaded) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const name = nameRef.current.value;
    const course = courseRef.current.value;

    clearCanvas();

    // Draw the first text
    ctx.font = '75px monotype corsiva';
    ctx.fillStyle = '#a27b42';
    const textWidth1 = ctx.measureText(name).width;
    const xPosition1 = (canvas.width - textWidth1) / 2;
    ctx.fillText(name, xPosition1, 270);

    // Draw the second text
    ctx.font = '24px monotype corsiva';
    ctx.fillStyle = '#a27b42';
    const textWidth2 = ctx.measureText(course).width;
    const xPosition2 = 400 + (700 - 400 - textWidth2) / 2;
    ctx.fillText(course, xPosition2, 332);
  };

  const handleNameInput = () => {
    drawImage();
  };

  const handleCourseInput = () => {
    drawImage2();
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
  
    // Clone the canvas content
    const clonedCanvas = document.createElement('canvas');
    clonedCanvas.width = canvas.width;
    clonedCanvas.height = canvas.height;
    const ctx = clonedCanvas.getContext('2d');
    ctx.drawImage(canvas, 0, 0);
  
    // Convert the cloned content to PDF using html2pdf.js
    html2pdf(clonedCanvas, {
      margin: 10,
      filename: 'certificate.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape', putOnlyUsedFonts: true },
    });
  };
  
  
  
  return (
    <div className="container">
      <h1>Certificate Generator</h1>
      <label>
        Name:
        <input ref={nameRef} type="text" onChange={handleNameInput} />
      </label>
      <label>
        Course:
        <input ref={courseRef} type="text" onChange={handleCourseInput} />
      </label>
      <a href="#" onClick={handleDownload} id="download-btn">
        Download
      </a>
      <br />
      <canvas
        ref={canvasRef}
        id="canvas"
        height="595px"
        width="842px"
        onLoad={handleImageLoad}
      ></canvas>
      <img
        ref={imageRef}
        src={CertImage}
        alt="Certificate Background"
        onLoad={handleImageLoad}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default App;
