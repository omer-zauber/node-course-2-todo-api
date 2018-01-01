const { ObjectID } = require('mongodb');

const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require ('./../server/models/todo');
const { User } = require('./../server/models/user');

// const id = "5a49ed64b7d5b0e017c2b13b";

// if (!ObjectID.isValid(id)) console.log('ID not valid!')

// Todo.find({
//     _id: id
// }).then((todos) => { console.log('Todos: ', todos); });

// Todo.findOne({
//     _id: id
// }).then((todo) => { console.log('Todo: ', todo); });

// Todo.findById(id).then((todo) => { 
//     if (!todo) return console.log('ID not found.');
//     console.log('Todo by ID: ', todo); 
// }).catch (e => console.log(e));


const id = "5a44c8715d698d180f3dc0b8";

if(!ObjectID.isValid(id)) console.log('User id not valid!');

User.findById(id).then(user => {
    if (!user) return console.log('User not found.');
    console.log('user: ', JSON.stringify(user, undefined ,3));
}).catch(e => console.log(e));

