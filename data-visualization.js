// Sample data - assuming 'books' variable is already available
const books = [
    // Add your books array here
];

// Function to generate chart data based on selected type
function getChartData(type) {
    return books.map(book => ({
        label: book.title,
        value: book[type] || 0
    }));
}

// Function to create the chart
function createChart(chartData) {
    const ctx = document.getElementById('myChart').getContext('2d');
    if (window.myChart) {
        window.myChart.destroy();
    }
    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartData.map(data => data.label),
            datasets: [{
                label: 'Book Data',
                data: chartData.map(data => data.value),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Event listener for data type selection
document.getElementById('dataType').addEventListener('change', function() {
    const selectedType = this.value;
    const chartData = getChartData(selectedType);
    createChart(chartData);
});

// Initialize chart with default data type
createChart(getChartData('pages'));
