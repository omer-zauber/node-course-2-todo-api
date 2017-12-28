const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) return console.log('unable to connect to mongoDB server.');
    console.log("connected to MongoDB server.");

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID("5a43b168200804a96ad04dba")
    // },{
    //     $set : {
    //         completed: true
    //     }
    // },{
    //     returnOriginal: false
    // }).then((result) => console.log(result));

    db.collection('Users').findOneAndUpdate(
        { _id: new ObjectID("5a439ec8f9910d17cc52d22c") },
        {
            $set: { name: 'Omer' },
            $inc: { age: 1 }
        },
        { returnOriginal: false })
        .then((result) => console.log(result));

    // db.close();
    
});
