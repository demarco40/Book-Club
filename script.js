document.addEventListener("DOMContentLoaded", function() {
    fetch('books.json')
        .then(response => response.json())
        .then(books => {
            const booksContainer = document.getElementById('booksContainer');
            const previousBooksContainer = document.getElementById('previousBooksContainer');

            const currentMonth = new Date().toLocaleString('default', { month: 'long' });
            const currentBook = books.find(book => book.month.toLowerCase() === currentMonth.toLowerCase());

            function displayCurrentBook(book) {
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

            document.getElementById('homeTab').addEventListener('click', () => {
                document.getElementById('booksContainer').style.display = 'block';
                document.getElementById('previousBooksContainer').style.display = 'none';
            });

            document.getElementById('previousBooksTab').addEventListener('click', () => {
                document.getElementById('booksContainer').style.display = 'none';
                document.getElementById('previousBooksContainer').style.display = 'block';
                displayPreviousBooks(books.filter(book => book.month.toLowerCase() !== currentMonth.toLowerCase()));
            });

            displayCurrentBook(currentBook);
        })
        .catch(error => {
            console.error('Error loading books:', error);
        });
});
