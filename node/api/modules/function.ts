import crypto from 'crypto'


export default class functions {

    stringRandom(length:number):string {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * 
            charactersLength));
        }
        return result;
    }

    async encryptPass(string:string){
        let hash = crypto.createHash('sha1');
        let data = hash.update(string, 'utf-8');
        let gen_hash = data.digest('hex');
        return gen_hash
    }
}