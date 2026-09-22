const User = require('../models/User');

class UserController {
  async getCurrentUser(req, res, next) {
    try {
      let user = await User.findOne();
      if (!user) {
        user = await User.create({
          name: 'Riya Sharma',
          email: 'riya.sharma@example.com',
          phone: '+91 98765 43210',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          referralCode: 'riya123',
        });
      }
      res.json({
        success: true,
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await User.find();
      res.json({
        success: true,
        data: users,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
