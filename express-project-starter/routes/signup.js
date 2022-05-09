const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { asyncHandler, csrfProtection, check, validationResult} = require('./utils')
const bcrypt = require('bcryptjs');
const { User } = db;

/* GET users listing. */

router.get('/', csrfProtection, asyncHandler(async (req, res, next) => {
  const user = await User.build();
  res.render('sign-up', {
    title: 'Sign Up',
    user,
    csrfToken: req.csrfToken(),
  })
}));
module.exports = router;
