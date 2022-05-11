const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { asyncHandler, csrfProtection } = require('./utils')
const { User, Task, List } = db;


router.get('/', csrfProtection, asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth;
    const tasks = await Task.findAll({
        where: { userId }
    })
    const lists = await List.findAll({
        where: { userId }
    })
    const task = {}
    res.render('tasks', { tasks, task, lists, csrfToken: req.csrfToken() })
}));





module.exports = router;
