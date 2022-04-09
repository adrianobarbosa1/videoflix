const config = require('./config');
const jwt = require('jsonwebtoken')
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

class TokenUtils {
  createJwt = (id) => {
    const secret = config.secret;
    const jwtExpiryTime = config.accessExpirationMinutes;

    if (!secret) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Nenhum segredo jwt foi encontrado no servidor');
    }
    if (!jwtExpiryTime) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Nenhum tempo de expiração do jwt foi encontrado no servidor');
    }

    return jwt.sign({ id: id }, secret, { expiresIn: jwtExpiryTime })
  }

  decodeJwt = (token) => {
    try {
      const secret = config.secret;

      if (!secret) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Nenhum segredo jwt foi encontrado no servidor');
      }

      return jwt.verify(token, secret);

    } catch (e) {
      console.log(e.message);
      return next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Ocorreu um erro ao se inscrever'));
    }
  }

}

export default new TokenUtils();
