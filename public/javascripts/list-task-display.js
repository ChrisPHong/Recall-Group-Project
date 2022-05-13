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
    console.log(tasks)
    const taskContainer = document.querySelector('.display-tasks');
    const taskHTML = tasks.map(
      ({ content, id, completed, dueDate, location, gitRepoLink }) => {
        if (completed === true) {
          return `
        <ul id='all-task-list'>
          <div id='list-item-${id}' class='list-item task-item'>
            <li id='task-${id}' class='tasks'>${content}</li>
          <div class='done-check'>
            <label class='done-label'> done? </label>
            <input type='checkbox' name='completed' class='task-checkbox' id='checkbox-${id}' checked>
          </div>
          </div>
          <div class="edit-form" id="div-form-${id}">
    <p class="column-titles hidden" id="task-details-title-${id}">Task Details:</p>
    <form class="hidden task-form" id="detail-form-${id}" autocomplete="off">
            <div class="input-label-field">
                <div>
                    <label for="content">Task: </label>
                    <input type="text" id="content" name="content" value="${content}">
                        <div class="input-label-field">
                            <label>Due Date:</label>
                            <input type="date" value="${dueDate}" name="dueDate">
                                <br>
                                </div>
                                <div class="input-label-field"><label>Priority:</label>
                                    <input type="checkbox" name="priority"></div><div class="input-label-field"><div>
                                        <label for="gitRepoLink">Git Repo Link:
                                        </label>
                                        <input type="text" id="gitRepoLink" name="gitRepoLink" value="${gitRepoLink}"></div></div>
                                <div class="input-label-field"><div>
                                    <label for="location">Location: </label>
                                    <input type="text" id="location" name="location" value="${location}"></div></div>
                                    <div class="input-label-field">
                                    <label>List:</label>
                                     <select name="listId">
                                        <option value="noList">No List</option>
                                        <option value="5">Groceries</option>
                                        <option value="4" selected="selected">Things2</option>
                                        </select></div>
                                <br>
                                    <div class="button-container"></div>
                                    <button class="close-btn btn task-detail-btn" type="submit" id="task-close-${id}">Close</button>
                                    <button class="delete-btn btn task-detail-btn" id="task-delete-${id}">Delete Task</button>
                                </form>
                        </div>

        </ul>
        `
        } else {
          return `
          <ul id='all-task-list'>
            <div id='list-item-${id}' class='list-item task-item'>
              <li id='task-${id}' class='tasks'>${content}</li>
            <div class='done-check'>
              <label class='done-label'> done? </label>
              <input type='checkbox' name='completed' class='task-checkbox' id='checkbox-${id}'>
            </div>
            </div>
<div class="edit-form" id="div-form-${id}">
    <p class="column-titles hidden" id="task-details-title-${id}">Task Details:</p>
    <form class="hidden task-form" id="detail-form-${id}" autocomplete="off">
            <div class="input-label-field">
                <div>
                    <label for="content">Task: </label>
                    <input type="text" id="content" name="content" value="${content}">
                        <div class="input-label-field">
                            <label>Due Date:</label>
                            <input type="date" value="${dueDate}" name="dueDate">
                                <br>
                                </div>
                                <div class="input-label-field"><label>Priority:</label>
                                    <input type="checkbox" name="priority"></div><div class="input-label-field"><div>
                                        <label for="gitRepoLink">Git Repo Link:
                                        </label>
                                        <input type="text" id="gitRepoLink" name="gitRepoLink" value="${gitRepoLink}"></div></div>
                                <div class="input-label-field"><div>
                                    <label for="location">Location: </label>
                                    <input type="text" id="location" name="location" value="${location}"></div></div>
                                    <div class="input-label-field">
                                    <label>List:</label>
                                     <select name="listId">
                                        <option value="noList">No List</option>
                                        <option value="5">Groceries</option>
                                        <option value="4" selected="selected">Things2</option>
                                        </select></div>
                                <br>
                                    <div class="button-container"></div>
                                    <button class="close-btn btn task-detail-btn" type="submit" id="task-close-${id}">Close</button>
                                    <button class="delete-btn btn task-detail-btn" id="task-delete-${id}">Delete Task</button>
                                </form>
                        </div>

          </ul>
          `
        }
      });


    let completedTasks = 0;
    let uncompletedTasks = 0;
    tasks.forEach(task => {
      if (task.completed === true) completedTasks += 1;
      else uncompletedTasks += 1;
    })

    // console.log('completedTasks: ', completedTasks)
    // console.log('uncompletedTasks: ', uncompletedTasks)
    // console.log(tasks.length);
    const columnTitle = document.getElementById('task-title')
    // columnTitle.innerText = `${list.name}: `;
    columnTitle.innerHTML = `
      ${list.name}
      <p class='list-summary-title'>List Summary:</p>
      <span><p class= 'list-summary-details'>Tasks to Complete: ${uncompletedTasks}</p></span>
      <span><p class= 'list-summary-details'>Finished Tasks: ${completedTasks}</p></span>
    `
    taskContainer.innerHTML = taskHTML.join('');

    const checkBoxes = document.querySelectorAll('.task-checkbox');

    if (checkBoxes) {
      checkBoxes.forEach((checkbox) => {
        const taskId = checkbox.id.split('-')[1];
        checkbox.addEventListener('change', checkCheckboxStatus(taskId, checkbox))
      })
    }
    const detailsBtns = document.querySelectorAll('.tasks');

    if (detailsBtns) {
      detailsBtns.forEach((detailBtn) => {
        const taskId = detailBtn.id.split('-')[1];
        detailBtn.addEventListener('click', getTaskDetails(taskId))
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
      // console.log(data.task.completed)
      // console.log(contentEle);
    } else {
      // TODO:create elements with error message
      console.log('No work!')

    };
  }
}


const getTaskDetails = (taskId) => {
  return async (e) => {
    // e.stopPropagation();
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
