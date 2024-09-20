const express = require('express');
const router = express.Router();
const Person = require('../Model/Person'); // Import the model

// POST route to create a new person
router.post('/add', async (req, res) => {
    // Extract person data from the request body
    try {
        const { name, age, favoriteFoods } = req.body;

        // Create a new instance of the Person model
        const newPerson = new Person({
            name,
            age,
            favoriteFoods
        });
        await newPerson.save();
        res.status(200).send({ msg: "contact added successfully", newPerson });
    } catch (error) {
        res.status(400).send({ msg: "can not add this contact", error });
    }
});


// POST route to create multiple people
router.post('/addMany', async (req, res) => {
    try {
        // Extract the array of people data from the request body
        const arrayOfPeople = req.body;
        // Use Model.create() to save multiple people at once
        await Person.create(arrayOfPeople);

        res.status(200).send({ msg: "contacts added successfully" });
    }
    catch (error) {
        res.status(400).send({ msg: "can not add this contacts", error });
    }
});

// GET route to find all people by a given name
router.get('/findByName/:name', async (req, res) => {
    try {
        const personName = req.params.name; // Extract the name from the request URL
        const persons = await Person.find({ name: personName });

        if (!persons.length) {
            res.status(404).send({ message: 'No people found with the given name' });
        } else {
            res.status(200).send({ msg: `People found with name ${personName}`, persons });
        }


    } catch (error) {
        res.status(400).send({ msg: "Error finding people", error });
    }

});

// GET route to find one person by favorite food
router.get('/findByFood/:food', async (req, res) => {
    try {
        const favoriteFood = req.params.food; // Extract the food from the request URL
        const persons = await Person.findOne({ favoriteFoods: favoriteFood });

        if (!persons) {
            res.status(404).send({ message: 'No people found with the given food' });
        } else {
            res.status(200).send({ msg: `People found with food ${favoriteFood}`, persons });
        }


    } catch (error) {
        res.status(400).send({ msg: "Error finding people", error });
    }

});



// GET route to find one person by favorite food
router.get('/findById/:_id', async (req, res) => {
    try {
        const _id = req.params._id; // Extract the food from the request URL
        const persons = await Person.findById(_id);
        if (!persons) {
            res.status(404).send({ message: 'No person found with the given id' });
        } else {
            res.status(200).send({ msg: `Person found `, persons });
        }


    } catch (error) {
        res.status(400).send({ msg: "Error finding people", error });
    }

});


// PUT route to find a person by id and update their favoriteFoods
router.put('/addFavoriteFood/:_id', async (req, res) => {
    const _id = req.params._id; // Extract the food from the request URL
    const persons = await Person.findById(_id);
    try {
        if (!persons) {
            return res.status(404).json({ message: 'No person found with the given id' });
        } else {
            // Add "hamburger" to the favoriteFoods array
            persons.favoriteFoods.push('hamburger');
            // Mark favoriteFoods as modified if favoriteFoods is a Mixed type
            persons.markModified('favoriteFoods');
            await persons.save();
            return res.status(200).json({ message: 'Person updated successfully', persons });
        }
    } catch (error) {
        res.status(400).send({ msg: "Error finding people", error });
    }

});
// PUT route to find a person by name and update their age to 20
router.put('/updateAge/:name', async (req, res) => {

    try {
        const personName = req.params.name; // Extract the name from the request URL
        const persons = await Person.findOneAndUpdate(
            { name: personName },        // Search condition: person with the given name
            { age: 20 }, {
            new: true
        }                 // Update: set age to 20           
        );
        if (!persons) {
            res.status(404).send({ message: 'No people found with the given name' });
        } else {
            res.status(200).send({ msg: `${personName} updated age to 20 successfully`, persons });
        }


    } catch (error) {
        res.status(400).send({ msg: `Error updating ${personName} `, error });
    }




});




// DELETE route to remove a person by their _id
router.delete('/delete/:_id', async (req, res) => {
    const personId = req.params._id; // Extract the id from the request URL
    try {
        // Use Model.findByIdAndDelete to delete the person by their _id
        const result = await Person.findByIdAndDelete(personId);

        console.log(result);
        if (!result) {
            res.status(404).send({ message: 'No people found with the given id' });
        } else {
            res.status(200).json({ message: 'Person deleted successfully', result });
        }
    } catch (error) {
        res.status(400).send({ msg: `Error deleting Person  `, error });
    }
});


// DELETE route to remove all people by name 
router.delete('/deleteMany/:name', async (req, res) => {
    const personname = req.params.name; // Extract the id from the request URL
    try {
        // Use Model.findByIdAndDelete to remove all people by name
        const result = await Person.deleteMany({ name: personname });
        if (result.deletedCount === 0) {
            res.status(404).send({ message: 'No people found with the given id' });
        } else {
            res.status(200).json({ message: `${result.deletedCount} people have been deleted  ` });
        }
    } catch (error) {
        res.status(400).send({ msg: `Error deleting Person  `, error });
    }
});



// GET route to find people who like burritos, sort by name, limit to 2, and exclude age
router.get('/burritoLovers', async (req, res) => {
    try {
        const persons = await Person.find({ favoriteFoods: 'burritos' })  // Find people who like burritos
            .sort({ name: 1 })                        // Sort the results by name (ascending)
            .limit(10)                                 // Limit the results to 2 documents
            .select('-age')                           // Exclude the age field
        if (!persons.length) {
            res.status(404).send({ message: 'No people found who like burritos' });
        } else {
            res.status(200).send({ msg: `People found who like burritos`, persons });
        }


    } catch (error) {
        res.status(400).send({ msg: "Error finding people", error });
    }

});



module.exports = router;
