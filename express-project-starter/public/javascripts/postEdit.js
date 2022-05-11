const detailBtns = document.querySelectorAll('.tasks')

for (let i = 0; i < detailBtns.length; i++) {
    const btn = detailBtns[i];
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const taskId = btn.id.split('-')[1]
        console.log(taskId)
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
            closeEvent.stopPropagation();
            const content = form.content.value;
            const dueDate = form.dueDate.value;
            const priority = form.priority.checked;
            const gitRepoLink = form.gitRepoLink.value;
            const location = form.location.value;
            const listId = form.listId.value;

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
                console.log(data)
                // console.log(contentEle);
                const contentEle = document.getElementById(`task-${taskId}`);
                contentEle.innerHTML = data.task.content;
                form.classList.add('hidden');;
            } else {
                // TODO: create elements with error message
                console.log('No work!')
            }
        })

    })
}
