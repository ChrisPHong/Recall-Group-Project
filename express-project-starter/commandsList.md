<!-- User Model -->
npx sequelize model:generate --name User --attributes firstName:string,lastName:string,emailAddress:string,gitLink:string,hashedPassword:string

<!-- Task Model -->
npx sequelize model:generate --name Task --attributes content:string,userId:integer,completed:boolean,dueDate:dateonly,priority:boolean,gitRepoLink:string,location:string

<!-- Lists Model -->
npx sequelize model:generate --name List --attributes name:string,userId:integer

<!-- ListTasks Model -->
npx sequelize model:generate --name ListTask --attributes listId:integer,taskId:integer


