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
} else {
    document.body.textContent = 'Book details not found.';
}
