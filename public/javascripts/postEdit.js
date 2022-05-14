const detailBtns = document.querySelectorAll('.tasks')

for (let i = 0; i < detailBtns.length; i++) {
  const btn = detailBtns[i];
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const taskId = btn.id.split('-')[1]
    const outerFormDiv = document.getElementsByClassName('edit-form');
    const currentDiv = document.getElementById(`div-form-${taskId}`)
    const form = document.getElementById(`detail-form-${taskId}`)
    if (form.classList.contains('hidden')) {
      Array.from(outerFormDiv).forEach(div => {
        div.classList.add('hidden');
      })
      currentDiv.classList.remove('hidden');
      form.classList.remove('hidden')
    } else {
      form.classList.add('hidden')
    }

    const initialListId = form.listId.value;

    const closeBtn = document.getElementById(`task-close-${taskId}`)
    closeBtn.addEventListener('click', async (closeEvent) => {
      closeEvent.preventDefault()
      closeEvent.stopPropagation();
      const content = form.content.value;
      const dueDate = form.dueDate.value;
      const priority = form.priority.checked;
      const gitRepoLink = form.gitRepoLink.value;
      const location = form.location.value;
      const listId = form.listId.value;
      try {
        const res = await fetch(`/tasks/${taskId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content,
            dueDate,
            priority,
            gitRepoLink,
            location,
            listId
          })
        })

        const data = await res.json()
        if (data.message === 'Success') {
          console.log(data)
          // console.log(contentEle);
          const contentEle = document.getElementById(`task-${taskId}`);
          contentEle.innerHTML = data.task.content;
          form.classList.add('hidden');;
        }
      } catch (e) {
        alert(
          `Please enter a value for the 'Task' field`
        );
      }
      // if (data.message === 'Success') {
      //   console.log(data)
      //   // console.log(contentEle);
      //   const contentEle = document.getElementById(`task-${taskId}`);
      //   contentEle.innerHTML = data.task.content;
      //   form.classList.add('hidden');;
      // } else {
      //   console.log('No work!')
      // }
    })
  })
}

// const handleErrors = async (err) => {
//   if (err.status >= 400 && err.status < 600) {
//     const errorJSON = await err.json();
//     const errorsContainer = document.querySelector(".errors-container");
//     let errorsHtml = [
//       `
//         <div class="alert alert-danger">
//             Something went wrong. Please try again.
//         </div>
//       `,
//     ];
//     const { errors } = errorJSON;
//     if (errors && Array.isArray(errors)) {
//       errorsHtml = errors.map(
//         (message) => `
//           <div class="alert alert-danger">
//               ${message}
//           </div>
//         `
//       );
//     }
//     errorsContainer.innerHTML = errorsHtml.join("");
//   } else {
//     alert(
//       "Please enter a value for the task field"
//     );
//   }
// };
