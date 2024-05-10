const { name } = require("ejs");
const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/login");

connect.then(()=>{
    console.log("Database connected");
})

.catch(()=>{
    console.log("Database cannot connected");
})

const loginschema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },

    password: {
        type: String,
        required: true, 
    }
});

// const loginschema = mongoose.Schema({
//     name: String,
//     password: String,
// });


// collect data into MongoDB server
const collection = new mongoose.model("user_data", loginschema);
module.exports = collection;