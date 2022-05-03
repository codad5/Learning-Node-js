const mysql = require('mysql2')

const pool =  mysql.createPool({
    host: 'localhost',
    user:'root',
    database:'wemall',
    password:''
})

let sql = 'SELECT * FROM products;';

pool.execute(sql, (err, result) => {
    if(err) throw err;
    console.log(result)

    
})
module.exports = pool.promise();