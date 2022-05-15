const detailBtns = document.querySelectorAll('.lists');

for (let i = 0; i < detailBtns.length; i++) {
  const btn = detailBtns[i];
  btn.addEventListener('click', async (e) => {
    e.stopPropagation();
    const listId = btn.id.split('-')[1];
    const taskList = document.getElementById('all-task-list');
    taskList.classList.add('hidden');
    const res = await fetch(`lists/${listId}`);
    const { tasks, list, listArray } = await res.json();
    const taskContainer = document.querySelector('.display-tasks');

    const optionValues = listArray.map((lists) => {
      console.log('tasks', tasks);
      const listName = lists.name
      const listId = lists.id
      if (tasks.length > 0) {

        //This goes through the array and checks to see if there are any tasks in the list.
        for (let i = 0; i < tasks.length; i++) {
          let task = tasks[i];

          if (listId === task.listId) {
            return `<option selected value="${listId}">${listName}</option>`
          } else {
            return `<option value="${listId}">${listName}</option>`

          }
        }
      } else {
        return `<option value="${listId}">${listName}</option>`
      }
    })

    const taskHTML = tasks.map(
      ({ content, id, completed, dueDate, location, gitRepoLink }) => {
        if (completed === true) {
          return `
        <ul id='all-task-list'>
          <div id='list-item-${id}' class='list-item task-item'>
          <div class="inner-list-item">
            <li id='task-${id}' class='tasks'>${content}</li>
          </div>
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
                    <input class="home-inputs" type="text" id="content" name="content" value="${content}">
                        <div class="input-label-field">
                            <label>Due Date:</label>
                            <input class="home-inputs" type="date" value="${dueDate}" name="dueDate">
                                <br>
                                </div>
                                <div class="input-label-field"><label>Priority:</label>
                                    <input type="checkbox" name="priority"></div><div class="input-label-field"><div>
                                        <label for="gitRepoLink">Git Repo Link:
                                        </label>
                                        <input class="home-inputs" type="text" id="gitRepoLink" name="gitRepoLink" value="${gitRepoLink}"></div></div>
                                <div class="input-label-field"><div>
                                    <label for="location">Location: </label>
                                    <input class="home-inputs" type="text" id="location" name="location" value="${location}"></div></div>
                                    <div class="input-label-field">
                                    <label>List:</label>
                                     <select name="listId" class="option-value">
                                        ${optionValues}
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
            <div class="inner-list-item">
              <li id='task-${id}' class='tasks'>${content}</li>
            </div>
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
                    <input type="text" id="content" name="content" value="${content}" class="home-inputs">
                        <div class="input-label-field">
                            <label>Due Date:</label>
                            <input class="home-inputs" type="date" value="${dueDate}" name="dueDate">
                                <br>
                                </div>
                                <div class="input-label-field"><label>Priority:</label>
                                    <input type="checkbox" name="priority"></div><div class="input-label-field"><div>
                                        <label for="gitRepoLink">Git Repo Link:
                                        </label>
                                        <input class="home-inputs" type="text" id="gitRepoLink" name="gitRepoLink" value="${gitRepoLink}"></div></div>
                                <div class="input-label-field"><div>
                                    <label for="location">Location: </label>
                                    <input class="home-inputs" type="text" id="location" name="location" value="${location}"></div></div>
                                    <div class="input-label-field">
                                    <label>List:</label>
                                     <select name="listId">
                                     ${optionValues}
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
    let totalTasks = 0;
    tasks.forEach(task => {
      totalTasks += 1;
      if (task.completed === true) completedTasks += 1;
      else uncompletedTasks += 1;
    })

    const columnTitle = document.getElementById('task-title')
    columnTitle.innerHTML = `
      <p id='column-two-list-name'>${list.name}</p>
      <p class='list-summary-title'>List Summary:</p>
      <span><p class= 'list-summary-details'>Total Tasks: ${totalTasks}</p></span>
      <span><p class= 'list-summary-details'>Tasks to Complete: ${uncompletedTasks}</p></span>
      <span><p class= 'list-summary-details'>Finished Tasks: ${completedTasks}</p></span>
    `
    taskContainer.innerHTML = taskHTML.join('');

    const checkBoxes = document.querySelectorAll('.task-checkbox');

    if (checkBoxes) {
      checkBoxes.forEach((checkbox) => {
        console.log('taskId')
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


    const initialListId = form.listId.value;
    const actualInitialId = initialListId;

    const deleteBtn = document.getElementById(`task-delete-${taskId}`)
    deleteBtn.addEventListener('click', async (deleteButton) => {
      deleteButton.stopPropagation();
      deleteButton.preventDefault();

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

    const closeBtn = document.getElementById(`task-close-${taskId}`)
    console.log('this is the delete button!', closeBtn);
    closeBtn.addEventListener('click', async (closeEvent) => {
      closeEvent.preventDefault()
      closeEvent.stopPropagation();
      const content = form.content.value;
      const dueDate = form.dueDate.value;
      const priority = form.priority.checked;
      const gitRepoLink = form.gitRepoLink.value;
      const location = form.location.value;
      const listId = form.listId.value;

      console.log(initialListId, 'initialListId')
      console.log(listId, 'changed list ID')

      if (actualInitialId !== listId) {
        console.log('Remove this guy!');
        const getTask = document.getElementById(`list-item-${taskId}`)
        getTask.style.display = 'none';

      } else {
        console.log('Nothing Happens');
        // console.log(initialListId, 'initial')
        // console.log(listId, 'actual')
      }

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
        console.log(data);
        const contentEle = document.getElementById(`task-${taskId}`);
        contentEle.innerHTML = data.task.content;
        form.classList.add('hidden');

      } else {
        // TODO:create elements with error message
        console.log('No work!')
      }
    })
  }
}
