const detailBtns = document.querySelectorAll('.lists');

for (let i = 0; i < detailBtns.length; i++) {
  const btn = detailBtns[i];
  btn.addEventListener('click', async (e) => {
    e.stopPropagation();
    const listId = btn.id.split('-')[1];
    const taskList = document.getElementById('all-task-list');
    taskList.classList.add('hidden');
    const res = await fetch(`lists/${listId}`);

    const { tasks, list } = await res.json();

    const taskContainer = document.querySelector('.display-tasks');
    const taskHTML = tasks.map(
      ({ content, id }) => `
      <ul>
        <li id='task-${id} class='tasks'>${content}<li>
      <ul>
      `
    );


    const columnTitle = document.getElementById('task-title')
    columnTitle.innerText = `${list.name}: `;
    taskContainer.innerHTML = taskHTML.join('');
  });
}
