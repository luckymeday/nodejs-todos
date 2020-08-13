// import below module or method
const fs = require("fs"); // fs is to read file from the local/computer
const yargs = require("yargs");

// const chalk = require("chalk");
// console.log(chalk.blue("Hello world!"));
// console.log(chalk.red("Hello world!"));
// console.log(chalk.green("Hello world!"));
// console.log(chalk.red.bold("Hello world!"));
const c = require("chalk");
// c.blue("blue");
// c.yellow("yellow");
// c.green("green");
// c.black("black");
// c.red("red");


// 1. "readFileSync" to read data from data.json
function loadData() {
    try {
        const buffer = fs.readFileSync("data.json"); // buffer is to correspond to the raw memory, need a file name argument
        const dataString = buffer.toString(); // 1) to read as a "string" from data
        // console.log(buffer.toString()); 
        // console.log(JSON.parse(dataString)); // 2) to read as a javascript object [array]
        const javascriptObject = JSON.parse(dataString); // 2) *** to read as javascript object [array] so that can use js method such as push
        // console.log(javascriptObject)
        return javascriptObject; // javascript array
    }
    catch (err) {
        console.log("Error", err);
        return [];
    }
}
// console.log(loadData())

// 2. manipulate the data 

// 3. "writeFileSync" to save it back to data.json // to understand what you gonna do
function saveData(data) {
    // write a string or buffer to data.json
    fs.writeFileSync("data.json", JSON.stringify(data)) // need two arguments
    // fs.writeFile() // one second execute, doesn't wait 
};

// if (process.argv[2] && process.argv[2] === "list") {
//     const todos = loadData();
//     console.log(todos);
// } else if (process.argv[2] && process.argv[2] === "add") {
//     if (process.argv[3]) {
//         const todos = loadData();
//         todos.push(process.argv[3])
//         saveData(todos)
//     }
// }

// ************* show list *************
// ************* node app.js list *************
yargs.command({
    command: "list",
    describe: "todo list, use '--completed' to see completed todos",
    builder: {
        completed: {
            describe: "show todos based on completed option \n could be either 'all' || 'completed' || 'uncompleted'",
            type: "string",
            default: "all" // defualt 사용이유가 무엇이지???
        },
    },
    handler: function ({ completed }) { // 펑션도 오브젝트 중 하나, 여기에 왜 completed가 오브젝트로 들어가지???
        const todos = loadData()
        let results
        if (completed === "completed") { // 위에 completed를 받아옴. 근데 이건 어떻게 보여지지???
            results = todos.filter(item => item.completed === true) // 만약 일을 마쳤다면, 마친 일들만 모아서 아이템으로 필터링
        } else if (completed === "uncompleted") {
            results = todos.filter(e => e.completed === false) // 만약 일을 마치지 못했다면, 마치지 못한 일들만 아이템으로 필터링
        } else {
            results = todos
        }
        results.forEach((e) => {
            console.log('------------------------------------')
            console.log(`|id: ${c.bold.blue(e.id)}, \n|to-do: ${c.bold.green(e.todo)}, \n|completed: ${c.bold.yellow(e.completed)}`);
            console.log('------------------------------------')
        })
    }
});

// ************* add list *************
// ************* node app.js add --todo="string" *************
yargs.command({
    command: "add",
    describe: "use to add a new todo list",
    builder: {
        todo: {
            describe: "describe what you gonna do",
            demandOption: true, // is this argument required or not, 무조건 들어가야 하는지 여부???
            type: "string"
        },
        completed: {
            describe: "todo status",
            default: false,
            type: "boolean"
        },
    },
    handler: function (arguments) {
        // console.log(arguments.todo, arguments.completed);
        const todos = loadData();
        const id = todos.length === 0 ? 1 : todos[todos.length - 1].id + 1; // 인덱스넘버는 변화에 민감하므로, 아이디를 설정. 만약 todo리스트의 길이가 0일 경우(인덱스가 0), 아이디는 1부터 시작한다. 그렇지 않을 경우는 todo리스트[인덱스번호].아이디번호에 1을 더하여 번호를 설정한다. ex)todos[5].id + 1
        todos.push({
            id: id,
            todo: arguments.todo,
            completed: arguments.completed, // 위의 completed를 어떤식으로 쓸 수 있지???
        });
        console.log(todos);
        saveData(todos);
        console.log("add successfully")
    }
});

// ************* delete list *************
// ************* node app.js delete --id="number" *************
yargs.command({
    command: "delete",
    describe: "delete a todo list by using the ID",
    builder: {
        id: {
            describe: "The ID you want to delete",
            type: "number",
            demandOption: true // 무조건 값이 있을 것???
        },
    },
    handler: function (args) {
        const todos = loadData();
        const results = todos.filter(item => item.id !== args.id); // 아이템의 아이디번호가, 내가 입력한 값과 다를 경우만 필터링, 근데 여기서 말하는 args.id의미가 뭐지???
        saveData(results);
        console.log("delete one item done")
    },
});

// ************* delete all list *************
// ************* node app.js delete_all *************
yargs.command({
    command: "delete_all",
    describe: "delete all list",
    builder: {
        // deleteAll: { // 이런 key name을 써도 되나???
        //     describe: "delete all list at one time",
        //     type: "string",
        //     default: "all",
        //     demandOption: false
        // },
    },
    handler: function () { // 평션안에 이걸 넣는 법???
        saveData([]);
        console.log('delete all done')
    }
});

// ************* toggle a list *************
// ************* node app.js toggle --id="number" *************
yargs.command({
    command: "toggle",
    describe: "to change status to completed",
    builder: {
        id: {
            describe: "to change a todo list status by using ID",
            demandOption: true,
            type: "number"
        },
    },
    handler: function (args) {
        const todos = loadData()
        const id = args.id
        let index = todos.findIndex(item => item.id === parseInt(id))

        if (index >= 0) {
            todos[index].completed = !todos[index].completed
            console.log("completed")
        } else {
            return "That item does not exist"
        }
        saveData(todos);
    }
});

yargs.parse(); // run the config and print out all the messages nicely in our terminal






// {
//     key1: value1, 
//     key2: value2
// }
// { key: value } key is just a name, value can be a string, number, array, object, or function







