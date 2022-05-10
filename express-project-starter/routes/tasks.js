const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { asyncHandler, csrfProtection, check, validationResult } = require('./utils')
const { User, Task, List, ListTask } = db;

router.get('/', csrfProtection, asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth;
    const tasks = await Task.findAll({
        where: { userId }
    })
    console.log(tasks)
    res.render('tasks', { tasks, csrfToken: req.csrfToken() })
}))


module.exports = router;
