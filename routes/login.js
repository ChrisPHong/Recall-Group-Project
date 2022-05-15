const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { asyncHandler, csrfProtection, check, validationResult } = require('./utils')
const bcrypt = require('bcryptjs');
const { User } = db;
const { loginUser, logoutUser } = require('../auth')

router.get('/login', csrfProtection, (req, res, next) => {
    res.render('log-in', {
        title: 'Login',
        csrfToken: req.csrfToken()
    });
});

const loginValidators = [
    check('emailAddress')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid Email Address and Password.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid Email Address and Password.'),
];

router.post('/login', csrfProtection, loginValidators, asyncHandler(async (req, res, next) => {
    const {
        emailAddress,
        password,
    } = req.body;

    let errors = [];
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        const user = await User.findOne({ where: { emailAddress } });

        if (user !== null) {
            const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());

            if (passwordMatch) {
                loginUser(req, res, user);
                return req.session.save(() => res.redirect('/tasks'));
            }
        }

        errors.push('Login failed for the provided email address and password');
    } else {
        errors = validatorErrors.array().map((error) => error.msg);
    }

    res.render('log-in', {
        title: 'Login',
        emailAddress,
        errors,
        csrfToken: req.csrfToken(),
    });
}))

router.post('/logout', asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const user = await User.findByPk(userId);
    logoutUser(req, res);
    // if (user.emailAddress === 'Demo@demo.demo') {
    //     user.destroy()
    // }
    req.session.save(() => res.redirect('/'))
}));

router.post('/demo', asyncHandler(async (req, res) => {

    const user = await User.findOne({ where: { emailAddress: 'demo@demo.demo' } });
    loginUser(req, res, user);
    return req.session.save(() => res.redirect('/tasks'));
    // const hashedPassword = await bcrypt.hash('demo', 10);
    // const user = await User.create({
    //     firstName: 'Guest',
    //     lastName: 'Demo',
    //     emailAddress: 'Demo@demo.demo',
    //     hashedPassword
    // });
    // loginUser(req, res, user);
    // return res.redirect('/tasks');
}));


module.exports = router;
