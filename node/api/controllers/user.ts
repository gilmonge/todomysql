import { Router, Request, Response } from "express";
import { validationResult } from "express-validator";
import DB from "../modules/db";
import verifyToken from "../modules/auth";
import userValidator from "../validators/user"

export let router = Router()

/* base */
    router.get(
        "/:id", 
        userValidator.get,
        verifyToken,
        list
    );
    async function list(req: Request, res: Response) {
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
        let database:DB = new DB()

        /* get profile */
            let query:string = `CALL proc_profile_by_id(:id);`
            let data = {
                id: req.params.id,
            }

            let responseDB:any = await database.CRUDQuery(query, data)

            if(responseDB.length > 0){
                return res.send({
                    status: 1,
                    msg: "",
                    data: {
                        id: responseDB[0].id,
                        firstName: responseDB[0].firstName,
                        lastName: responseDB[0].lastName,
                        dateOfBirth: responseDB[0].dateOfBirth,
                    }
                })
            } else {
                return res.send({
                    status: 0,
                    msg: "Has no content",
                    data: []
                })
            }
        /* get profile */
    }
/* base */

/* put profile */
    router.put(
        "/:id", 
        userValidator.put,
        verifyToken,
        putProfile
    );
    async function putProfile(req: Request, res: Response) {
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
        let database:DB = new DB()

        /* update profile */
            let query:string = `CALL proc_user_update(
                :id,
                :firstName,
                :lastName,
                :dateOfBirth
            );`
            let data = {
                id: req.params.id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dateOfBirth: req.body.dateOfBirth,
            }

            let responseDB:any = await database.CRUDQuery(query, data)

            if(responseDB.result && responseDB.result > 0){
                return res.send({
                    status: 1,
                    msg: "Update",
                })
            } else {
                return res.send({
                    status: 0,
                    msg: "Failed to update",
                })
            }
        /* update profile */
    }
/* put profile */

/* delete profile */
    router.delete(
        "/:id", 
        userValidator.delete,
        verifyToken,
        deleteProfile
    );
    async function deleteProfile(req: Request, res: Response) {
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
        let database:DB = new DB()

        /* delete profile */
            let query:string = `CALL proc_user_delete(:id);`
            let data = {
                id: req.params.id,
            }

            let responseDB:any = await database.CRUDQuery(query, data)

            if(responseDB.result && responseDB.result > 0){
                return res.send({
                    status: 1,
                    msg: "Deleted",
                })
            } else {
                return res.send({
                    status: 0,
                    msg: "Failed to delete",
                })
            }
        /* delete profile */
    }
/* delete profile */