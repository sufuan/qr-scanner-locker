const Qrcode = require('qrcode')
const User = require('../model/UserModel')
const Vehicle = require('../model/VehicleModel')


exports.qrcode = async (req, res, next) => {
    const {qrText ,email}= req.body
   
  try {

        if (!qrText) {
            res.send('your url is empty ')
        }


        const user = await User.findOne({ email: email });



        if (!user) {
            return res.status(404).send('User not found');
        }

        const userId = user._id

        const passtoqr = {
            qrText,
            email,
            userId
        }

       

        
        const jsonData = JSON.stringify(passtoqr);
        const qrCode = await Qrcode.toDataURL(jsonData);

    
        
        
        const newdata = { qrCode, userId }




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



exports.verifyQrCode=(req,res,next)=>{
  console.log(req.body)
    


    
}












