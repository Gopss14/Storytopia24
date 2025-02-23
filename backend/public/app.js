document.getElementById('storyForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    // Get form values
    const title = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;
    const content = document.getElementById('content').value;
    const createdBy = document.getElementById('createdBy').value;

    // Create story object
    const storyData = {
        title,
        genre,
        content,
        createdBy
    };

    try {
        // Send POST request to the backend
        const response = await fetch('http://localhost:5000/api/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(storyData)
        });

        // Check for success
        const result = await response.json();
        if (response.ok) {
            alert('Story submitted successfully!');
            // Clear the form after submission
            document.getElementById('storyForm').reset();
        } else {
            alert('Error submitting story: ' + result.message);
        }
    } catch (error) {
        console.error('Error submitting story:', error);
        alert('An error occurred while submitting your story.');
    }
});
