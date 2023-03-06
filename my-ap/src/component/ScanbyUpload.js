import React, { useRef, useState } from 'react';
import QrScanner from 'qr-scanner'



const ScanByUpload = ({onScanResult}) => {

const [file, setFile] = useState(null)
const [scanData, setScanData] = useState(null)
const fileRef = useRef()


const handleClick=()=>{
    fileRef.current.click()
    console.log(file)

  }


  const handleChange = async(e)=>{
   const  file= (e.target.files[0])
   setFile(file)
   const result = await QrScanner.scanImage(file)
   console.log(result)
   onScanResult(result)

  }

    return (
        <div>
               <button onClick={handleClick} className='btn '>qr scan
                <input
                type='file' accept='.png, .jpg, .jpeg '

                onChange={handleChange}

                ref={fileRef}
                className='block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100'

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