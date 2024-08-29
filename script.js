document.addEventListener("DOMContentLoaded", function() {
    function showSectionBasedOnHash(books, currentMonth) {
        const booksContainer = document.getElementById('booksContainer');
        const previousBooksContainer = document.getElementById('previousBooksContainer');

        const hash = window.location.hash;

        if (hash === '#previousBooksTab') {
            booksContainer.style.display = 'none';
            previousBooksContainer.style.display = 'block';
            displayPreviousBooks(books.filter(book => book.month.toLowerCase() !== currentMonth.toLowerCase()));
        } else {
            booksContainer.style.display = 'block';
            previousBooksContainer.style.display = 'none';
            displayCurrentBook(books.find(book => book.month.toLowerCase() === currentMonth.toLowerCase()));
        }
    }

    fetch('books.json')
        .then(response => response.json())
        .then(books => {
            const currentMonth = new Date().toLocaleString('default', { month: 'long' });

            // Initial load
            showSectionBasedOnHash(books, currentMonth);

            // Listen for hash changes
            window.addEventListener('hashchange', () => {
                showSectionBasedOnHash(books, currentMonth);
            });

            function displayCurrentBook(book) {
                const booksContainer = document.getElementById('booksContainer');
                booksContainer.innerHTML = ''; // Clear any existing content

                if (book) {
                    const bookElement = document.createElement('div');
                    bookElement.classList.add('book', 'book-container');

                    const bookImage = document.createElement('img');
                    bookImage.src = book.imageUrl;
                    bookImage.classList.add('book-image');
                    bookElement.appendChild(bookImage);

                    const bookTitle = document.createElement('h2');
                    bookTitle.textContent = book.title;
                    bookElement.appendChild(bookTitle);

                    booksContainer.appendChild(bookElement);

                    let showingData = false;
                    bookElement.addEventListener('click', () => {
                        if (showingData) {
                            booksContainer.innerHTML = '';
                            booksContainer.appendChild(bookElement);
                            showingData = false;
                        } else {
                            const bookInfo = document.createElement('div');
                            bookInfo.classList.add('book-info');
                            bookInfo.innerHTML = `
                                <p><strong>Title:</strong> ${book.title}</p>
                                <p><strong>Author:</strong> ${book.author}</p>
                                <p><strong>Genre:</strong> ${book.genre}</p>
                                <p><strong>Pages:</strong> ${book.pages}</p>
                                <p><strong>Word Count:</strong> ${book.wordCount}</p>
                                <p><strong>Average Rating:</strong> ${book.averageRating}</p>
                                <button id="showCoverButton">Show Cover</button>
                            `;
                            booksContainer.innerHTML = ''; // Clear the container
                            booksContainer.appendChild(bookInfo);
                            showingData = true;

                            document.getElementById('showCoverButton').addEventListener('click', () => {
                                booksContainer.innerHTML = '';
                                booksContainer.appendChild(bookElement);
                                showingData = false;
                            });
                        }
                    });
                } else {
                    booksContainer.textContent = 'No book selected for this month.';
                }
            }

            function displayPreviousBooks(books) {
                const previousBooksContainer = document.getElementById('previousBooksContainer');
                previousBooksContainer.innerHTML = ''; 

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

                    bookElement.addEventListener('click', () => {
                        window.location.href = `book-details.html?month=${book.month}`;
                    });

                    previousBooksContainer.appendChild(bookElement);
                });
            }
        })
        .catch(error => {
            console.error('Error loading books:', error);
        });
});
