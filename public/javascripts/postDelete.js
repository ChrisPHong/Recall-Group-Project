const deleteBtns = document.querySelectorAll('.delete-btn')
for (let i = 0; i < deleteBtns.length; i++) {
  const btn = deleteBtns[i];
  btn.addEventListener('click', async (e) => {
    e.preventDefault()
    const taskId = e.target.id.split('-')[2]
    const res = await fetch(`/tasks/${taskId}`, {
      method: 'DELETE'
    })

    const data = await res.json()
    if (data.message === 'Success') {
      const taskDetails = document.getElementById(`detail-form-${taskId}`);
      const container = document.getElementById(`list-item-${taskId}`);
      container.remove();
      taskDetails.remove();
    } else {

    }
  })
}
