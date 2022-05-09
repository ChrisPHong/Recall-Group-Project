
# Instructions
1. Use cmnds.md file
2. Use previous projects for auth and database setup
3. Set up database
4. Set up user auth
5. Set up demo user button (with hidden form)
6. Work on features (together or separately)
7. For merge conflicts:
    - Pause
    - Get together
    - Figure out conflict
8. If you split up, work on different sections to prevent merge conflicts.

# Github Workflow
Make new branch
Work on new branch
    git add .
    git commit -m ""
    git push
Make a pull request
Someone will approve pull request, LOOK AT CODE, then merge to main
Check out back to main, git pull
Update your working branch by switching to that branch and using 'git merge main'

# Git Stash
1.	"Git stash" to pick up all the changes
2.	Git checkout the current local branch
3.	"Git stash apply" to move all the changes to current local branch
4.	"Git stash drop" – delete all the changes


<!-- User Model -->
npx sequelize model:generate --name User --attributes firstName:string,lastName:string,emailAddress:string,gitLink:string,hashedPassword:string

<!-- Task Model -->
npx sequelize model:generate --name Task --attributes content:string,userId:integer,completed:boolean,dueDate:dateonly,priority:boolean,gitRepoLink:string,location:string

<!-- Lists Model -->
npx sequelize model:generate --name List --attributes name:string,userId:integer

<!-- ListTasks Model -->
npx sequelize model:generate --name ListTask --attributes listId:integer,taskId:integer

<!-- Seed Files -->
npx sequelize seed:generate --name UsersSeed
npx sequelize seed:generate --name TasksSeed
npx sequelize seed:generate --name ListsSeed
npx sequelize seed:generate --name ListsTasksSeed


<!-- npm clean  -->
npx dotenv sequelize db:seed:undo:all
npx dotenv sequelize db:migrate:undo
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
