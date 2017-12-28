const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) return console.log('unable to connect to mongoDB server.');
    console.log("connected to MongoDB server.");

    db.collection('Users').deleteMany({ name: 'Omer' }).then((result) => {
        console.log('Deleted by Name: ',result.deletedCount);
    });

    db.collection('Users').findOneAndDelete({ _id: new ObjectID('5a439be222ff0a05f08a0b51') }).then((result) => {
        console.log('Deleted by ID: ',result.value!=null? 'Deleted 1 doc.' : 'Failed.');
    });

    // deleteMany
    // db.collection('Todos').deleteMany({ text: 'Eat lunch' }).then((result) => {
    //     console.log(result);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({ text: 'Eat lunch' }).then((result) => {
    //     console.log(result);
    // });

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({ completed: false }).then((result)=> {
    //     console.log(result);
    // });


    // db.close();
    
});
