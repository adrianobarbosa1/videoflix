const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { roles } = require('../config/roles');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nome é obrigatório'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email é obrigatório'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail,'Email Inválido'],
    },
    password: {
        type: String,
        required: [true, 'A senha é obrigatória'],
        minlength: 6,
    },
    strategy:{
      type: String,
      required:[true, 'Uma estrategia de autenticação é obrigatório']
  },
    role: {
        type: String,
        enum: roles,
        default: 'user',
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date,
    deletado: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

//check if password matches the user's password
userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.methods.createPasswordResetToken = async function (this) {
  const resetToken = await crypto.randomBytes(32).toString('hex');

  const expiryTime = new Date();
  expiryTime.setHours(expiryTime.getHours() + 1);

  this.passwordResetToken = resetToken;
  this.passwordResetExpires = expiryTime;

  return resetToken;
};

const User = mongoose.model('User', userSchema)

module.exports = User;
