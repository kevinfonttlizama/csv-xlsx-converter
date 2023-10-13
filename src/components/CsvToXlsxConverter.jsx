import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

function CsvToXlsxConverter() {
  const [csvFiles, setCsvFiles] = useState([]);
  const [xlsxFiles, setXlsxFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (event) => {
        const content = event.target.result;
        convertCsvToXlsx(file.name, content);
      };

      reader.readAsText(file);
    }
  };

  const convertCsvToXlsx = (filename, content) => {
    Papa.parse(content, {
      complete: (result) => {
        const data = result.data;
        const ws = XLSX.utils.aoa_to_sheet(data);
  
        // Asegúrate de que el nombre de la hoja no supere los 31 caracteres
        const sheetName = filename.replace('.csv', '').substring(0, 31);
        
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
  
        // Genera el archivo XLSX en formato array
        const arrayData = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  
        // Convierte el array en Blob
        const xlsxBlob = new Blob([arrayData], { type: 'application/octet-stream' });
  
        // Usa la biblioteca file-saver para descargar el archivo
        saveAs(xlsxBlob, filename.replace('.csv', '.xlsx'));
  
        setXlsxFiles((prevXlsxFiles) => [...prevXlsxFiles, filename]);
      },
    });
  };
  const downloadXlsxFiles = () => {
    xlsxFiles.forEach((file) => {
      const url = URL.createObjectURL(file.blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace('.csv', '.xlsx');
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <input type="file" multiple onChange={handleFileChange} accept=".csv" />
          <Button onClick={downloadXlsxFiles}>Descargar XLSX</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default CsvToXlsxConverter;
