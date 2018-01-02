const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const password = '123qwe?'

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err,hash) => {
        console.log(hash);
    })
});


// var data = { id:10 };

// const token = jwt.sign(data, 'worshipsatan');


// console.log(token);

// const decoded = jwt.verify(token, 'killsatan');
// console.log(decoded);





// const {SHA256} = require('crypto-js');


// // var message = "Blood for the Blood God!";
// // var hash = SHA256(message).toString();


// // console.log(message);
// // console.log(hash);


// const data = {
//     id: 4
// }

// const token = {
//     data,
//     hash: SHA256(JSON.stringify(data)+ 'allyoutrustisalie').toString()
// }


// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(data)).toString();
// const resultHash = SHA256(JSON.stringify(token.data)+'allyoutrustisalie').toString();

// if (resultHash === token.hash) console.log('nothing was changed!');
// else console.log('data changed DO NOT TRUST')


// console.log(resultHash, "\n", token);