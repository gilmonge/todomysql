import { body, param, validationResult } from 'express-validator';

const itemValidator = {
    getList: [
        param('id').trim()
            .notEmpty().withMessage('Id cannot be empty')
            .isInt().withMessage('Id cannot be empty')
            .isNumeric().withMessage('Id cannot be empty')
            .custom((value) => {
                let regex = /^[0-9]+$/
                if(!regex.test(value)){ throw new Error('The id is not in the correct format'); }
                return true;
            }),
    ],

    postItem: [
        param('id').trim()
            .notEmpty().withMessage('Id cannot be empty')
            .isInt().withMessage('Id cannot be empty')
            .isNumeric().withMessage('Id cannot be empty')
            .custom((value) => {
                let regex = /^[0-9]+$/
                if(!regex.test(value)){ throw new Error('The id is not in the correct format'); }
                return true;
            }),

        body('title').trim()
            .notEmpty().withMessage('Title cannot be empty')
            .isLength({ min: 2 }).withMessage('The minimum size of the title is 2 letters')
            .isLength({ max: 50 }).withMessage('The maximum size of the title is 50 letters')
            .custom(value => {
                let regex = /^[a-zA-Z0-9 \sÑñàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇ]+$/
                if(!regex.test(value)){ throw new Error('The title only accepts letters or number'); }
                return true;
            }),
        body('detail').trim()
            .notEmpty().withMessage('Detail cannot be empty')
            .isLength({ min: 2 }).withMessage('The minimum size of the detail is 2 letters')
            .isLength({ max: 100 }).withMessage('The maximum size of the detail is 100 letters')
            .custom(value => {
                let regex = /^[a-zA-Z0-9 \sÑñàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇ]+$/
                if(!regex.test(value)){ throw new Error('The detail only accepts letters'); }
                return true;
            }),
    ],

    getItem: [
        param('id').trim()
            .notEmpty().withMessage('Id cannot be empty')
            .isInt().withMessage('Id cannot be empty')
            .isNumeric().withMessage('Id cannot be empty')
            .custom((value) => {
                let regex = /^[0-9]+$/
                if(!regex.test(value)){ throw new Error('The id is not in the correct format'); }
                return true;
            }),
    ],

    putItem: [
        param('id').trim()
            .notEmpty().withMessage('Id cannot be empty')
            .isInt().withMessage('Id cannot be empty')
            .isNumeric().withMessage('Id cannot be empty')
            .custom((value) => {
                let regex = /^[0-9]+$/
                if(!regex.test(value)){ throw new Error('The id is not in the correct format'); }
                return true;
            }),

    body('title').trim()
        .notEmpty().withMessage('Title cannot be empty')
        .isLength({ min: 2 }).withMessage('The minimum size of the title is 2 letters')
        .isLength({ max: 50 }).withMessage('The maximum size of the title is 50 letters')
        .custom(value => {
            let regex = /^[a-zA-Z0-9 \sÑñàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇ]+$/
            if(!regex.test(value)){ throw new Error('The title only accepts letters or number'); }
            return true;
        }),
    body('detail').trim()
        .notEmpty().withMessage('Detail cannot be empty')
        .isLength({ min: 2 }).withMessage('The minimum size of the detail is 2 letters')
        .isLength({ max: 100 }).withMessage('The maximum size of the detail is 100 letters')
        .custom(value => {
            let regex = /^[a-zA-Z0-9 \sÑñàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇ]+$/
            if(!regex.test(value)){ throw new Error('The detail only accepts letters'); }
            return true;
        }),
    body('status').trim()
        .notEmpty().withMessage('Status cannot be empty')
        .isLength({ min: 1 }).withMessage('The minimum size of the status is 1 letters')
        .isLength({ max: 1 }).withMessage('The maximum size of the status is 1 letters')
        .custom(value => {
            let regex = /^[012]+$/
            if(!regex.test(value)){ throw new Error('The status only accepts numbers 0, 1 or 2'); }
            return true;
        }),
    ],

    deleteItem: [
        param('id').trim()
            .notEmpty().withMessage('Id cannot be empty')
            .isInt().withMessage('Id cannot be empty')
            .isNumeric().withMessage('Id cannot be empty')
            .custom((value) => {
                let regex = /^[0-9]+$/
                if(!regex.test(value)){ throw new Error('The id is not in the correct format'); }
                return true;
            }),
    ],

};

export default itemValidator;