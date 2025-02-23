// const express = require('express');
// const mongoose = require('mongoose');
// const router = express.Router();

//  // Define the story schema using Mongoose
//  const storySchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     genre: {
//         type: String,
//         required: true
//     },
//     content: {
//         type: String,
//         required: true
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// // // Create a Story model
// const Story = mongoose.model('Story', storySchema);

// // Route to create a new story
// router.post('/', async (req, res) => {
//     try {
//         const { title, genre, content } = req.body;

//         // Create a new story object
//         const newStory = new Story({
//             title,
//             genre,
//             content
//         });

//         // Save the story to the database
//         await newStory.save();
//         res.status(201).json({ message: 'Story created successfully', story: newStory });
//     } catch (err) {
//         res.status(500).json({ message: 'Error creating story', error: err });
//     }
// });

// module.exports = router;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();

const storyRouter = require('../backend/routes/storyroutes')
dotenv.config(); // Load environment variables from .env file


app.use(cors());
app.use(express.json()); // To parse JSON request bodies

app.use('/api',storyRouter)
// MongoDB connection using mongoose.connect
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Successfully connected to MongoDB');
    
    // Start the server only after successful connection to the database
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});
