require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
            res.send(doc);
        }, (e) => {
            res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, e => {
        res.status(400).send(e);
    })
});

app.get('/todos/:id',(req, res) => {
    const id = req.params.id;

    Todo.findById(id).then(todo =>{
        if (!todo) res.status(404).send({e: 'Todo not nound'});
        else res.send({todo})
    }).catch(e => {
        if(!ObjectID.isValid(id)) res.status(404).send({e: 'Todo id is not valid!'});
        else res.status(404).send({});
    });
});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)) return res.status(404).send({e: 'Todo id is not valid!'});
    Todo.findByIdAndRemove(id).then(todo => {
        if (!todo) return res.status(404).send({e: 'Todo not found'});
        res.send({deleted: todo});
    }).catch( e => {
        res.status(404).send({e: 'Some error occured: '+ e});
    });
});

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']);
    if(!ObjectID.isValid(id)) return res.status(404).send({e: 'Todo id is not valid!'});

    if (_.isBoolean(body.completed) && body.completed) body.completedAt = Date.now();
    else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) return res.status(404).send();
        res.send({todo});
    }).catch(e => res.status(400).send());
});

// POST /users
// use _.pick(email, password)

app.post('/users', (req, res) => {
    // const body = _.pick(req.body, ['text', 'completed']);
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);
    user.save().then((user) => {
             res.send(user);
         }, (e) => {
             res.status(400).send(e.errmsg || e);//(e.password.message || e.email.message));
    });
});

app.listen(port, () => console.log(`Started on port ${port}`));


module.exports = {app};