const mongoose = require('mongoose');

// Define the schema for Person
const personSchema = new mongoose.Schema({
    name: { type: String, required: true },  // name is required
    age: Number,  // age is optional
    favoriteFoods: [String]  // array of strings for favorite foods
});

// Create the model
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
