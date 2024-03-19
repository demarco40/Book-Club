// Fetch the books data from the JSON file
fetch('books.json')
    .then(response => response.json())
    .then(data => {
        const booksContainer = document.getElementById('booksContainer');
        data.forEach(book => {
            // Create book element
            const bookElement = document.createElement('div');
            bookElement.classList.add('book');
            bookElement.innerHTML = `
                <img src="${book.imageUrl}" alt="${book.title}" class="book-image">
                <div class="book-details">
                    <h2>${book.title}</h2>
                    <p>Author: ${book.month}</p>
					<p>Author: ${book.selector}</p>
					<p>Author: ${book.author}</p>
                    <p>Genre: ${book.genre}</p>
                    <p>Pages: ${book.pages}</p>
                    <p>Word Count: ${book.wordCount}</p>
                    <p>Average Rating: ${book.averageRating}</p>
                </div>
            `;
            // Append the book element to the container
            booksContainer.appendChild(bookElement);
        });
    })
    .catch(error => console.error('Error loading book data:', error));
