const express = require('express')
// const app = express()
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello There')
})
router.get('/hello', (req, res) => {
    res.send('this is the user list')
})

router.get('/:id' , (req, res) => {
    console.log(req.params.id)
    res.send(`Sending user with user  with ${req.params.id}`)
})


router.post('/new', (req, res) => {
    console.log('Creating new User')
})
module.exports = router