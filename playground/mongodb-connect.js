// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) return console.log('unable to connect to mongoDB server.');
    console.log("connected to MongoDB server.");

    // db.collection('Todos').insertOne({
    //     text: 'Somthing to do',
    //     completed: false
    // }, (err, result)=> {
    //     if (err) return console.log('Unable to insert todo.', err);
    //     console.log(JSON.stringify(result.ops,undefined,3));
    // });

    
    // Insert new doc into Users (name, age, location)

    // db.collection('Users').insertOne(
    //     {
    //         name: 'Omer',
    //         age: 32,
    //         Location: 'Israel'
    //     }, (err, result) => {
    //         if (err) return console.log('Unable to insert user', err);
    //         console.log(JSON.stringify(result.ops, undefined, 3));
    //         console.log(result.ops[0]._id.getTimestamp());
    //     });

    db.close();
    
});
