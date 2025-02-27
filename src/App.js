import React, { useState, useEffect, useRef } from 'react';
import { Button, Grid2 } from '@mui/material';
import scanicon from './assets/scan_icon.png';
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
  const [scannedCodes, setScannedCodes] = useState([]);
  const currentCodeRef = useRef("");


  const keypressHandler = (e) => {
    console.log("pressed:", e.keyCode);

    if (e.keyCode === 13) {
      const scannedValue = currentCodeRef.current;
      setScannedCodes((prev) => [...prev, scannedValue]); 
      currentCodeRef.current = ""; 
    } else {
      currentCodeRef.current += e.key;
    }
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
      <h3 className="text-lg font-semibold">Scanned Codes</h3>
      <div className="wordwrap whitespace-pre-wrap p-4 border rounded-2xl shadow-md min-h-[100px]">
        {scannedCodes.length > 0 ? (
          scannedCodes.map((code, index) => (
            <div key={index} className="py-1 border-b last:border-b-0">
              {code}
            </div>
          ))
        ) : (
          <p className="text-gray-400">No codes scanned yet.</p>
        )}
      </div>
    </div>
  );
  
}



