import React, { useRef, useState } from 'react';
import QrScanner from 'qr-scanner'



const ScanByUpload = ({onScanResult}) => {

const [file, setFile] = useState(null)
const [scanData, setScanData] = useState(null)
const fileRef = useRef()


const handleClick=()=>{
    fileRef.current.click()
   

  }


  const handleChange = async(e)=>{
   const  file= (e.target.files[0])
   setFile(file)
   const data = await QrScanner.scanImage(file)

   onScanResult(data)
   
  }

    return (
        <div className='mt-4'>
               <button onClick={handleClick} className=''>qr scan
                <input
                type='file' accept='.png, .jpg, .jpeg '
                    className='hidden'
                onChange={handleChange}

                ref={fileRef}
               

                />
               </button>
 {
    file && (
        <img 
        src={URL.createObjectURL(file)}  alt='qr code'/>
    )
 }

        </div>
    );
};

export default ScanByUpload;