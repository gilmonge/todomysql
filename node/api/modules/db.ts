import mysql, { Connection } from 'mysql'
import CONFIG, { mysqlConection } from "../../config"

export class DB {
    constructor(
        private conectionData:mysqlConection = CONFIG.mysql,
        private connection: Connection
    ){
    }

    private async conectBD(): Promise<boolean>{
        let ConectionStatus: boolean = true
        /* Conection data */
        this.connection = mysql.createConnection(this.conectionData);

        /* conect to mysql */
        this.connection.connect(function(err) {
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
    
    private async disconectBD(): Promise<void>{
        this.connection.end(function(){
            console.log("DB disconected")
        });
    }

    async CRUDQuery(query: string, data: any[]){
        return new Promise(async (resolve, reject) => {
            let conect: Promise<boolean> = this.conectBD()
            if(await conect){
                this.connection.query(query, data, function (error: mysql.MysqlError | null, results: any, fields: mysql.FieldInfo[] | undefined
                    ) {
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

                await this.disconectBD()
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