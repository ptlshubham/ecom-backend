let jwt = require('jsonwebtoken');
// const config = require('./config.js');
let user = require('./authenticate');

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
//   if (token.startsWith('Bearer')) {
    // Remove Bearer from string
//     token = token.slice(7, token.length);
//   }

  if (token) {
    jwt.verify(token, 'prnv', (err, decoded) => {
      if (err) {
         
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        if((user.user.username == decoded.username)&&(user.user.password == decoded.password)){
            req.decoded = decoded;
            next();
        }
       
      }
    });
  } else {
  
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkToken: checkToken
}