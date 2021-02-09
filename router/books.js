const express = require('express')
const route = express.Router()
let books = require('../db/books.json')



route.get('/api/v1/books', (req, res) => {
    res.status(200).json(books)
})

route.get('/api/v1/books/:isbn', (req, res) => {
    const book = books.find(i => i.isbn === +req.params.isbn)
    res.status(200).json(book)
})

route.post('/api/v1/books', (req, res) => {
    const {
        judul,
        sinopsis,
        penulis,
        genre
    } = req.body

    const isbn = books[books.length - 1].isbn + 1
    const book = {
        isbn,
        judul,
        sinopsis,
        penulis,
        genre
    }

    books.push(book)

    res.status(201).json(books)
})

route.put('/api/v1/books/:isbn', (req, res) => {
    const isbn = req.params.isbn
    books.filter(book => {
        if (book.isbn == isbn) {
            book.judul = req.body.judul
            book.sinopsis = req.body.sinopsis
            book.penulis = req.body.penulis
            book.genre = req.body.genre
            return book
        }
    })
    res.status(200).json(books)
})

route.delete('/api/v1/books/:isbn', (req, res) => {
    books = books.filter(i => i.isbn !== +req.params.isbn)
    res.status(200).json(books)
})

module.exports = route;