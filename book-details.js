// Fetch the books data from the JSON file
fetch('books.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(books => {
        // Get the book month from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const bookMonth = urlParams.get('month');

        if (!bookMonth) {
            console.error('Error: "month" parameter is missing in the URL.');
            document.body.textContent = 'Error: No book information available. Please select a book.';
            return;
        }

        // Find the book details from the books array
        const book = books.find(book => book.month.toLowerCase() === bookMonth.toLowerCase());

        if (book) {
            // Populate the book details
            document.getElementById('bookTitle').textContent = book.title;
            document.getElementById('bookImage').src = book.imageUrl;
            document.getElementById('bookAuthor').textContent = `Author: ${book.author}`;
            document.getElementById('bookGenre').textContent = `Genre: ${book.genre}`;
            document.getElementById('bookPages').textContent = `Pages: ${book.pages}`;
            document.getElementById('bookWordCount').textContent = `Word Count: ${book.wordCount}`;
            document.getElementById('bookRating').textContent = `Average Rating: ${book.averageRating}`;
        } else {
            console.error(`Error: No book found for month "${bookMonth}".`);
            document.body.textContent = 'Error: Book details not found.';
        }
    })
    .catch(error => {
        console.error('Error loading books:', error);
        document.body.textContent = 'Error loading book details.';
    });
