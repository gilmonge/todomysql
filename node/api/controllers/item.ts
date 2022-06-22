import { Router, Request, Response } from "express";
import { validationResult } from "express-validator";
import DB from "../modules/db";
import verifyToken from "../modules/auth";
import itemValidator from "../validators/item"

export let router = Router()

/* base */
    router.get(
        "/:id", 
        itemValidator.getList,
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

        /* get items of category */
            let query:string = `CALL proc_item_select_by_category_id(:idCategory);`
            let data = {
                idCategory: req.params.id,
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
        /* get items of category */
    }
/* base */

/* insert item */
    router.post(
        "/:id", 
        itemValidator.postItem,
        verifyToken,
        postItem
    );
    async function postItem(req: Request, res: Response) {
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

        /* create new item */
            let query:string = `CALL proc_item_create(
                :idCategory,
                :title,
                :detail
            );`
            let data = {
                idCategory: req.params.id,
                title: req.body.title,
                detail: req.body.detail,
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
        /* create new item */
    }
/* insert item */

/* get item */
    router.get(
        "/item/:id", 
        itemValidator.getItem,
        verifyToken,
        getItem
    );
    async function getItem(req: Request, res: Response) {
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

        /* get item by id */
            let query:string = `CALL proc_item_select_by_id(:id);`
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
        /* get item by id */
    }
/* get item */

/* put item */
    router.put(
        "/:id", 
        itemValidator.putItem,
        verifyToken,
        putItem
    );
    async function putItem(req: Request, res: Response) {
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

        /* update item */
            let query:string = `CALL proc_item_update(
                :id,
                :title,
                :detail,
                :status
            );`
            let data = {
                id: req.params.id,
                title: req.body.title,
                detail: req.body.detail,
                status: req.body.status,
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
        /* update item */
    }
/* put item */

/* delete item */
    router.delete(
        "/:id", 
        itemValidator.deleteItem,
        verifyToken,
        deleteItem
    );
    async function deleteItem(req: Request, res: Response) {
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

        /* delete item */
            let query:string = `CALL proc_item_delete(:id);`
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
        /* delete item */
    }
/* delete item */