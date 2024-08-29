// Fetch the books data from the JSON file
fetch('books.json')
    .then(response => response.json())
    .then(books => {
        console.log('Books data loaded:', books); // Debugging: Log the books data

        // Aggregate data for visualizations
        const pageCounts = books.map(book => book.pages);
        const wordCounts = books.map(book => book.wordCount);
        const averageRatings = books.map(book => book.averageRating);

        // Create a chart
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: books.map(book => book.title),
                datasets: [
                    {
                        label: 'Pages',
                        data: pageCounts,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Word Count',
                        data: wordCounts,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Average Rating',
                        data: averageRatings,
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Error loading books:', error);
    });
