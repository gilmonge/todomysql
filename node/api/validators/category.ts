import { body, param, validationResult } from 'express-validator';

const categoryValidator = {
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

    postCategory: [
        param('id').trim()
            .notEmpty().withMessage('Id cannot be empty')
            .isInt().withMessage('Id cannot be empty')
            .isNumeric().withMessage('Id cannot be empty')
            .custom((value) => {
                let regex = /^[0-9]+$/
                if(!regex.test(value)){ throw new Error('The id is not in the correct format'); }
                return true;
            }),
        body('category').trim()
            .notEmpty().withMessage('Category cannot be empty')
            .isLength({ min: 2 }).withMessage('The minimum size of the category is 2 letters')
            .isLength({ max: 50 }).withMessage('The maximum size of the category is 50 letters')
            .custom(value => {
                let regex = /^[a-zA-Z0-9 \sÑñàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇ]+$/
                if(!regex.test(value)){ throw new Error('The category only accepts letters or numbers'); }
                return true;
            }),
    ],

    getCat: [
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
    
    putCategory: [
        param('id').trim()
            .notEmpty().withMessage('Id cannot be empty')
            .isInt().withMessage('Id cannot be empty')
            .isNumeric().withMessage('Id cannot be empty')
            .custom((value) => {
                let regex = /^[0-9]+$/
                if(!regex.test(value)){ throw new Error('The id is not in the correct format'); }
                return true;
            }),
        body('category').trim()
            .notEmpty().withMessage('Category cannot be empty')
            .isLength({ min: 2 }).withMessage('The minimum size of the category is 2 letters')
            .isLength({ max: 50 }).withMessage('The maximum size of the category is 50 letters')
            .custom(value => {
                let regex = /^[a-zA-Z0-9 \sÑñàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇ]+$/
                if(!regex.test(value)){ throw new Error('The category only accepts letters or numbers'); }
                return true;
            }),
    ],
    
    deleteCategory: [
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

export default categoryValidator;
