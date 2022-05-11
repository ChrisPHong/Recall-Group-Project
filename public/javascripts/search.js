const search = document.querySelectorAll('.searchbar')
const searchBtn = document.querySelectorAll('.searchbarBtn')

const db = require('../db/models');
const { asyncHandler, csrfProtection } = require('./utils')
const { User, Task } = db;



searchBtn[0].addEventListener('click', async (e) => {
    const value = search[0].value.toLowerCase();
    console.log(value)

})
