const { Router } = require('express')
const articles = require('../models/articles')
const router = Router()
const { check, validationResult } = require('express-validator')

router.get('/', async (req, res) => {
    const data = await articles.find({}).lean()
    res.render('index', {data, isIndex: true}) 
})

router.get('/post', (req, res) => {
    res.render('post')
})

router.post('/post', [
    check('title')
        .trim()
        .notEmpty()
        .withMessage('Title must not be empty.')
        .isLength({ max: 40 })
        .withMessage('Title can not be longer than 40 characters.'),

    check('content')
        .trim()
        .isLength({ min: 30 })
        .withMessage('Text must be at least 30 characters.')
        .isLength({ max: 30000 })
        .withMessage('Text can not be longer than 30000 characters.')
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.render('post', {errors: errors.array()})
    } else{
        const article = new articles({
            title: req.body.title,
            content: req.body.content
        })
    
        await article.save()
        res.redirect('/')
    }
})

router.get('/edit_:_id', (req, res) => {
    articles.findById(req.params._id)
    .then(post => {
        res.render('edit', {
            _id: post._id,
            title: post.title,
            content: post.content
        })  
    })
})

router.post('/edit/article/:_id', (req, res) => {
    articles.findById(req.params._id)
    .then(post => {
        post.update({
            title: req.body.title,
            content: req.body.content
        }).then(() => {
            res.redirect('/')
        })
    })
})

router.get('/delete/article/:_id', (req, res) => {
    const {_id} = req.params
    articles.deleteOne({_id})
    .then(() => {
        res.redirect('/')
    })
    .catch(e => console.log(e))
})

router.get('/:_id', (req, res) => {
    const {_id} = req.params._id
    articles.findById(_id)
    .then(post => {
        res.render('article', {
            title: this.title,
            content: this.content
        })
    })
})

module.exports = router