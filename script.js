// Global variable to hold stock data from Google Sheets
let stock = [];

// Fetch stock data from Google Sheets JSON
async function fetchStock() {
    try {
        // Replace with your actual Google Sheets URL (as a public JSON endpoint)
        const response = await fetch('https://spreadsheets.google.com/feeds/list/[SPREADSHEET_ID]/od6/public/values?alt=json');
        const data = await response.json();

        // Map the data from Google Sheets to match our stock structure
        stock = data.feed.entry.map(item => ({
            name: item.gsx$name.$t,  // Replace with actual column names
            cylinderNumber: item.gsx$cylindernumber.$t  // Replace with actual column names
        }));

        // Display stock in the table
        displayStock();
    } catch (error) {
        console.error('Error fetching stock data:', error);
    }
}

// Add event listener to the form for adding new stock items
document.getElementById('stockForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const cylinderNumber = document.getElementById('cylinderNumber').value.trim();

    if (!name || !cylinderNumber) {
        alert('Please fill in all fields!');
        return;
    }

    // Add new stock item to the array
    stock.push({ name, cylinderNumber });

    // Call the function to display stock (this will only update the table for now)
    displayStock();

    // Reset form
    this.reset();
    document.getElementById('name').focus();  // Auto focus on name input after reset
});

// Function to display stock in the table
function displayStock() {
    const tableBody = document.getElementById('stockTable').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    stock.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.cylinderNumber}</td>
            <td>
                <button class="edit" onclick="editStock(${index})">Edit</button>
                <button class="delete" onclick="deleteStock(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to delete stock
function deleteStock(index) {
    // Remove item from the stock array
    stock.splice(index, 1);
    
    // Refresh the table after deletion
    displayStock();
}

// Function to edit stock
function editStock(index) {
    const item = stock[index];
    document.getElementById('name').value = item.name;
    document.getElementById('cylinderNumber').value = item.cylinderNumber;

    // Remove the item from stock array after editing (we'll re-add it when submitting the form)
    deleteStock(index);
}

// Function to search stock
function searchStock() {
    const query = document.getElementById('searchBox').value.toLowerCase();

    // Filter stock based on search query
    const filteredStock = stock.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.cylinderNumber.toLowerCase().includes(query)
    );

    // Display filtered stock in the table
    const tableBody = document.getElementById('stockTable').querySelector('tbody');
    tableBody.innerHTML = '';

    filteredStock.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.cylinderNumber}</td>
            <td>
                <button class="edit" onclick="editStock(${index})">Edit</button>
                <button class="delete" onclick="deleteStock(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Display stock on page load by calling fetchStock
fetchStock();
