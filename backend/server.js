const app = require('./src/config/custom-express');

app.listen(80, () =>{
    console.log("Server active at http://localhost")
})