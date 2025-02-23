const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

 // Define the story schema using Mongoose
 const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// // Create a Story model
const Story = mongoose.model('Story', storySchema);

// Route to create a new story
router.post('/', async (req, res) => {
    try {
        const { title, genre, content } = req.body;

        // Create a new story object
        const newStory = new Story({
            title,
            genre,
            content
        });

        // Save the story to the database
        await newStory.save();
        res.status(201).json({ message: 'Story created successfully', story: newStory });
    } catch (err) {
        res.status(500).json({ message: 'Error creating story', error: err });
    }
});

module.exports = router;




// const express = require('express');
// const { MongoClient } = require('mongodb');  // Import MongoClient
// const router = express.Router();

// // MongoDB connection URL and DB name
// const url = 'mongodb+srv://suba69475:Gops1014@cluster0.x11xtyi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// const dbName = 'Storytopia.stories'; // Replace with your actual database name

// // Route to create a new story
// router.post('/', async (req, res) => {
//     const { title, genre, content } = req.body;

//     try {
//         // Connect to MongoDB
//         const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
//         const db = client.db(dbName);  // Select your database
//         const collection = db.collection('stories');  // Access the 'stories' collection
        
//         // Create a new story object
//         const newStory = {
//             title,
//             genre,
//             content,
//             createdAt: new Date()  // Set current date as createdAt
//         };

//         // Insert the new story into the collection
//         const result = await collection.insertOne(newStory);

//         // Close the connection
//         await client.close();

//         res.status(201).json({ message: 'Story created successfully', story: result.ops[0] });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Error creating story', error: err });
//     }
// });

// module.exports = router;





// const express = require("express");
// const mongoose = require("../src/mongodb"); // Import MongoDB connection
// const router = express.Router();

// // ✅ Define the story schema
// const storySchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     genre: { type: String, required: true },
//     content: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now }
// });

// // ✅ Create Story model (Ensures data is stored in "stories" collection)
// const Story = mongoose.model("Story", storySchema, "stories");

// // ✅ Route to create a new story
// router.post("/", async (req, res) => {
//     console.log("📥 Received Story Submission:", req.body);

//     try {
//         const { title, genre, content } = req.body;

//         // Ensure all fields are provided
//         if (!title || !genre || !content) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         // Create & save the new story
//         const newStory = new Story({ title, genre, content });
//         await newStory.save();

//         console.log("✅ Story Saved to MongoDB:", newStory);
//         res.status(201).json({ message: "Story created successfully", story: newStory });
//     } catch (err) {
//         console.error("❌ Error Creating Story:", err);
//         res.status(500).json({ message: "Error creating story", error: err.message });
//     }
// });

// // ✅ Route to get all stories
// router.get("/", async (req, res) => {
//     try {
//         const stories = await Story.find();
//         res.status(200).json(stories);
//     } catch (err) {
//         console.error("❌ Error Fetching Stories:", err);
//         res.status(500).json({ message: "Error fetching stories", error: err.message });
//     }
// });

// module.exports = router;
