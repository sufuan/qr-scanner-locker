const Qrcode = require('qrcode')
const User = require('../model/UserModel')
const Vehicle = require('../model/VehicleModel')
const Buffer = require('buffer').Buffer;
const { createCanvas, loadImage } = require('canvas');
const jsQR = require('jsqr');
const Jimp = require('jimp');
const jsonStableStringify = require('json-stable-stringify')




exports.qrcode = async (req, res, next) => {
    const { qrText, email } = req.body

    try {

        if (!qrText) {
            res.send('your url is empty ')
        }


        const user = await User.findOne({ email: email });



        if (!user) {
            return res.status(404).send('User not found');
        }

        const identifier = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);




        const userId = user._id

        const passtoqr = {
            qrText,
            email,
            userId,
            identifier
        }

        // console.log(passtoqr)



        //         const data = { name: 'John', age: 30 };
        // const jsonString = JSON.stringify(data, (key, value) => (typeof value === 'string' ? value.trim() : value));
        // jsonString will be '{"name":"John","age":30}' without any whitespace in the string





        function removeWhitespace(obj) {
            for (let prop in obj) {
                if (typeof obj[prop] === 'string') {
                    obj[prop] = obj[prop].replace(/\s/g, '');
                } else if (typeof obj[prop] === 'object') {
                    removeWhitespace(obj[prop]);
                }
            }
            return obj;
        }

        const cleanedQRData = removeWhitespace(passtoqr);


        const jsonData = JSON.stringify(cleanedQRData);


        // console.log('after', jsonData)




        const qrCode = await Qrcode.toDataURL(jsonData);



        const newdata = { qrCode, userId, identifier }




        const newVehicle = await Vehicle.create(newdata);

        res.status(200).json({
            success: true,
            message: 'qr created successfully',
            data: newVehicle
        })



    } catch (error) {
        console.log(error);
    }
}


exports.verifyQrCode = async (req, res, next) => {
    const { qrData, vehicleId } = req.body;


    const identifier = qrData.identifier;

    try {
        const vehicles = await Vehicle.find({ identifier }).populate('userId', '-password');
        if (vehicles.length === 0) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        const vehicle = vehicles[0];
        const qrCodeBase64 = vehicle.qrCode;

        const postDataStringified = JSON.stringify(qrData).replace(/\s/g, '');
        const cleanedPostData = removeWhitespace(postDataStringified);

        const qrCodeData = await readQRCodeFromDataURL(qrCodeBase64);
        const cleanedQrCodeData = removeWhitespace(qrCodeData);

        const qrDataObj = JSON.parse(cleanedQrCodeData);
        const compactQrData = JSON.stringify(qrDataObj).replace(/\s+/g, '');

        if (areObjectsEqual(cleanedPostData, compactQrData)) {
            res.status(200).json({
                message: 'QR code data and post data match. Verification successful.',
                success: true
            });
        } else {
            res.status(400).json({ message: 'QR code data and post data do not match. Verification failed.' });
        }

    } catch (error) {
        console.error('Error verifying QR code:', error);
        res.status(500).json({ message: 'An error occurred while verifying the QR code.' });
    }
};

function removeWhitespace(obj) {
    for (let prop in obj) {
        if (typeof obj[prop] === 'string') {
            obj[prop] = obj[prop].replace(/\s/g, '');
        } else if (typeof obj[prop] === 'object') {
            removeWhitespace(obj[prop]);
        }
    }
    return obj;
}

async function readQRCodeFromDataURL(dataURL) {
    const image = await loadImage(dataURL);
    const canvas = createCanvas(image.width, image.height);
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    const imageData = context.getImageData(0, 0, image.width, image.height);
    const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
    return qrCode ? qrCode.data : null;
}

function areObjectsEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}












