const divClose = document.querySelector('#loginGrey')
divClose.addEventListener('click', async (e) => {
    console.log('-------IM WORKING--------')
    await fetch('/', {
        method: 'GET'
    })
});
