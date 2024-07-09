const express = require('express');
require('dotenv').config();

const router = express.Router();
const person = require('./../models/user');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

router.post('/signup', async function (req, res) {
    try {
        const data = req.body;

        const newPerson = new person(data);

        const response = await newPerson.save();
        console.log('data save');


        const Token = generateToken(response.name);
        console.log('Token is :',Token);
        res.status(200).json({response,Token});

    }
    catch (err) {
        console.log(err);
        res.status(500).json('error');
    }

})

router.post('/login',async (req,res) => {
    try{
        const {username, password}  = req.body;

        const user = await person.findOne({username:username});

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: "Inavalid username"});
        }

        const payload = {
            id: user.id,
            username: user.username
        }

        const token = generateToken(payload);

        res.json({token});
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.get('/', jwtAuthMiddleware,async function (req, res) {
    try {
        const response = await person.find();
        console.log('data fetched successfully');
        res.status(200).json(response);

    }
    catch (err) {
        console.log(err);
        res.status(500).json('error');
    }

})

// router.get('/:worktype', async function (req, res) {
//     try {
//         const worktype = req.params.worktype;
//         if (worktype == 'Chef' || worktype == 'manager' || worktype == 'waiter') {
//             const response = await person.find({ work: worktype });
//             console.log('response fetch');
//             res.status(200).json(response);
//         }
//         else {
//             res.status(404).json({ error: 'Invalid work type' });
//         }
//     }
//     catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal error' });
//     }
// })
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
router.get('/profile', jwtAuthMiddleware, async (req,res) => {
    try {
        const userData = req.user;
        console.log("User Data",userData);

        const userId = userData.id;
        const user = await person.findById(userId);

        res.status(200).json({user,userId});
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
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