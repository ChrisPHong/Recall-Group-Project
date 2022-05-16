# Recall
Check out Recall here: [Recall Task App](https://recall-app.herokuapp.com/)

Recall is a clone of the website [RememberTheMilk](https://www.rememberthemilk.com/), a task management website that allows users to create tasks and assign them to lists.  Our backend was built using PostgreSQL, Sequelize and Express. The frontend was developed using Pug HTML preprocessor.

## Landing Page:
![landing-page view](/images/landing-page.png)


## Authentication
Recall requires users to register and create an account before accessing any of it's features.  Users' tasks and lists are stored in the database and retrieved and displayed upon a successful login.  Passwords are hashed using BcryptJS and stored in the database. Any attempted navigation to other sections of the site, without authentication, will result in the user being redirected to the `/login` page.

## Home Page:
![home-page view](/images/home-page.png)

## Features
Once authenticated, users are able to create tasks.  By default, tasks are not assigned to specific lists and all of the users tasks will be displayed on the home page.  If desired, users can create lists and assign tasks to specific lists.  Once lists and tasks have been created, users have the ability to delete and edit their contents.
When a user clicks on a specific task, additional information and updating options are displayed for that task. Additionally, users have the ability to search through tasks


![task-detail](/images/task-detail.png)

## Backend
The Tasks and Lists tables are the most important models for Recall. The Tasks table stores the most amount of information, as creating and updating tasks have the most options associated with them.  Users have the ability to perform all CRUD on both lists and tasks.
![task-detail](/images/schema.png)

## ToDo's/Future Features
There are quite a few features that we would have liked to implement for this project.  Given the short window of time we had to complete the site, we would like to add the following features at some point in the future:
- 'SmartAdd' feature to automatically load tasks to certain lists upon list creation
- Task assignment to other users.  Users will have the ability to add other Recall users to their dashboard.  Users can then assign tasks to other users and have those tasks displayed in the 'To do' section of that user's homepage.
- 'Display Mode' to allow users to toggle between different color themes.

## Technical Implementation Details
From the beginning we wanted our site to be displayed on one page.  This required many fetch calls to our API.  This became particularly challenging as our site and features grew throughout the week. Rendering task details and editing options from different locations was tricky. Rendering the initial display from a Pug template was easy enough.  However, displaying certain options after a task had been created and placed in a list required additional logic:
```js
    const { tasks, list, listArray } = await res.json();

    const optionValues = listArray.map((lists) => {
      console.log('tasks', tasks);
      const listName = lists.name
      const listId = lists.id
      if(tasks.length > 0){
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
```

## Additional Project Resources
- [API Documentation](https://github.com/ChrisPHong/Recall-Group-Project/wiki/API-Documentation)
- [Feature List](https://github.com/ChrisPHong/Recall-Group-Project/wiki/Feature-List)
- [User Story](https://github.com/ChrisPHong/Recall-Group-Project/wiki/User-Story)
- [Front End Routes](https://github.com/ChrisPHong/Recall-Group-Project/wiki/Frontend-Routes)
