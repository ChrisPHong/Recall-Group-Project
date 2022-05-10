const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { asyncHandler, csrfProtection, check, validationResult } = require('./utils')
const { loginUser, logoutUser } = require('../auth')
const {Task, List} = db;

// Create a list for all of the lists so that we can see all of them


router.get('/', asyncHandler(async(req, res, next)=>{
    let loggedInUser;
    if(req.session.auth){
        loggedInUser = req.session.auth.userId;
    }
    const lists = await List.findAll({loggedInUser})
    res.render('lists', {lists, loggedInUser});
}));


// Everything below is for creating a New List

router.get('/new', csrfProtection, asyncHandler(async(req, res, next) =>{
    const list = List.build();
    res.render('lists-new', {
        title: "New List",
        list,
        csrfToken: req.csrfToken()
    });
}))


const listValidators = [
    check('name')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a List Name.')
      .isLength({ max: 50})
      .withMessage('List Name must not be more than 50 characters long.')
]

router.post('/', csrfProtection, listValidators, asyncHandler(async(req, res, next)=>{
    const { name } = req.body
    const userId  = req.session.auth.userId;
    const list = await List.build({
        userId,
        name
    });

    const validatorErrors = validationResult(req);

    if(validatorErrors.isEmpty()){
        await list.save();
        res.redirect('/lists')
    } else{
        const errors = validatorErrors.array().map((error)=> error.msg);
        res.render('lists-new', {
            title: 'Create a List',
            list,
            errors,
            csrfToken: req.csrfToken(),
        });
    }



}));




module.exports= router;
