window.addEventListener('DOMContentLoaded', async (e) => {

  //   const res = await fetch(`/tasks`);
  //   const { tasks } = await res.json();
  //  console.log(tasks)
  //   let completedTasks = 0;
  //   let uncompletedTasks = 0;
  //   tasks.forEach(task => {
  //     if (task.completed === true) completedTasks += 1;
  //     else uncompletedTasks += 1;
  //   })


  const checkButtons = document.querySelectorAll('.task-checkbox');
  let completedTasks = 0;
  let uncompletedTasks = 0;
  let totalTasks = 0;

  Array.from(checkButtons).forEach(box => {
    totalTasks += 1;
    if (box.checked) completedTasks += 1
    else uncompletedTasks += 1
  })

  const columnTitle = document.getElementById('task-title')
  columnTitle.innerHTML = `
      <p id='column-two-list-name'>To Do</p>
      <p class='list-summary-title'>All task summary:</p>
      <span><p class='list-summary-details'>Total Tasks: ${totalTasks}</p></span>
      <span><p class='list-summary-details'>Tasks to Complete: ${uncompletedTasks}</p></span>
      <span><p class='list-summary-details'>Finished Tasks: ${completedTasks}</p></span>
      `
})
