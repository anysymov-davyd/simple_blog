const { check, sanitizeBody } = require('express-validator')

module.exports = [
    check('title')
        .trim()
        .notEmpty()
        .matches(/^[a-zA-Z ]*$/)
        .withMessage('Title must not be empty.')
        .isLength({ min: 5 })
        .withMessage('Title must be at least 5 characters.')
        .isLength({ max: 40})
        .withMessage('Title can not be longer than 40 characters.'),
    check('content')
        .trim()
        .notEmpty()
        .matches(/^[a-zA-Z ]*$/)
        .withMessage('Title must not be empty.')
        .isLength({ min: 30 })
        .withMessage('Title must be at least 30 characters.')
        .isLength({ max: 30000})
        .withMessage('Title can not be longer than 30000 characters.')
]