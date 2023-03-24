const mongoose = require ('mongoose');
const host = "127.0.0.1";
const port="27017";
let Promise=mongoose.connect(`mongodb://${host}:${port}/sauhaard_dynamic`,{
    // useCreateIndex:true,
    // useNewUrlParser:true,
    // useUnifiedTopology:true //mongoose 6.0 behaves like they are always true
});

Promise.then(()=>{
    console.log("connection successful");
}).catch((error) => {
    console.log(error);
})