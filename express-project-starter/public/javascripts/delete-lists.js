const deleteBtns = document.querySelectorAll('.delete-lists-btn')

for (let i = 0; i < deleteBtns.length; i++) {
    const btn = deleteBtns[i];
    btn.addEventListener('click', async(e) => {
        e.preventDefault()
        const listId = e.target.id.split('-')[2]
        console.log(listId);
        const res = await fetch(`/lists/${listId}`, {
            method: 'DELETE'
        })

        const data = await res.json();
        if(data.message === 'Success'){
            const container = document.getElementById(`list-container-${listId}`)
            container.remove()
        }
    })
}


/*
- Create two separate pug files for one for creating a list and another is to
edit those lists
- When we click a delete button, we want it to delete that specific list by going through the method delete at lists/:id
-
*/
