const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const sequelize = require('./db/sequelize')

const Item = require('./models/Todo')

const app = express()

app.use(cors())
app.use(bodyParser.json())


app.post('/add-item', async (req, res, next) => {
    try {
        await Item.create({name: req.body.name})
    } catch(e) {
        console.log(e.message)
    }
})

app.get('/get-items', async (req, res, next) => {
    const items = await Item.findAll()

    res.json(items)
})

app.delete('/remove/:id', async (req, res, next) => {
    await Item.destroy({where: {id: req.params.id}})
    res.status(200)
})



sequelize.sync().then(() => app.listen(5000, () => console.log('App running on 3000')))