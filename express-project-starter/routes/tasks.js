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
  const lists = await List.findAll({
    where: { userId }
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
    .isISO8601(),
  check('gitRepoLink')
    // .matches(url)
    // .withMessage('URL was proivided in the incorrect format')
    .isLength({ max: 250 })
    .withMessage('Input too long.'),
  check('location')
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
  console.log(lists)
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
    listId,
    content,
    dueDate,
    priority,
    gitRepoLink,
    location,
    completed: false
  })

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    await task.save();
    const taskId = task.id;
    if (listId) {
      await ListTask.create({
        listId,
        taskId
      })
    }
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

router.put('/:id(\\d+)', asyncHandler(async(req, res) => {
  const taskId = parseInt(req.params.id);
  const task = await Task.findByPk(taskId);
  const listTask = await ListTask.findOne({
    where: {taskId}
  });
  const newListId = parseInt(req.body.listId)

  // console.log('Original listId: ', listTask.listId);
  // console.log('New listId: ', newListId);

  // if (newListId && newListId !== listTask.listId) {
  //   listTask.destroy()
  //   await ListTask.create({
  //     listTask: newListId,
  //     taskId
  //   });
  // };

  task.content = req.body.content;
  task.dueDate = req.body.dueDate;
  task.priority = req.body.priority;
  task.gitRepoLink = req.body.gitRepoLink;
  task.location = req.body.location;
  await task.save();

  res.json({
    message: 'Success',
    task,
    listTask
  })
}));

// list/task join table update API
// router.put('/listtasks/:id(\\d+)', asyncHandler(async(req, res) => {
//   const listId = parseInt(req.params.id);
//   const task = await ListTask.findByPk(listId);

// }));
module.exports = router;
