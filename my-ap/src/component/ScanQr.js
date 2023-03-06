
import React, { useState } from 'react';
import ScanByCamera from './ScanByCamera';
import ScanByUpload from './ScanbyUpload';
import axios from 'axios'
import { useSelector } from 'react-redux';

const ScanQR = () => {

    const [isUsingCamera, setisUsingCamera] = useState(false)

    const [result, setResult] = useState(null)

      const user = useSelector(state=>state.auth)
      console.log(user)
    //   const userId= user.user.data._id

    //   console.log(userId)   


    const handleSelectOption = (isCameraSelected) => {
        setisUsingCamera(isCameraSelected)
    }


    const handleScanResult = async (result) => {
    
        if (result) {
            setResult(result);
            // Send result to backend API
            try {
                await axios.post(`http://localhost:5000/api/verifycode`, { result });
                console.log('Data sent to backend successfully');
            } catch (error) {
                console.error('Failed to send data to backend:', error);
            }
        }
        else {
            console.log('no data received')
        }

    };


    // console.log(isUsingCamera)
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





















