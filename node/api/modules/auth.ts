import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import CONFIG from "../../config"

let verifyToken = (req:Request, res:Response, next: NextFunction) => {
    let headAuth:string|undefined = req.headers["authorization"];
    
    if (headAuth == undefined) {
        return res.status(403).send({
            isOk: false,
            msj: "A token is required for authentication"
        });
    }
    /* Validates that the token has the correct format */
        if(headAuth.includes("Bearer ")){
            /* extract the token */
                let headAuthArray: string[] = headAuth.split(" ");
                let token:string = headAuthArray[1]

                try {
                    jwt.verify(token, CONFIG.TOKEN_KEY);
                    return next();
                } catch (err) {
                    return res.status(401).send({
                        isOk: false,
                        msj: "Invalid Token"
                    });
                }
            /* extract the token */
        
        }else{
            return res.status(401).send({
                isOk: false,
                msj: "Not authorized"
            })
        }
    /* Validates that the token has the correct format */
};
export default verifyToken;