// Fetch the books data from the JSON file
fetch('books.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(books => {
        console.log('Books data loaded:', books); // Debugging: Log the books data

        // Get the book month from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const bookMonth = urlParams.get('month');

        // Find the book details from the books array
        const book = books.find(book => book.month.toLowerCase() === bookMonth.toLowerCase());

        if (book) {
            document.getElementById('bookTitle').textContent = book.title;
            document.getElementById('bookImage').src = book.imageUrl;
            document.getElementById('bookAuthor').textContent = `Author: ${book.author}`;
            document.getElementById('bookGenre').textContent = `Genre: ${book.genre}`;
            document.getElementById('bookPages').textContent = `Pages: ${book.pages}`;
            document.getElementById('bookWordCount').textContent = `Word Count: ${book.wordCount}`;
            document.getElementById('bookRating').textContent = `Average Rating: ${book.averageRating}`;

            // Add a button to return to the previous books list
            const returnButton = document.createElement('button');
            returnButton.textContent = 'Back to List';
            returnButton.id = 'returnButton';
            document.querySelector('.book-details-container').appendChild(returnButton);

            // Event listener for returning to the list
            returnButton.addEventListener('click', () => {
                window.location.href = 'index.html#previousBooksTab'; // Adjust the URL if needed
            });
        } else {
            document.body.textContent = 'Book details not found.';
        }
    })
    .catch(error => {
        console.error('Error loading books:', error);
    });
