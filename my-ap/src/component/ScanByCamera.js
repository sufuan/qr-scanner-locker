import React, { useState, useEffect } from 'react';
import QrScanner from 'qr-scanner';

const ScanByCamera = ({onScanResult, width = '40%', height = 'auto' }) => {

    const [isScanning, setIsScanning] = useState(false);
    const [scanSuccessful, setScanSuccessful] = useState(false);
    const [cameraAccessError, setCameraAccessError] = useState(false);

    useEffect(() => {
        let scanner;
        if (isScanning && !scanSuccessful) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    const video = document.getElementById('qr-video');
                    video.srcObject = stream;
                    video.play();
                    scanner = new QrScanner(video, result => {
                        // console.log(result);
                        scanner.stop();
                        setScanSuccessful(true);
                        onScanResult(result)
                    });
                    scanner.start();
                })
                .catch(err => {
                    if (err.name === 'NotAllowedError') {
                        alert('Camera permission denied. Please allow camera access to use QR scanner.');
                    } else {
                        console.error(err);
                    }
                    setIsScanning(false);
                });
        }
        return () => {
            if (scanner) {
                scanner.stop();
            }
            const video = document.getElementById('qr-video');
            video?.srcObject?.getTracks().forEach(track => track.stop());
        };
    }, [isScanning, scanSuccessful]);


    const handleStartScan = () => {
        setIsScanning(true);
        setScanSuccessful(false);
        setCameraAccessError(false);
    };

    const handleStopScan = () => {
        setIsScanning(false);
        setScanSuccessful(true);
    };

    return (
        <div className="h-screen flex flex-col justify-center">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">QR Scanner</h1>
                <div className={`${isScanning ? 'hidden' : 'block'}`}>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleStartScan}
                    >
                        Start Scan
                    </button>
                </div>

                <div className={`${isScanning ? 'block' : 'hidden'}`}>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleStopScan}
                    >
                        {scanSuccessful ? 'Start Scan again' : 'Stop Scan'}
                    </button>
                </div>


                
            </div>
            <div className="flex justify-center items-center m-5">
                <video
                    id="qr-video"
                    className={`${isScanning ? 'block' : 'hidden'}`}
                    style={{ width, height }}
                />
            </div>
        </div>
    );
};

export default ScanByCamera;