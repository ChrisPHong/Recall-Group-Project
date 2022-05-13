const deleteBtns = document.querySelectorAll('.deleteLists-btn')
deleteBtns.forEach(btn => {
  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    const listId = e.target.id.split('-')[1]

    console.log('listid',listId);

    const res = await fetch(`/lists/${listId}`, {
      method: 'DELETE'
    })

    const data = await res.json()
    if (data.message === 'Success') {
      const container = document.getElementById(`list-container-${listId}`)
      container.remove();
    }
  })
})

    // -----------------------------------------------

//     const detailBtns = document.querySelectorAll('.tasks')

// for (let i = 0; i < detailBtns.length; i++) {
//   const btn = detailBtns[i];
//   btn.addEventListener('click', (e) => {
//     e.stopPropagation();
//     const taskId = btn.id.split('-')[1]
//     const outerFormDiv = document.getElementsByClassName('edit-form');
//     const currentDiv = document.getElementById(div-form-${taskId})
//     const form = document.getElementById(detail-form-${taskId})
//     if (form.classList.contains('hidden')) {
//       Array.from(outerFormDiv).forEach(div => {
//         div.classList.add('hidden');
//       })
//       currentDiv.classList.remove('hidden');
//       form.classList.remove('hidden')
//     } else {
//       form.classList.add('hidden')
//     }

//     const initialListId = form.listId.value;

//     const closeBtn = document.getElementById(task-close-${taskId})
//     closeBtn.addEventListener('click', async (closeEvent) => {
//       closeEvent.preventDefault()
//       closeEvent.stopPropagation();
//       const content = form.content.value;
//       const dueDate = form.dueDate.value;
//       const priority = form.priority.checked;
//       const gitRepoLink = form.gitRepoLink.value;
//       const location = form.location.value;
//       const listId = form.listId.value;

//       const res = await fetch(/tasks/${taskId}, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           content,
//           dueDate,
//           priority,
//           gitRepoLink,
//           location,
//           listId
//         })
//       })

//       const data = await res.json()
//       if (data.message === 'Success') {
//         console.log(data)
//         // console.log(contentEle);
//         const contentEle = document.getElementById(task-${taskId});
//         contentEle.innerHTML = data.task.content;
//         form.classList.add('hidden');;
//       } else {
//         // TODO:create elements with error message
//         console.log('No work!')
//       }
//     })

//   })
// }
