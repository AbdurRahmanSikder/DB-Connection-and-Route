const express = require('express');
const router = express.Router();
const person = require('./../models/user');

router.post('/', async function (req, res) {
    try {
        const data = req.body;

        const newPerson = new person(data);

        const response = await newPerson.save();
        console.log('data save');
        res.status(200).json(response);

    }
    catch (err) {
        console.log(err);
        res.status(500).json('error');
    }

})
router.get('/', async function (req, res) {
    try {
        const response = await person.find();
        console.log('data fetched');
        res.status(200).json(response);

    }
    catch (err) {
        console.log(err);
        res.status(500).json('error');
    }

})

router.get('/:worktype', async function (req, res) {
    try {
        const worktype = req.params.worktype;
        if (worktype == 'Chef' || worktype == 'manager' || worktype == 'waiter') {
            const response = await person.find({ work: worktype });
            console.log('response fetch');
            res.status(200).json(response);
        }
        else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal error' });
    }
})
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatePersonData = req.body;

        const response = await person.findByIdAndUpdate(personId, updatePersonData, {
            new: true,
            runValidators: true,
        })
        if (!response) {
            return res.status(404).json({ error: 'person not found' });
        }

        console.log('data updated');
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });

    }
})

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await person.findByIdAndDelete(personId)
        if (!response) {
            return res.status(404).json({ error: 'person not found' });
        }
        console.log('data deleted');
        res.status(200).json({ messsge: 'person deleted successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });

    }
})

module.exports = router;