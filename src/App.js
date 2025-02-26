import React, { useState, useEffect, useRef } from 'react';
import { Button, Grid2 } from '@mui/material';
import scanicon from './assets/scan_icon.png';
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJO9U13crpB0N0_Ua_3oXcj2YdoghA1yc",
  authDomain: "react-demo-c51db.firebaseapp.com",
  projectId: "react-demo-c51db",
  storageBucket: "react-demo-c51db.firebasestorage.app",
  messagingSenderId: "163636362883",
  appId: "1:163636362883:web:e3b4a97e8955e90d26e5b6",
  measurementId: "G-BVHB98NDZH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default function App() {
  const [listening, setListening] = useState(true);
  const [pressedKeys, setPressedKeys] = useState("");

  const keypressHandler = (e) => {
    console.log("pressed:", e.keyCode);
    setPressedKeys((prev) => prev + (e.keyCode === 13 ? "\n" : e.key));
  };

  const keydownHandler = (e) => console.log("down:", e.keyCode);
  const keyupHandler = (e) => console.log("up:", e.keyCode);

  useEffect(() => {
    if (listening) {
      console.log("Adding keypress listener");
      document.addEventListener("keypress", keypressHandler);
    } else {
      console.log("Removing keypress listener");
      document.removeEventListener("keypress", keypressHandler);
    }

    document.addEventListener("keydown", keydownHandler);
    document.addEventListener("keyup", keyupHandler);

    return () => {
      document.removeEventListener("keypress", keypressHandler);
      document.removeEventListener("keydown", keydownHandler);
      document.removeEventListener("keyup", keyupHandler);
    };
  }, [listening]);

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">DataWedge KeyEvent Demo</h1>
      <FormControlLabel
        control={
          <Checkbox
            checked={listening}
            onChange={(e) => setListening(e.target.checked)}
            color="primary"
          />
        }
        label="Listen for KeyPress?"
      />
      <p className="text-sm text-gray-500">Reload to clear page</p>
      <h3 className="text-lg font-semibold">Output</h3>
      <div
        className="wordwrap whitespace-pre-wrap p-4 border rounded-2xl shadow-md min-h-[100px]"
        style={{ wordWrap: "break-word" }}
      >
        {pressedKeys}
      </div>
    </div>
  );
  
}




// const [scannedCode, setScannedCode] = useState('');
//   const [isListening, setIsListening] = useState(false);
//   const inputBuffer = useRef('');

//   useEffect(() => {
//     if (!isListening) return;

//     const handleKeyPress = (e) => {
//       if (e.key === 'Enter') {
//         setScannedCode(inputBuffer.current); // Set scanned code when Enter is pressed
//         inputBuffer.current = '';            // Clear buffer
//       } else {
//         inputBuffer.current += e.key;        // Accumulate characters
//       }
//     };

//     window.addEventListener('keypress', handleKeyPress);

//     return () => window.removeEventListener('keypress', handleKeyPress); // Cleanup
//   }, [isListening]);

//   const startListening = () => {
//     setScannedCode('');
//     setIsListening(true);
//   };

//   return (
//     <div>
//       <Grid2 container spacing={1}>
//         <Grid2
//           size={6}
//           sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//         >
//           <Button
//             variant="contained"
//             onClick={startListening}
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               justifyContent: 'center',
//               padding: 2,
//               textTransform: 'none',
//               backgroundColor: '#D9D9D9',
//               color: 'black',
//               '&:hover': { backgroundColor: '#888585' },
//             }}
//           >
//             <img
//               src={scanicon}
//               alt="Scan Icon"
//               style={{ width: '50px', height: '50px', marginBottom: '8px' }}
//             />
//             Scan batch
//           </Button>
//         </Grid2>

//         <Grid2 size={12} sx={{ textAlign: 'center', marginTop: 4 }}>
//           {isListening && <p>Scanning... Please scan a barcode.</p>}
//           {scannedCode && <p><strong>Scanned Code:</strong> {scannedCode}</p>}
//         </Grid2>
//       </Grid2>
//     </div>
//   );