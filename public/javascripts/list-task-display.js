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

    const checkboxValues = checkCheckBox(tasks);

    const taskContainer = document.querySelector('.display-tasks');
    const taskHTML = tasks.map(
      ({ content, id, completed }) => {
        if (completed === true) {
          return `
        <ul id='all-task-list'>
          <div id='list-item-${id}' class='list-item'>
            <li id='task-${id} class='tasks'>${content}</li>
          <div class='done-check'>
            <label class='done-label'> done? </label>
            <input type='checkbox' name='completed' class='task-checkbox' id='checkbox-${id}' checked>
          </div>
          </div>
        </ul>
        `
        } else {
          return `
          <ul id='all-task-list'>
            <div id='list-item-${id}' class='list-item'>
              <li id='task-${id} class='tasks'>${content}</li>
            <div class='done-check'>
              <label class='done-label'> done? </label>
              <input type='checkbox' name='completed' class='task-checkbox' id='checkbox-${id}'>
            </div>
            </div>
          </ul>
          `
        }
      });


    const columnTitle = document.getElementById('task-title')
    columnTitle.innerText = `${list.name}: `;
    taskContainer.innerHTML = taskHTML.join('');

    const checkBoxes = document.querySelectorAll('.task-checkbox');
    if (checkBoxes) {
      checkBoxes.forEach((checkbox) => {
        const taskId = checkbox.id.split('-')[1];
        checkbox.addEventListener('change', checkCheckboxStatus(taskId, checkbox))
      })
    }
  });
}

const checkCheckBox = (tasks) => {
  const completedTasks = {}

  tasks.forEach((task) => {
    completedTasks[task.id] = task.completed;
  })
  return completedTasks;
}

const checkCheckboxStatus = (taskId, checkbox) => {
  return async () => {
    const checkedStatus = checkbox.checked
    const res = await fetch(`tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        completed: checkedStatus
      })
    });

    const data = await res.json()
    if (data.message === 'Success') {
      console.log(data.task.completed)
      // console.log(contentEle);
    } else {
      // TODO:create elements with error message
      console.log('No work!')

    };
  }
}