const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { asyncHandler, handleValidationErrors, csrfProtection, check, validationResult } = require('./utils')
const { User, Task, List, ListTask } = db;
const { requireAuth } = require('../auth')


router.get('/', csrfProtection, requireAuth, asyncHandler(async (req, res, next) => {
  const { userId } = req.session.auth;
  const tasks = await Task.findAll({
    where: { userId },
    order: [['dueDate', 'ASC']]
  })
  const lists = await List.findAll({
    where: { userId },
    order: [['name', 'ASC']]
  })
  const task = {}

  //this should be able to ref the list associated with it as well as other properties
  res.render('tasks', { tasks, task, lists, csrfToken: req.csrfToken() })
}))

// const url = new RegExp("(.*github.com//.*//.*)")

const validateTask = [
  check('content')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a description.')
    .isLength({ max: 250 })
    .withMessage('Input too long.'),
  check('dueDate')
    .isISO8601()
    .withMessage('Please provide a date.'),
  check('gitRepoLink')
    // .matches(url)
    // .withMessage('URL was proivided in the incorrect format')
    .isLength({ max: 250 })
    .withMessage('Input too long.'),
  check('location')
    .isLength({ max: 250 })
    .withMessage('Input too long.'),
]

const validateTaskEdit = [
  check('content')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a description.')
    .isLength({ max: 250 })
    .withMessage('Input too long.'),
]

router.post('/', csrfProtection, validateTask, asyncHandler(async (req, res, next) => {
  const { userId } = req.session.auth;
  const tasks = await Task.findAll({
    where: { userId }
  })
  const lists = await List.findAll({
    where: { userId }
  })
  const {
    content,
    dueDate,
    priority,
    gitRepoLink,
    location,
    listId
  } = req.body


  const task = await Task.build({
    userId,
    content,
    dueDate,
    priority,
    gitRepoLink,
    location,
    completed: false
  })

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    if (listId === 'noList') {
      task.listId = null
    } else {
      task.listId = listId
    }
    await task.save();
    res.redirect('/tasks');
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('tasks', {
      title: 'tasks',
      tasks,
      task,
      lists,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}))

router.delete('/:id(\\d+)', asyncHandler(async (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = await Task.findByPk(taskId)
  if (task) {
    await task.destroy()
    res.json({ message: 'Success' })
  } else {
    res.json({ message: 'Fail' })
  }
}))

router.put('/:id(\\d+)', asyncHandler(async (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = await Task.findByPk(taskId);

  task.completed = req.body.completed;
  task.content = req.body.content;
  task.dueDate = req.body.dueDate;
  task.priority = req.body.priority;
  task.gitRepoLink = req.body.gitRepoLink;
  task.location = req.body.location;
  if (req.body.listId == 'noList') {
    task.listId = null;
  } else task.listId = req.body.listId;


  await task.save();

  res.json({
    message: 'Success',
    task
  })
}));

module.exports = router;
