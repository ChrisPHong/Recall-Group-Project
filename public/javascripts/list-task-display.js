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


const getTaskDetails = (taskId) => {
  return async (e) => {
    e.stopPropagation();
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

    console.log(form)

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
      } else {
        // TODO:create elements with error message
        console.log('No work!')
      }
    })
  }
}

const detailsBtns = document.querySelectorAll('.tasks');

if (detailsBtns) {
  detailsBtns.forEach((detailBtn) => {
    const taskId = detailBtn.id.split('-')[1];
    detailBtn.addEventListener('click', getTaskDetails(taskId))
  })
}