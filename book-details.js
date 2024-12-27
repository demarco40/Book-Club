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

        const bookDetailsContainer = document.getElementById('bookDetailsContainer');
        bookDetailsContainer.innerHTML = ''; // Clear any existing content

        if (bookMonth) {
            // Display details for the specific book
            const book = books.find(book => book.month.toLowerCase() === bookMonth.toLowerCase());

            if (book) {
                const bookElement = document.createElement('div');
                bookElement.classList.add('book-details');

                bookElement.innerHTML = `
                    <img src="${book.imageUrl}" alt="${book.title}" class="book-image">
                    <h2>${book.title}</h2>
                    <p><strong>Author:</strong> ${book.author}</p>
                    <p><strong>Genre:</strong> ${book.genre}</p>
                    <p><strong>Pages:</strong> ${book.pages}</p>
                    <p><strong>Word Count:</strong> ${book.wordCount}</p>
                    <p><strong>Average Rating:</strong> ${book.averageRating}</p>
                    <button id="backToListButton">Back to List</button>
                `;

                bookDetailsContainer.appendChild(bookElement);

                // Add functionality to the "Back to List" button
                document.getElementById('backToListButton').addEventListener('click', () => {
                    window.location.href = 'book-details.html';
                });
            } else {
                console.error(`Error: No book found for month "${bookMonth}".`);
                bookDetailsContainer.textContent = 'Error: Book details not found.';
            }
        } else {
            // Display all books
            books.forEach(book => {
                const bookElement = document.createElement('div');
                bookElement.classList.add('book');

                bookElement.innerHTML = `
                    <img src="${book.imageUrl}" alt="${book.title}" class="book-image">
                    <h2>${book.title}</h2>
                    <p><strong>Author:</strong> ${book.author}</p>
                    <p><strong>Genre:</strong> ${book.genre}</p>
                    <p><strong>Pages:</strong> ${book.pages}</p>
                `;

                // Add event listener to navigate to specific book details
                bookElement.addEventListener('click', () => {
                    window.location.href = `book-details.html?month=${book.month}`;
                });

                bookDetailsContainer.appendChild(bookElement);
            });
        }
    })
    .catch(error => {
        console.error('Error loading books:', error);
        const bookDetailsContainer = document.getElementById('bookDetailsContainer');
        bookDetailsContainer.textContent = 'Error loading book details.';
    });
