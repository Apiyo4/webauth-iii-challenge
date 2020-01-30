const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
   
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'secretwordisqwertyuiopasdfghjklzxcvbnm',
    
      (err, decoded) => {
        if (err) {
          res.status(401).json({ message: 'token bad' })
        } else {
          req.decodedToken = decoded;
          next();
        }
      }
    )
  } else {
    res.status(400).json({ message: 'No token provided' });
  }
};
