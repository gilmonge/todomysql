export interface mysqlConection {
    host: string,
    user: string,
    password: string,
    database: string,
}
const config = {
    port: process.env.port || "8080",

    /* data base */
        mysql: {
            host     : process.env.MYSQL_HOST || '',
            user     : process.env.MYSQL_USER || '',
            password : process.env.MYSQL_PASSWORD || '',
            database : process.env.MYSQL_DATABASE || ''
        },
    /* data base */

};

export default config;