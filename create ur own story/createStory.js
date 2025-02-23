document.getElementById('storyForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    const storyData = {
        title: document.getElementById('title').value,
        genre: document.getElementById('genre').value,
        content: document.getElementById('content').value
    };

    try {
        const response = await fetch('http://localhost:5000/api/stories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(storyData)
        });
        const result = await response.json();
        if (response.ok) {
            alert('Story saved successfully!');
        } else {
            alert('Failed to save story: ' + result.message);
        }
    } catch (error) {
        console.error('Error saving story:', error);
    }
});
