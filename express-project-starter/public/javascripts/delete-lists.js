console.log('delete-lists.js RUNNING')
const deleteBtns = document.querySelectorAll('.deleteLists-btn')
    deleteBtns.forEach(btn =>{
        btn.addEventListener('click', async(e)=>{
            e.preventDefault();
            // const formData = new FormData(form); //example for editing
            // const name = formData.get('name') //this is for editing
            const listId = e.target.id.split('-')[1]

            console.log(listId);

            const res = await fetch(`/lists/${listId}`, {
                method: 'DELETE'
            })

            const data = await res.json()
            if(data.message === 'Success'){
                const container = document.getElementById(`list-container-${listId}`)
                container.remove();
            }

        })
    })
// const editBtn = document.querySelectorAll('.edit-forms')
    // deleteBtns.forEach(btn =>{
    //     btn.addEventListener('click', async(e)=>{
    //         e.preventDefault();
    //         // const formData = new FormData(form); //example for editing
    //         // const name = formData.get('name') //this is for editing
    //         const listId = e.target.id.split('-')[1]
    //         console.log(listId);

    //         const res = await fetch(`/lists/${listId}`, {
    //             method: 'DELETE'
    //         })


    //     })
    // })
