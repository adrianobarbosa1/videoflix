const express = require('express')
const config = require('./config');
const jwt = require('jsonwebtoken')
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

class TokenUtils {
  createJwt = (id) => {
    try {
      const secret = config.jwt.secret;
      const jwtExpiryTime = config.jwt.accessExpirationMinutes;

      if (!secret) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Nenhum segredo jwt foi encontrado no servidor');
      }
      if (!jwtExpiryTime) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Nenhum tempo de expiração do jwt foi encontrado no servidor');
      }

      return jwt.sign({ id: id }, secret, { expiresIn: jwtExpiryTime })
    } catch (e) {
      return next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Ocorreu um erro ao se inscrever'));
    }
  }

  decodeJwt = (token) => {
    try {
      const secret = config.jwt.secret;

      if (!secret) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Nenhum segredo jwt foi encontrado no servidor');
      }

      return jwt.verify(token, secret);

    } catch (e) {
      return next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Ocorreu um erro ao se inscrever'));
    }
  }

}

module.exports = new TokenUtils();
