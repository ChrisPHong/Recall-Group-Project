const editBtns = document.querySelectorAll('.edit-lists-btn')

for (let i = 0; i < editBtns.length; i++) {
    const btn = editBtns[i];
    btn.addEventListener('click', (e) => {
        const listId = e.target.id.split('-')[2]
        const form = document.getElementById(`edit-lists-${listId}`)
        if (form.classList.contains('hidden')) {
            form.classList.remove('hidden')
        } else {
            form.classList.add('hidden')
        }

        const submitBtn = document.getElementById(`edit-submit-${listId}`)
        submitBtn.addEventListener('click', async (submitEvent) => {
            submitEvent.preventDefault()
            const name = document.getElementById(`${listId}-edit-name`).value

            // console.log(title, content)

            const res = await fetch(`/lists/${listId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name
                })
            })

            // const data = await res.json()
            // if (data.message === 'Success') {
                // console.log(data)
                const listEle = document.getElementById(`${listId}-title`)
                listEle.innerHTML = data.list.name
                form.classList.add('hidden')
            // } else {
            //     // create elements with error message
            // }
        })

    })
}

