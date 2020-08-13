// console.log("hello world") // check if it works.
const fs = require("fs"); // to make it work connecting this js.file with json.file

function loadData() {
    const buffer = fs.readFileSync("test.json"); // "buffer" is to correspond the "test.json" file. And when you read the file, use "readFileSync".
    const dataString = buffer.toString(); // After "buffer", the value is computer language. You need to convert to "string" to read.
    // console.log(buffer.toString());

    const javascriptObject = JSON.parse(dataString); // After making "string", you need to make it to "object array" to use javascript method such as "pop", "push", et cetera.
    // console.log(javascriptObject);

    return javascriptObject;
};
// console.log(loadData());

function saveData(data) {
    fs.writeFileSync("test.json", JSON.stringify(data)); // writeFileSync always comes with two arguments. First is file name to put new data, second is Stringfied new data object to update.
}
// console.log(saveData());

if (process.argv[2] && process.argv[2] === "list") {
    // console.log('process.argv:', process.argv)
    const data = loadData();
    console.log(data);
}

else if (process.argv[2] && process.argv[2] === "add") {
    if (process.argv[3]) {
        const data = loadData();

        // ****************** Ex_1. enter a number, push it into the end of array. 
        // data has 7 items, data[0] = 0, data[1] = 1, data[2] = 1, data[3] = 2, data[4] = 4, data[5] = 6, data[6] = 5; data.length = 7
        data[data.length] = parseInt(process.argv[3]) // data.push(parseInt(process.argv[3])) 

        saveData(data);
    }
}

else if (process.argv[2] && process.argv[2] === "addMore") {
    if (process.argv[3]) {
        const data = loadData();

        // ****************** Ex_2. enter a number, push it into at the 3rd index. 
        // data[2]=1, data[3]=2. index starts from 0
        for (let i = data.length; i > 3; i--) {
            data[i] = data[i - 1]
        }
        data[3] = parseInt(process.argv[3]);

        saveData(data);
    }
}

else if (process.argv[2] && process.argv[2] === "find") {
    if (process.argv[3]) {
        const data = loadData();

        // ****************** Ex_3. find index of item that has value "2"
        for (let i = 0; i < data.length; i++) {
            if (data[i] === parseInt(process.argv[3])) {
                console.log(`the index of ${process.argv[3]} is `, i);
            }
        }
        // saveData(data);
    }
}


else if (process.argv[2] && process.argv[2] === "findAll") {
    if (process.argv[3]) {
        const data = loadData();

        // ****************** Ex_4. find all index of item that have value "1"

        saveData(data);
    }
}


else if (process.argv[2] && process.argv[2] === "delete") {
    if (process.argv[3]) {
        const data = loadData();

        /// ****************** Ex_5. delete the item of 5th index

        /// ****************** Ex_6. delete all items have value "1"

        saveData(data);
    }
}


