const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username : { type : String, required : true, unique : true},
    email : { type : String, required : true, unique: true},
    password : {type : String, required : true, unique : true}
});

// Hash function to hash the password before saving the user
userSchema.pre('save',async function (next){
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
        console.log(user.password);
    }
    next();
});

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', userSchema);

// {
//     "username":"user1",
//     "email":"user1@gmail.com",
//     "password":"User1"
// }