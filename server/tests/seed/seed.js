const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');

const userOneID = new ObjectID();
const userTwoID = new ObjectID();
const users = [
    {
        _id: userOneID,
        email: 'test1@example.com',
        password: 'password1',
        tokens: [{
            access: 'auth',
            token: jwt.sign({_id:userOneID, access: 'auth'}, 'HarambeWasAnInsideJob').toString()
        }]
    },
    {
        _id: userTwoID,
        email: 'test2@example.com',
        password: 'password2',
        tokens: [{
            access: 'auth',
            token: jwt.sign({_id:userTwoID, access: 'auth'}, 'HarambeWasAnInsideJob').toString()
        }]
    }
]



const todos = [
    {   
        _id: new ObjectID(),
        text: 'First test todo',
        _creator: userOneID 
    },
    {
        _id: new ObjectID(),
        text: 'Second test todo',
        completed: true,
        completedAt: 333,
        _creator: userTwoID  
    }
];

const populateUsers = done => {
    User.remove({}).then(()=>{
        const userOne = new User(users[0]).save();
        const userTwo = new User(users[1]).save();
        return Promise.all([userOne, userTwo]);
    }).then(() => done());
};

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

module.exports = { todos, populateTodos, users, populateUsers };