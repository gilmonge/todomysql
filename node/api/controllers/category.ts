import { Router, Request, Response } from "express";
import { validationResult } from "express-validator";
import DB from "../modules/db";
import categoryValidator from '../validators/category'
import verifyToken from "../modules/auth";

export let router = Router()

/* base */
    router.get(
        "/:id", 
        categoryValidator.getList,
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

        /* validate if user exist */
            let query:string = `CALL proc_category_select_by_user_id(:idUser);`
            let data = {
                idUser: req.params.id,
            }

            let responseDB:any = await database.CRUDQuery(query, data)

            if(responseDB.length > 0){
                return res.send({
                    status: 1,
                    msg: "",
                    data: responseDB
                })
            } else {
                return res.send({
                    status: 0,
                    msg: "Has no content",
                    data: []
                })
            }
        /* validate if user exist */
    }
/* base */

/* insert category */
    router.post(
        "/:id", 
        categoryValidator.postCategory,
        verifyToken,
        postCategory
    );
    async function postCategory(req: Request, res: Response) {
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

        /* validate if user exist */
            let query:string = `CALL proc_category_create(
                :idUser, 
                :category
            );`
            let data = {
                idUser: req.params.id,
                category: req.body.category,
            }

            let responseDB:any = await database.CRUDQuery(query, data)

            if(responseDB.result && responseDB.result > 0){
                return res.send({
                    status: 1,
                    msg: "Registered",
                })
            } else {
                return res.send({
                    status: 0,
                    msg: "Failed to register",
                })
            }
        /* validate if user exist */
    }
/* insert category */

/* get category */
    router.get(
        "/cat/:id", 
        categoryValidator.getCat,
        verifyToken,
        getCat
    );
    async function getCat(req: Request, res: Response) {
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

        /* validate if user exist */
            let query:string = `CALL proc_category_select_by_id(:id);`
            let data = {
                id: req.params.id,
            }

            let responseDB:any = await database.CRUDQuery(query, data)

            if(responseDB.length > 0){
                return res.send({
                    status: 1,
                    msg: "",
                    data: responseDB
                })
            } else {
                return res.send({
                    status: 0,
                    msg: "Has no content",
                    data: []
                })
            }
        /* validate if user exist */
    }
/* get category */

/* put category */
    router.put(
        "/cat/:id", 
        categoryValidator.putCategory,
        verifyToken,
        putCategory
    );
    async function putCategory(req: Request, res: Response) {
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

        /* validate if user exist */
            let query:string = `CALL proc_category_update(
                :id,
                :category
            );`
            let data = {
                id: req.params.id,
                category: req.body.category,
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
        /* validate if user exist */
    }
/* put category */

/* delete category */
    router.delete(
        "/cat/:id", 
        categoryValidator.deleteCategory,
        verifyToken,
        deleteCategory
    );
    async function deleteCategory(req: Request, res: Response) {
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

        /* validate if user exist */
            let query:string = `CALL proc_category_delete(:id);`
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
        /* validate if user exist */
    }
/* delete category */
