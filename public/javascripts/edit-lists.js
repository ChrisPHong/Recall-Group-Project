const editBtns = document.querySelectorAll('.edit-lists-btn')

for (let i = 0; i < editBtns.length; i++) {
  const btn = editBtns[i];
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const listId = e.target.id.split('-')[2]
    const outerFormDiv = document.getElementsByClassName('edit-form');
    const currentDiv = document.getElementById(`div-list-form-${listId}`)
    const form = document.getElementById(`edit-form-${listId}`)
    if (form.classList.contains('hidden')) {
      Array.from(outerFormDiv).forEach(div => {
        div.classList.add('hidden');
      })
      currentDiv.classList.remove('hidden');
      form.classList.remove('hidden')
    } else {
      form.classList.add('hidden')
    }

    const submitBtn = document.getElementById(`edit-submit-${listId}`)
    submitBtn.addEventListener('click', async (submitEvent) => {
      submitEvent.preventDefault();
      submitEvent.stopPropagation();
      const name = document.getElementById(`${listId}-edit-name`).value

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
        const nameValue = document.getElementById(`name-${listId}`)
        nameValue.innerHTML = data.list.name
        form.classList.add('hidden')
      } else {
        // create elements with error message
      }
    })
    const cancelButton = document.getElementById(`cancel-submit-${listId}`);
    cancelButton.addEventListener('click', async (e) => {
      currentDiv.classList.add('hidden')
    });
  })
}
