import { Router, Request, Response } from "express";
import { validationResult } from "express-validator";
import DB from "../modules/db";
import authValidator from "../validators/auth";
import functions from "../modules/function";
import CONFIG from "../../config"
import jwt from "jsonwebtoken"

export let router = Router()

/* login */
    router.get(
        "/login", 
        authValidator.login,
        login
    );
    async function login(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
            .status(400)
            .json({
                state: false,
                msg: "Errors found in the request",
                errors: errors.array()
            })
        }
        let login = req.body

        let database:DB = new DB()

        /* validate if user exist */
            let query_exist:string = `CALL proc_user_by_email(:email);`
            let data_exist = {
                email: login.email,
            }
            let responseDB:any = await database.CRUDQuery(query_exist, data_exist)
            
            if(responseDB.length > 0){
                let Functions = new functions()
                let user = responseDB[0]

                let validation = await Functions.comparePass(user.password, `${user.token}${login.password}`)

                if(validation){
                    /* gen token */
                    let token = jwt.sign(
                        {
                            "data": {
                                id: user.id,
                                username: user.email,
                            }
                        },
                        CONFIG.TOKEN_KEY,
                        {
                            expiresIn: "365d",
                        }
                    );
                    /* gen token */

                    return res.send({
                        status: 1,
                        msg: "",
                        data:{
                            token: token,
                        }
                    })
                } else {
                    return res.send({
                        status: 0,
                        msg: "Incorrect login"
                    })
                }
            } else {
                return res.send({
                    status: 0,
                    msg: "The user doesn't exist"
                })
            }
        /* validate if user exist */
    }
/* login */

/* register */
    router.post(
        "/register", 
        authValidator.register,
        register
    );
    async function register(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
            .status(400)
            .json({
                state: false,
                msg: "Errors found in the request",
                errors: errors.array()
            })
        }
        let register = req.body

        let database:DB = new DB()
        
        /* validate if user exist */
            let query_exist:string = `CALL proc_user_by_email(:email);`
            let data_exist = {
                email: register.email,
            }
            let responseDB_exist:any = await database.CRUDQuery(query_exist, data_exist)
            
            if(responseDB_exist.length > 0){
                return res.send({
                    status: 0,
                    msg: "User already exist"
                })
            }
        /* validate if user exist */

        /* encrypt password */
            let Functions = new functions()
            let token = Functions.stringRandom(15)
            let password = `${token}${register.password}`
            let pass_encrypt = await Functions.encryptPass(password)
        /* encrypt password */

        let query:string = `CALL proc_user_create(
            :email,
            :password,
            :token,
    
            :firstname,
            :lastname,
            :dateOfBirth
        );`

        let data = {
            firstname: register.firstname,
            lastname: register.lastname,
            email: register.email,
            dateOfBirth: register.dateOfBirth,
            password: pass_encrypt,
            token: token,
        }

        let responseDB:any = await database.CRUDQuery(query, data)
        
        if(responseDB.result && responseDB.result > 0){
            return res.send({
                status: 1,
                msg: "",
                data:{
                    username: register.email,
                }
            })
        }else{
            return res.send({
                status: 0,
                msg: "Failed to register user"
            })
        }
    }
/* register */