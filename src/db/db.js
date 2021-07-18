
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "masteradmin",
    password: "ecommerce123",
    database:"awsecommerce"
  });
  exports.executeSql = function ( sql, callback){
        con.query(sql, function (err, result) {
            if (err) {
               // throw err;
                callback(null , err);
            }
            else{
                callback(result); 
            }
           
        });
       
  }
