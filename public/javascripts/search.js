const search = document.querySelectorAll('.searchbar')
const searchBtn = document.querySelectorAll('.searchbarBtn')

search[0].addEventListener('input', async (e) => {
    const value = search[0].value.toLowerCase();
    const tasks = document.querySelectorAll('.task')
    tasks.forEach((e) => {
        if (e.innerHTML.includes(value)) {
            e.classList.remove('hidden')
        } else {
            e.classList.add('hidden')
        }
    })
    await fetch('/search', {
        method: 'GET',
    })
})
