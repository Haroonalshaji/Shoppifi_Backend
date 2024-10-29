require('dotenv').config()

const express = require('express');
const cors = require('cors');

// so only after importing this will show the mongodb connection established message in the terminal
const db = require('./Connection/db')

// router indele aaa route'il at varu
const router = require('./Routes/route')

const ecartServer = express()

ecartServer.use(cors());
ecartServer.use(express.json());
ecartServer.use(router)

const PORT = 3000 || process.env.PORT

ecartServer.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
})

ecartServer.get('/',(req,res)=>{
    res.send('E Cart Server started')
})