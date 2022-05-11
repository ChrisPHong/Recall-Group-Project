const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { asyncHandler, csrfProtection, check, validationResult } = require('./utils')
const { loginUser, logoutUser } = require('../auth')
const { Task, List } = db;

// Create a list for all of the lists so that we can see all of them


// Everything below is for creating a New List

router.get('/', csrfProtection, asyncHandler(async (req, res, next) => {
  const { userId } = req.session.auth
  const lists = await List.findAll({
    where: { userId }
   })
  res.render('lists', {
    title: "New List",
    csrfToken: req.csrfToken(),
    lists,
  });
}))


const listValidators = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a List Name.')
    .isLength({ max: 50 })
    .withMessage('List Name must not be more than 50 characters long.')
]

router.post('/', csrfProtection, listValidators, asyncHandler(async (req, res, next) => {
  const { name } = req.body
  const { userId } = req.session.auth;
  const list = await List.build({
    userId,
    name
  });
  const validatorErrors = validationResult(req);
  const lists = await List.findAll({
    where: { userId }
   })

  if (validatorErrors.isEmpty()) {
    await list.save();
    res.redirect('/lists')
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('lists', {
      title: 'Create a List',
      list,
      lists,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}));

router.get('/:id(\\d+/tasks)', asyncHandler(async (req, res, next) => {
  const listId = parseInt(req.params.id);
  const list = await List.findByPk(listId)
  const tasks = await Task.findAll({
    where: { listId }
  });
  res.render('list-tasks', {
    title: `${list.name}`,
    tasks
  })
}));

router.delete('/:id(\\d+)', asyncHandler(async (req, res, next) => {
  const list = await List.findByPk(req.params.id)
  if (list) {
    await list.destroy()
    console.log('Success!')
    res.json({ message: 'Success' });

  } else {
    console.log('fail');
    res.json({ message: 'fail' });
  }

  // console.log(list);

}))

router.put('/:id(\\d+)', asyncHandler(async (req, res, next) => {
  const list = await List.findByPk(req.params.id);

  list.name = req.body.name;
  await list.save()

  res.json({
    message: 'Success',
    list
  });
}));



module.exports = router;
