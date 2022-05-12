const detailBtns = document.querySelectorAll('.lists');

for (let i = 0; i < detailBtns.length; i++) {
  const btn = detailBtns[i];
  btn.addEventListener('click', async (e) => {
    e.stopPropagation();
    const listId = btn.id.split('-')[1];
    const taskList = document.getElementById('all-task-list');
    taskList.classList.add('hidden');
    const res = await fetch (`lists/${listId}`);

    const { tasks } = await res.json();
    console.log(tasks);

    const taskContainer = document.querySelector('.display-tasks');
    const taskHTML = tasks.map(
      ( { content } ) => `
      <li>${content}<li>
      `
    )
    taskContainer.innerHTML = taskHTML.join('');
  });
}