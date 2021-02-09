const express = require('express')
const booksRouter = require('./router/books')
const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use(booksRouter)



//middleware error handling
app.use((req, res, next) => {
    res.status(404).json({
        status: 'fail',
        errors: 'are you lost?'
    })
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        status: 'fail',
        errors: err.message
    })
})

app.listen(3003, () => {
    console.log('server berjalan di port 3000');
})