fetch('books.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(books => {
        console.log('Books loaded:', books); // Debugging: Confirm books data is loaded

        // Get the "month" parameter from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const bookMonth = urlParams.get('month');

        console.log('URL "month" parameter:', bookMonth); // Debugging: Confirm URL parameter

        const bookDetailsContainer = document.getElementById('bookDetailsContainer');
        bookDetailsContainer.innerHTML = ''; // Clear any existing content

        if (bookMonth) {
            console.log('Displaying book for month:', bookMonth); // Debugging: Specific book details
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

                document.getElementById('backToListButton').addEventListener('click', () => {
                    window.location.href = 'book-details.html';
                });
            } else {
                console.error(`No book found for month "${bookMonth}".`);
                bookDetailsContainer.textContent = 'Error: Book details not found.';
            }
        } else {
            console.log('No "month" parameter in URL. Displaying all books.'); // Debugging: Display all books
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