const db = require('../config/db.js')
class Product {
    constructor (name, id) {
        this.name = name;
        this.id = id;
    }
    async save() {

    }

    static findAll(){
        let sql = "SELECT * FROM products"

        return db.execute(sql)
    }

    static findById(id){
        let sql = `SELECT * FROM products WHERE product_id = "${id}"; `;

        return db.execute(sql)
    }
}
module.exports = Product ;                     