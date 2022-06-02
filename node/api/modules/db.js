const mysql = require('mysql');
const CONFIG = require("../../config")

class DB {
    #connection = null
    #conectionData = {}
    
    constructor(){
        this.#conectionData = CONFIG.mysql
    }

    async #conectBD(){
        let ConectionStatus = true
        /* Conection data */
        this.#connection = mysql.createConnection(this.#conectionData);

        /* conect to mysql */
        this.#connection.connect(function(err) {
            // en caso de error
            if(err){
                console.log(err.code);
                console.log(err.fatal);
                ConectionStatus = false
            }else{
                console.log("DB conected")
            }
        });
        return ConectionStatus
    }
    
    async #disconectBD(){
        this.#connection.end(function(){
            console.log("DB disconected")
        });
    }

    async CRUDQuery(query, data){
        return new Promise(async (resolve, reject) => {
            let conect = this.#conectBD()
            if(conect){
                this.#connection.query(query, data, function (error, results, fields) {
                    if (error) {
                        reject(
                            {
                                error: 1,
                                msg: "Exec fail"
                            }
                        )
                    }
                    results = JSON.parse(JSON.stringify(results))
                    
                    if(results.affectedRows != undefined){
                        resolve({
                            resultado: results.affectedRows,
                            insertId: results.insertId
                        })
                        return
                    }else{
                        resolve(results)
                        return
                    }
                });

                this.#disconectBD()
            }else{
                reject(
                    {
                        error: 1,
                        msg: "Conection fail"
                    }
                )
            }
        })
    }

}

module.exports = DB;