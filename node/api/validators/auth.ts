import { body, validationResult } from 'express-validator';
import moment from 'moment-timezone';

const authValidator = {
    login: [
        body('user').trim()
            .notEmpty().withMessage('User cannot be empty')
            .isLength({ min: 5 }).withMessage('The minimum username size is 5 characters')
            .isLength({ max: 50 }).withMessage('The maximum user size is 50 characters')
            .custom(value => {
                let regex = /^[A-Z0-9]+$/
                if(!regex.test(value)){ throw new Error('Can only contain letters and numbers'); }
                return true;
            }),
        body('pass').trim()
            .notEmpty().withMessage('Password cannot be empty')
            .isLength({ min: 6 }).withMessage('The minimum password size is 6 characters')
            .isLength({ max: 12 }).withMessage('The maximum password size is 12 characters')
            .custom(value => {
                let regex = /^[a-zA-Z0-9$#]+$/
                if(!regex.test(value)){ throw new Error('The password is not in the correct format'); }
                return true;
            }),
    ],
    register: [
        body('firstname').trim()
            .notEmpty().withMessage('Name cannot be empty')
            .isLength({ min: 2 }).withMessage('The minimum size of the name is 2 letters')
            .isLength({ max: 25 }).withMessage('The maximum size of the name is 25 letters')
            .custom(value => {
                let regex = /^[a-zA-Z \sÑñàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇ]+$/
                if(!regex.test(value)){ throw new Error('The name only accepts letters'); }
                return true;
            }),
        body('lastname').trim()
            .notEmpty().withMessage('Last name cannot be empty')
            .isLength({ min: 2 }).withMessage('The minimum size of the surname is 2 letters')
            .isLength({ max: 25 }).withMessage('The maximum size of the surname is 25 letters')
            .custom(value => {
                let regex = /^[a-zA-Z \sÑñàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇ]+$/
                if(!regex.test(value)){ throw new Error('The last name only accepts letters'); }
                return true;
            }),
        body('email').trim()
            .notEmpty().withMessage('Email cannot be empty')
            .isLength({ min: 5 }).withMessage('The minimum email size is 5 characters')
            .isLength({ max: 50 }).withMessage('The maximum size of the email is 50 characters')
            .custom((value, { req }) => {
                let conf_email = req.body.conf_email
                let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                if (value !== conf_email){ throw new Error('Emails do not match'); }
                if(!regex.test(value)){ throw new Error('The email is not in the correct format'); }
                return true;
            })
            .normalizeEmail(),
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
        ,
        body('password').trim()
            .notEmpty().withMessage('Password cannot be empty')
            .isLength({ min: 6 }).withMessage('The minimum password length is 6 characters')
            .isLength({ max: 12 }).withMessage('The maximum password length is 12 characters')
            .custom((value, { req }) => {
                let conf_password = req.body.conf_password
                let regex = /^[a-zA-Z0-9$#]+$/
                if (value !== conf_password){ throw new Error('Passwords do not match'); }
                else if(!regex.test(value)){ throw new Error('The password is not in the correct format'); }
                return true;
            }),
    ],
};

export default authValidator;