const express = require('express')
const app = express()
// const port = 8000

const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const web = require('./Routes/web')
const connectDB = require('./DB/connectDB')
const fileUpload = require('express-fileupload')
const cookiesParser = require('cookie-parser')


connectDB()
app.use(cookiesParser())
app.use(fileUpload({useTempFiles:true}))
app.use(express.json())  // because API data comes in JSON










app.use('/api',web)  // localhost://: /api

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
