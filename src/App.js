import React, { useState, useEffect, useRef } from 'react';
import { Button, Grid2 } from '@mui/material';
import scanicon from './assets/scan_icon.png';

export default function App() {
  const [scannedCode, setScannedCode] = useState('');
  const [isListening, setIsListening] = useState(false);
  const inputBuffer = useRef('');

  useEffect(() => {
    if (!isListening) return;

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        setScannedCode(inputBuffer.current); // Set scanned code when Enter is pressed
        inputBuffer.current = '';            // Clear buffer
      } else {
        inputBuffer.current += e.key;        // Accumulate characters
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => window.removeEventListener('keypress', handleKeyPress); // Cleanup
  }, [isListening]);

  const startListening = () => {
    setScannedCode('');
    setIsListening(true);
  };

  return (
    <div>
      <Grid2 container spacing={1}>
        <Grid2
          size={6}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Button
            variant="contained"
            onClick={startListening}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 2,
              textTransform: 'none',
              backgroundColor: '#D9D9D9',
              color: 'black',
              '&:hover': { backgroundColor: '#888585' },
            }}
          >
            <img
              src={scanicon}
              alt="Scan Icon"
              style={{ width: '50px', height: '50px', marginBottom: '8px' }}
            />
            Scan batch
          </Button>
        </Grid2>

        <Grid2 size={12} sx={{ textAlign: 'center', marginTop: 4 }}>
          {isListening && <p>Scanning... Please scan a barcode.</p>}
          {scannedCode && <p><strong>Scanned Code:</strong> {scannedCode}</p>}
        </Grid2>
      </Grid2>
    </div>
  );
}
