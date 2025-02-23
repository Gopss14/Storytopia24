
const express = require('express'); // Import express
const router = express.Router();    // Initialize the router
const Story = require('../models/storyModel'); // Import your Story model

// Route to create a new story
router.post('/post', async (req, res) => {
    try {
        const { title, genre, content, createdBy } = req.body; // Destructure all necessary fields

        // Create a new story object
        const newStory = await Story.create({
            title,
            genre,
            content,
            createdBy
        });

        // Save the story to the database

        res.status(201).json({ message: 'Story created successfully', story: newStory });
    } catch (err) {
        console.error("Error creating story:", err); // Log the error for debugging
        res.status(500).json({ message: 'Error creating story', error: err });
    }
});

// Route to fetch all stories
router.get('/get', async (req, res) => {
    try {
        // Find all stories in the database
        const stories = await Story.find();
        res.status(200).json(stories);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching stories', error: err });
    }
});

module.exports = router; // Export the router so it can be used in other parts of the app
