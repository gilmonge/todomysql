import { body, param, validationResult } from 'express-validator';
import moment from 'moment-timezone';

const userValidator = {
    get: [
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

    put: [
        body('firstName').trim()
            .notEmpty().withMessage('Name cannot be empty')
            .isLength({ min: 2 }).withMessage('The minimum size of the name is 2 letters')
            .isLength({ max: 25 }).withMessage('The maximum size of the name is 25 letters')
            .custom(value => {
                let regex = /^[a-zA-Z \sÑñàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇ]+$/
                if(!regex.test(value)){ throw new Error('The name only accepts letters'); }
                return true;
            }),
        body('lastName').trim()
            .notEmpty().withMessage('Last name cannot be empty')
            .isLength({ min: 2 }).withMessage('The minimum size of the surname is 2 letters')
            .isLength({ max: 25 }).withMessage('The maximum size of the surname is 25 letters')
            .custom(value => {
                let regex = /^[a-zA-Z \sÑñàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇ]+$/
                if(!regex.test(value)){ throw new Error('The last name only accepts letters'); }
                return true;
            }),
        body('dateOfBirth').trim()
            .notEmpty().withMessage('The date of birth cannot be empty')
            .custom((value, { req }) => {
                let regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
                if(!regex.test(value)){ throw new Error('Date of birth is not an accepted format (YYYY-MM-DD)'); }
                if (!moment(value).isValid()) {
                    throw new Error('Date of birth is not an accepted format')
                }
                return true
            })
    ],

    delete: [
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

export default userValidator;