// const mongoose=require("mongoose")

// mongoose.connect("mongodb://localhost:27017/user")


// .then(()=>{
//     console.log('mongoose connected');
// })
// .catch((e)=>{
//     console.log('failed');
// })

// const logInSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     }
// })

// const LogInCollection=new mongoose.model('LogInCollection',logInSchema)

// module.exports=LogInCollection





// const { MongoClient } = require("mongodb");  // Use MongoClient to connect to MongoDB
// const url = 'mongodb+srv://suba69475:Gops1014@cluster0.x11xtyi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then((client) => {
//     console.log('MongoDB connected');
//     const db = client.db();  // Get the default database (or specify the database name)

//     const logInCollection = db.collection('LogInCollection');  // Access your collection
//     // Now you can perform operations on the `logInCollection`
//   })
//   .catch((e) => {
//     console.log('Failed to connect to MongoDB', e);
//   });



// const mongoose = require("mongoose");

// const MONGO_URI = "mongodb+srv://suba69475:Gops1014@cluster0.x11xtyi.mongodb.net/storytopia?retryWrites=true&w=majority&appName=Cluster0";

// mongoose.connect(MONGO_URI)
//     .then(() => console.log("Connected to MongoDB Atlas"))
//     .catch((error) => console.error("MongoDB Connection Failed:", error));

// const logInSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     password: { type: String, required: true }
// });

// const LogInCollection = mongoose.model("LogInCollection", logInSchema);

// module.exports = LogInCollection;



const mongoose = require("mongoose");

// MongoDB Atlas connection URI
const MONGO_URI = "mongodb+srv://suba69475:Gops1014@cluster0.x11xtyi.mongodb.net/Storytopia?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB Atlas
mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 30000,  // Increase timeout to 30 seconds
    socketTimeoutMS: 45000,          // Increase socket timeout
})
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error("MongoDB Connection Failed:", error));

// Define Schema for Users Collection
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    //email: { type: String, required: true, unique: true },  // Add email field for better identification
    password: { type: String, required: true }
});

// Create Model for `users` Collection
const User = mongoose.model("User", userSchema, "users");  // Explicitly setting collection name as `users`

module.exports = User;

