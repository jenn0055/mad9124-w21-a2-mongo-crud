// Don't forget to use NPM to install Express and Mongoose.

const mongoose = require('mongoose')
mongoose
.connect('mongodb://localhost:27017/mad9124', {useNewUrlParser: true})
.then(() => console.log('Connected to MongoDB...'))
.catch(err => {
    console.error('Problem connecting to MongoDB...'. err)
    process.exit(1)
})

const express = require('express')
const app = express ()

app.use(express.json())
app.use('/api/students', require('./routes/students'))
app.use('/api/course', require('./routes/course'))

const port = process.env.PORT || 3030
app.listen(port, () => console.log(`Server listening on port ${port} ... `))