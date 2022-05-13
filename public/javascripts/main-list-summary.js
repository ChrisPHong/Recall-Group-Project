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
  console.log('ok')
  const columnTitle = document.getElementById('task-title')
  columnTitle.innerHTML = `
      To Do:
      <p class='list-summary-title'>List Summary:</p>
      <span><p class= 'list-summary-details'>Tasks to Complete:</p></span>
      <span><p class= 'list-summary-details'>Finished Tasks:</p></span>
      `
})
