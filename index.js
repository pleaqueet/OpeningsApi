const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
require('dotenv/config')

// Model
const Opening = require('./models/opening');

// MongoDB connect
mongoose.connect('',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    () => {
        console.log('connected to MongoDB')
    })

app.use(express.json())

// GET
app.get('/api/openings', async (req, res) => {
    try {
        const openings = await Opening.find().select('-__v');
        res.json(openings)
    } catch (e) {
        console.log(e)
    }
})

// POST
app.post('/api/openings', async (req, res) => {
    const opening = new Opening({
        title: req.body.title,
        audio: req.body.audio,
        difficulty: Number(req.body.difficulty)
    })
    try {
        const savedOpening = await opening.save();
        res.json(savedOpening)
    } catch (e) {
        console.log(e)
    }
})

// DELETE
app.delete('/api/openings/:id', async (req, res) => {
    try {
        const removedOpening = await Opening.deleteOne({_id: req.params.id})
        res.json(removedOpening)
    } catch (e) {
        console.log(e)
    }
})

app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(55707, () => console.log('Server has been started...'))
