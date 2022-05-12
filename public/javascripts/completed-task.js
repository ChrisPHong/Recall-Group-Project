const checkbox = document.querySelectorAll('.task-checkbox');

for (let i = 0; i < checkbox.length; i++) {
  const box = checkbox[i];
  box.addEventListener('change', async (e) => {
    e.stopPropagation();
    const taskId = box.id.split('-')[1];
    const completed = box.checked
    const res = await fetch(`tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        completed
      })
    });

    const data = await res.json()
    if (data.message === 'Success') {
      // console.log(contentEle);
    } else {
      // TODO:create elements with error message
      console.log('No work!')
    }
  });
}
