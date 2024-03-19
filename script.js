// Fetch the books data from the JSON file
fetch('books.JSON')
    .then(response => response.json())
    .then(data => {
        const booksContainer = document.getElementById('booksContainer');
        // Clear previous content
        booksContainer.innerHTML = '';
        // Iterate over each book in the data array
        data.forEach(book => {
            // Create the outer book card div
            const bookCard = document.createElement('div');
            bookCard.classList.add('book');

            // Set the innerHTML of the book card with book details
            bookCard.innerHTML = `
				<div class="book-month">${book.month}</div>
                <img src="${book.imageUrl}" alt="${book.title}" class="book-image">
                <div class="book-details">
                    <h2>${book.title}</h2>
					<p>Month: ${book.month}</p>
					<p>Selector: ${book.selector}</p>
                    <p>Author: ${book.author}</p>
                    <p>Genre: ${book.genre}</p>
                    <p>Pages: ${book.pages}</p>
                    <p>Word Count: ${book.wordCount}</p>
                    <p>Average Rating: ${book.averageRating}</p>
                </div>
            `;

            // Append the book card to the container
            booksContainer.appendChild(bookCard);
        });
    })
    .catch(error => {
        console.error('Error loading book data:', error);
        // Handle errors, such as by displaying a message to the user
    });