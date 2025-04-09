// Function to update the reading section
async function updateReadingSection() {
    try {
        const response = await fetch('/data/reading.json');
        const data = await response.json();

        // Update currently reading
        document.querySelector('.book-title').textContent = data.currently_reading.title;
        document.querySelector('.book-author').textContent = `by ${data.currently_reading.author}`;
        document.querySelector('.book-description').textContent = data.currently_reading.description;
    } catch (error) {
        console.error('Error updating reading section:', error);
    }
}

// Update reading section when the page loads
document.addEventListener('DOMContentLoaded', updateReadingSection); 