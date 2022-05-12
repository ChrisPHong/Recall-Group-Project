const search = document.querySelectorAll('.searchbar')
const searchBtn = document.querySelectorAll('.searchbarBtn')

search[0].addEventListener('input', async (e) => {
    const value = search[0].value.toLowerCase();
    const tasks = document.querySelectorAll('.task')
    tasks.forEach((e) => {
        let task = e.innerHTML;
        if (!task.toLowerCase().includes(value)) {
            e.classList.add('hidden')
        } else {
            e.classList.remove('hidden')
        }
    })
    await fetch('/tasks', {
        method: 'GET',
    })
})
