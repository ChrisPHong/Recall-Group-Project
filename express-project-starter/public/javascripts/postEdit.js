const detailBtns = document.querySelectorAll('.detail-btn')

for (let i = 0; i < detailBtns.length; i++) {
    const btn = detailBtns[i];
    btn.addEventListener('click', (e) => {
        const taskId = e.target.id.split('-')[2]
        const form = document.getElementById(`detail-form-${taskId}`)
        if (form.classList.contains('hidden')) {
            form.classList.remove('hidden')
        } else {
            form.classList.add('hidden')
        }

        const closeBtn = document.getElementById(`task-close-${taskId}`)
        console.log(taskId)
        closeBtn.addEventListener('click', async (closeEvent) => {
            closeEvent.preventDefault()
            const content = form.content.value;
            const dueDate = form.dueDate.value;
            const priority = form.priority.checked;
            const gitRepoLink = form.gitRepoLink.value;
            const location = form.location.value
            const listId = form.listId.value

            console.log(priority)

            const res = await fetch(`/tasks/${taskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content,
                    dueDate,
                    priority,
                    gitRepoLink,
                    location,
                })
            })

            const data = await res.json()
            if (data.message === 'Success') {
                // console.log(data)
                const titleEle = document.getElementById(`${postId}-title`)
                const contentEle = document.getElementById(`${postId}-content`)
                titleEle.innerHTML = data.post.title
                contentEle.innerHTML = data.post.content
                form.classList.add('hidden')
            } else {
                // create elements with error message
            }
        })

    })
}
