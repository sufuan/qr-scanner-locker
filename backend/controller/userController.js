const User = require("../model/UserModel")
const bcrypt = require('bcryptjs')

exports.register = async (req, res) => {
    const { name, email, password } = req.body

    const user = await User.findOne({ email })
    if (user) {
        return res.status(409).json({
            success: false,
            
            message: 'User already exists'
        })
    }

    try {
        const newUser = await User.create({
            name,
            email,
            password
        })

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: newUser
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Could not register user',
            error: error.message
        })
    }
}


exports.login = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.send('info req')
    }

    try {
        const user = await User.findOne({ email }).select('+password')

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(404).json({
                success: false,
                message: "invalid credentials"
            })
        }

        res.status(200).json({
            success: true,
            message: "login successfull",
        })


    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}