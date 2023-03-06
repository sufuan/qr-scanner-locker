const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
 
})


userSchema.pre('save', async function(next){
        if(!this.isModified('password')){
          next()
        }

        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
})
 
const User  = mongoose.model('User', userSchema)

module.exports = User


