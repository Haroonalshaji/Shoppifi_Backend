const mongoose = require('mongoose');

const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then((res) => {
    console.log("MongoDB Connection Established");
}).catch((err) => {
    console.log(err);
})