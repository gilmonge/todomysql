import mysql, { Connection } from 'mysql'
import CONFIG, { mysqlConection } from "../../config"

export default class DB {
    private conectionData:mysqlConection = CONFIG.mysql;
    private connection: Connection;
    constructor(){
        this.connection = mysql.createConnection(this.conectionData)
    }

    private async conectBD(): Promise<boolean>{
        let ConectionStatus: boolean = true
        /* Conection data */
        this.connection = mysql.createConnection(this.conectionData);

        this.connection.config.queryFormat = function (query: string, values: any): string {
            if (!values) return query;
            return query.replace(/\:(\w+)/g, function (txt: string, key: string) {
                if (values.hasOwnProperty(key)) {
                    return this.escape(values[key]);
                }
                return txt;
            }.bind(this));
        };

        /* conect to mysql */
        this.connection.connect(function(err) {
            if(err){
                console.log(err.code);
                console.log(err.fatal);
                ConectionStatus = false
            }
        });
        return ConectionStatus
    }
    
    private async disconectBD(): Promise<void>{
        this.connection.end(function(){});
    }

    async CRUDQuery(query: string, data: any){
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
                            result: results.affectedRows,
                            insertId: results.insertId
                        })
                        return
                    }else{
                        resolve(results[0])
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