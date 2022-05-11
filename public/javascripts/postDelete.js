const deleteBtns = document.querySelectorAll('.delete-btn')
console.log(deleteBtns);
for (let i = 0; i < deleteBtns.length; i++) {
    const btn = deleteBtns[i];
    btn.addEventListener('click', async (e) => {
        e.preventDefault()
        const taskId = e.target.id.split('-')[2]
        console.log(taskId)
        const res = await fetch(`/tasks/${taskId}`, {
            method: 'DELETE'
        })

        const data = await res.json()
        if (data.message === 'Success') {
            const container = document.getElementById(`list-item-${taskId}`)
            container.remove()
        } else {

        }
    })
}
