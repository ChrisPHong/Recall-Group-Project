console.log('edit-lists.js is RUNNING');
const editBtns = document.querySelectorAll('.edit-lists-btn')

for (let i = 0; i < editBtns.length; i++) {
    const btn = editBtns[i];
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const listId = e.target.id.split('-')[2]
        const form = document.getElementById(`edit-form-${listId}`)
        console.log(form);
        if (form.classList.contains('hidden')) {
            form.classList.remove('hidden')
        } else {
            form.classList.add('hidden')
        }

        const submitBtn = document.getElementById(`edit-submit-${listId}`)
        submitBtn.addEventListener('click', async (submitEvent) => {
            submitEvent.preventDefault();
            submitEvent.stopPropagation();
            const name = document.getElementById(`${listId}-edit-name`).value
            console.log('------------------------------------------------', name);

            const res = await fetch(`/lists/${listId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name
                })
            })

            const data = await res.json()
            if (data.message === 'Success') {
                console.log(data)
                const nameValue = document.getElementById(`${listId}-name`)
                nameValue.innerHTML = data.list.name
                form.classList.add('hidden')
            } else {
                // create elements with error message
            }
        })

    })
}
