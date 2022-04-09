
const httpStatus = require('http-status');

const { authService } = require('../services');
const ApiError = require('../utils/ApiError');
const tokenUtils = require('../config/tokens')

class AuthController {

  signUp = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      if (await authService.findUserByEmail(email) != null){
        return next(new ApiError(httpStatus.BAD_REQUEST, 'Um usuário com esse e-mail já existe'));
      }

      const newUser = await authService.signUp(
        name,
        email,
        password,
        'EMAIL_PASSWORD'
      );
        console.log(newUser)
      const token = tokenUtils.createJwt(newUser._id);
        console.log(token)
      res.status(httpStatus.CREATED).json({
        status: 'SUCCESS',
        data: {
          token,
          user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            createdAt: newUser.createdAt
          }
        }
      });

    } catch (e) {
      console.log(e.message);
      return next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Ocorreu um erro ao se inscrever'));
    }

  }
}

module.exports = new AuthController();
