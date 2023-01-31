const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const hpp = require('hpp');
const mongoose = require('mongoose');
const mongoSanitize=require('express-mongo-sanitize');
const mongoRateLimiter=require('express-rate-limit');
const jwt =require('jsonwebtoken');
const xssClean=require('xss-clean');
const { readdirSync } = require("fs");
require('dotenv').config()



// @@@ middleware
const app=express();
app.use(helmet())
app.use(cors())
app.use(express.json());
app.use(hpp());
app.use(mongoSanitize());
app.use(xssClean());
const limiter= mongoRateLimiter({windowMs:15*60*1000,max:3000})
app.use(limiter)


// client use
app.use(express.static('client/build'));

// @@ routes
readdirSync("./src/routes").map(r => app.use("/api/v1", require(`./src/routes/${r}`))) 

app.get('/',(req,res)=>{
    res.json({
        status:"server running successfully"
    })
}
    )

// @@ connect mongoose
const port= process.env.PORT ||4000;
mongoose
    .connect(process.env.DATABASE)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server Running on port ${port}`);
        });
    })
    .catch((err) => console.log(err));

    
// @@ add react front end routing
app.get('*',function (req,res) {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
})