const express = require('express')
const { qrcode, verifyQrCode } = require('../controller/qrcontroller')
const router = express.Router()


router.route('/scanqrcode').post(qrcode)
router.route('/api/verifycode/').post(verifyQrCode)


module.exports = router