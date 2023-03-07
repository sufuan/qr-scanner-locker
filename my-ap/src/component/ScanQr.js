
import React, { useEffect, useState } from 'react';
import ScanByCamera from './ScanByCamera';
import ScanByUpload from './ScanbyUpload';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ScanQR = () => {

    const [isUsingCamera, setisUsingCamera] = useState(false)

    const [result, setResult] = useState(null)

    const user = useSelector(state => state.auth)

    const userId = user?.user?.data?._id







    const handleSelectOption = (isCameraSelected) => {
        setisUsingCamera(isCameraSelected)
    }


    // const handleScanResult = async (data) => {
    //     // console.log(data)

    //     if (data) {
    //         setResult(data);
    //        const qrData=JSON.parse(data)

    //         const newqrdata = {

    //              qrData,
    //               userId

    //         }
    //         console.log(newqrdata)
    //         // Send result to backend API
    //         try {
    //           const res =  await axios.post(`http://localhost:5000/api/verifycode`, newqrdata);
    //             console.log(res);
    //         } catch (error) {
    //             console.error('suspicios qr ', error);
    //         }

    //     }
    //     else {
    //         console.log('no data received')
    //     }

    // };



    const handleScanResult = async (data) => {
        if (data) {
            setResult(data);
            let qrData;
            try {
                qrData = JSON.parse(data);
            } catch (error) {
                console.error("Error parsing QR datasss", error);
                return;
            }

            const newqrdata = {
                qrData,
                userId,
            };

            console.log(newqrdata);

            // Send result to backend API
            try {
                const res = await axios.post(
                    `http://localhost:5000/api/verifycode`,
                    newqrdata
                );
                console.log(res);
            } catch (error) {
                console.error("Error sending QR data to API", error);
            }
        } else {
            console.log("No data received");
        }
    };






    return (
        <div>
            <div>
                <button onClick={() => handleSelectOption(false)}>Upload </button>

                <button onClick={() => handleSelectOption(true)}>Scan</button>
            </div>

            {isUsingCamera && <ScanByCamera onScanResult={handleScanResult} />}
            {!isUsingCamera && <ScanByUpload onScanResult={handleScanResult} />}
        </div>
    );
};

export default ScanQR;








 // 












