const { check } = require('express-validator')

const registerValidation = [
  check('username')
    .exists()
    .withMessage('Please provide a username')
    .isLength({ min: 6 })
    .withMessage('Username is too short'),
  check('email')
    .exists()
    .withMessage('Please provide an email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  check('password')
    .exists()
    .withMessage('Please provide a password')
    .isLength({ min: 8 })
    .withMessage('Password must be minimum 8 characters long'),
]
