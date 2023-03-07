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
    const { jsondata, vehicleId } = req.body
    const identifier = (req.body.jsondata.identifier)

  

   

    try {


       

        const vehicles = await Vehicle.find({identifier}).populate('userId', '-password')
       
        
        if (vehicles.length === 0) {
            return res.send('no data')
        }
        


        // vehicles will give me array of object  . i need qrCode inside array of obj .
        
        const vehicle = vehicles[0];

      

        // Retrieve the QR code image for the filtered vehicle
        const base64String = vehicle.qrCode;

        const postData = {
            "qrText": "sdf sdf",
            "email": "avddddvu@gma. com",
            "userId": "6405a956b22a6bb3c5 6cd94c"
        }

        const postDataStringify = JSON.stringify(postData).replace(/\s/g, '')

        // console.log('postdata strng 1', postDataStringify)


        async function readQRCodeFromDataURL(dataURL) {
            const image = await loadImage(dataURL);
            const canvas = createCanvas(image.width, image.height);
            const context = canvas.getContext('2d');
            context.drawImage(image, 0, 0);
            const imageData = context.getImageData(0, 0, image.width, image.height);
            const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
            return qrCode ? qrCode.data : null;
        }


        const qrCode = await readQRCodeFromDataURL(base64String);











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



        const cleanedQRData = removeWhitespace(qrCode);

        const cleanPostData = removeWhitespace(postDataStringify)

        // console.log('after clean post', cleanPostData);

        const datas = JSON.parse(cleanedQRData);
        const compactData = JSON.stringify(datas).replace(/\s+/g, '');


        // console.log('after clean qr ', compactData)



        // if (crypto.timingSafeEqual(Buffer.from(stableJsonString1), Buffer.from(stableJsonString2))) {
        //     console.log('Objects are equal');
        // } else {
        //     console.log('Objects are not equal');
        // }




        if ((compactData) === (cleanPostData)) {
            res.send("QR code data and post data match. Verification successful.");
        } else {
            res.send("QR code data and post data do not match. Verification failed.");
        }


        // res.send(qrCode);











    } catch (error) {
        console.log(error)
    }

}











