const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) return console.log('unable to connect to mongoDB server.');
    console.log("connected to MongoDB server.");

    // db.collection('Todos').find({
    //         _id: new ObjectID("5a4398417beeb212a0c51b47")
    //     }).toArray().then((docs) => {
    //     console.log('Todos:\n', JSON.stringify(docs, undefined, 3));
    // },(err) => {
    //     console.log('Unable to fetch todos.', err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos Count: ${count}`);
    // },(err) => {
    //     console.log('Unable to fetch todos.', err);
    // });

    db.collection('Users').find({name: 'Omer'}).count().then((count) => {
        console.log(`Users Count: ${count}`);
    },(err) => {
        console.log('Unable to fetch todos.', err);
    });

    //db.close();
    
});
