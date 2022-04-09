const express = require('express');
const passport = require('passport')
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations');
const authController = require('../../controllers');

const router = express.Router();

router.post("/signup", validate(authValidation.signUp), authController.signUp);
// router.post('/login', validate(authValidation.login), authController.login);
// router.get('/auth/google',passport.authenticate('google', { session:false, scope:['openid','profile', 'email']}), authController.googleAuth);
// router.get('/auth/facebook',passport.authenticate('facebook',{ session:false, scope:['email']}), authController.facebookAuth);
// router.put('/login', authController.setAccess);
// router.post('/logout', validate(authValidation.logout), authController.logout);
// router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
// router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
// router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);
// router.post('/send-verification-email', auth(), authController.sendVerificationEmail);
// router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);

module.exports = router;
