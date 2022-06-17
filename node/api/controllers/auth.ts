import { Router, Request, Response } from "express";
import { validationResult } from "express-validator";
import DB from "../modules/db";
import authValidator from "../validators/auth";

export let router = Router()

/* login */
    router.get(
        "/login", 
        authValidator.login,
        login
    );
    async function login(req: Request, res: Response) {
        let urlBase : string = req.protocol+'://'+req.get('host')
        
        res.send({})
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
            password: "TestTodo",
            token: "TestTodo",
        }

        let responseDB:any = await database.CRUDQuery(query, data)
        
        if(responseDB.resultado && responseDB.resultado > 0){
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
        res.send({})
    }
/* register */