const mongoose=require('mongoose');

// mongoose.connect('mongodb://localhost/ecommerce_app');

mongoose.connect('mongodb+srv://prabhatamit2:prabhatamit2@cluster0.1dwmaoa.mongodb.net/ecomDB?retryWrites=true&w=majority');
                


const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to Mongo db"));

db.once('open',function(){
        console.log("connected to database :: mongo db");
});

module.exports=db;