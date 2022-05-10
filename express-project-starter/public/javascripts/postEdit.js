const detailBtns = document.querySelectorAll('.detail-btn')
console.log(detailBtns)

for (let i = 0; i < detailBtns.length; i++) {
    const btn = detailBtns[i];
    btn.addEventListener('click', (e) => {
        console.log('********************/////////test\\\\\\\\\***************')
        const taskId = e.target.id.split('-')[2]
        console.log(taskId)
        const form = document.getElementById(`detail-form-${task.id}`)
        if (form.classList.contains('hidden')) {
            form.classList.remove('hidden')
        } else {
            form.classList.add('hidden')
        }

        const closeBtn = document.getElementById(`task-close-${task.id}`)
        closeBtn.addEventListener('click', async (closeEvent) => {
            closeEvent.preventDefault()
            const content = document.getElementById(`edit-task-${task.id}-content`).value
            const dueDate = document.getElementById(`edit-task-${task.id}-dueDate`).value
            const priority = document.getElementById(`edit-task-${task.id}-priority`).value
            const gitRepoLink = document.getElementById(`edit-task-${task.id}-gitRepoLink`).value
            const location = document.getElementById(`edit-task-${task.id}-location`).value
            const listId = document.getElementById(`edit-task-${task.id}-listId`).value

            // console.log(title, content)

            // const res = await fetch(`/posts/${postId}`, {
            //     method: 'PUT',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         title,
            //         content
            //     })
            // })

            // const data = await res.json()
            // if (data.message === 'Success') {
            //     // console.log(data)
            //     const titleEle = document.getElementById(`${postId}-title`)
            //     const contentEle = document.getElementById(`${postId}-content`)
            //     titleEle.innerHTML = data.post.title
            //     contentEle.innerHTML = data.post.content
            //     form.classList.add('hidden')
            // } else {
            //     // create elements with error message
            // }
        })

    })
}
