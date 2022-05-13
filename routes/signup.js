const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { asyncHandler, csrfProtection, check, validationResult } = require('./utils')
const bcrypt = require('bcryptjs');
const { User } = db;
const { loginUser } = require('../auth');

/* GET users listing. */

router.get('/', csrfProtection, asyncHandler(async (req, res, next) => {
  const user = await User.build();
  res.render('sign-up', {
    title: 'Sign Up',
    user,
    csrfToken: req.csrfToken(),
  })
}));

const lowerCase = new RegExp("(?=.*[a-z])");
const upperCase = new RegExp("(?=.*[A-Z])");
const numberCheck = new RegExp("(?=.*[0-9])");
const specialChar = new RegExp("(?=.*[!@#$%^&*])");

const userValidators = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a First Name.')
    .isLength({ max: 50 })
    .withMessage('First Name must not be more than 50 characters long.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a Last Name.')
    .isLength({ max: 50 })
    .withMessage('Last Name must not be more than 50 characters long.'),
  check('emailAddress')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an Email Address.')
    .isLength({ max: 250 })
    .withMessage('Email Address must not be more than 250 characters long.')
    .isEmail()
    .withMessage('Email Address is not a valid email.')
    .custom((value) => {
      return User.findOne({ where: { emailAddress: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('The provided Email Address is already in use by another account.');
          }
        });
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password.')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long.')
    .matches(lowerCase)
    .withMessage('Password must contain at least one lowercase letter.')
    .matches(upperCase)
    .withMessage('Password must contain at least one uppercase letter.')
    .matches(numberCheck)
    .withMessage('Password must contain at least one number.')
    .matches(specialChar)
    .withMessage('Password must contain at least one special character.'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Confirm Password.')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match.');
      }
      return true;
    }),
];

router.post('/', csrfProtection, userValidators, asyncHandler(async (req, res, next) => {
  const {
    firstName,
    lastName,
    emailAddress,
    password,
  } = req.body;

  const user = await User.build({
    firstName,
    lastName,
    emailAddress,
  })

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 12);
    user.hashedPassword = hashedPassword;
    await user.save();
    // await List.create({
    //   name: 'No List'
    // });
    loginUser(req, res, user);
    res.redirect('/tasks');
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('sign-up', {
      title: 'Sign Up',
      user,
      errors,
      csrfToken: req.csrfToken(),
    });
  }


}))

module.exports = router;
