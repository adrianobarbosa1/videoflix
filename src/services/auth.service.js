const User = require('../models/user.model')

class AuthService {
  signUp = async (name, email, password, strategy) => {
    return await User.create({ name, email, password, strategy });
  };

  findUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    if (!user) return null;
    return user;
  }
}

module.exports = new AuthService();
