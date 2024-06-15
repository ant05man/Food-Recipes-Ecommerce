// authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log('Token', token);

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded:', decoded);
            
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error('Authentication error:', error);
            return res.status(401).json({ message: 'Not authorized' });
        }
    }
        if (!token) {
          return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
