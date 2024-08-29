// Function to display all previous books
function displayPreviousBooks(books) {
    const previousBooksContainer = document.getElementById('previousBooksContainer');
    previousBooksContainer.innerHTML = ''; // Clear any existing content

    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');

        const bookImage = document.createElement('img');
        bookImage.src = book.imageUrl;
        bookImage.classList.add('book-image');
        bookElement.appendChild(bookImage);

        const bookTitle = document.createElement('h2');
        bookTitle.textContent = book.title;
        bookElement.appendChild(bookTitle);

        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = `by ${book.author}`;
        bookElement.appendChild(bookAuthor);

        // Add event listener to navigate to the book details page
        bookElement.addEventListener('click', () => {
            window.location.href = `book-details.html?month=${book.month}`;
        });

        previousBooksContainer.appendChild(bookElement);
    });
}

// Handle tab switching
document.getElementById('homeTab').addEventListener('click', () => {
    document.getElementById('booksContainer').style.display = 'block';
    document.getElementById('previousBooksContainer').style.display = 'none';
});

document.getElementById('previousBooksTab').addEventListener('click', () => {
    document.getElementById('booksContainer').style.display = 'none';
    document.getElementById('previousBooksContainer').style.display = 'block';
    displayPreviousBooks(books.filter(book => book.month.toLowerCase() !== currentMonth.toLowerCase()));
});

// Initially, display only the current month's book
displayCurrentBook(currentBook);
