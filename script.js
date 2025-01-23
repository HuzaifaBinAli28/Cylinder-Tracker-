let stock = [];

// Fetch stock data from the backend server
async function fetchStock() {
    try {
        const response = await fetch('/getStockData');
        const data = await response.json();

        // Parse the data from the sheet and update stock array
        stock = data.map(row => ({
            name: row[0],  // Assuming column A is the 'name'
            cylinderNumber: row[1]  // Assuming column B is the 'cylinder number'
        }));

        // Display stock in the table
        displayStock();
    } catch (error) {
        console.error('Error fetching stock data:', error);
    }
}

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
    stock.splice(index, 1);
    displayStock();
}

// Function to edit stock
function editStock(index) {
    const item = stock[index];
    document.getElementById('name').value = item.name;
    document.getElementById('cylinderNumber').value = item.cylinderNumber;
    deleteStock(index);
}

// Function to search stock
function searchStock() {
    const query = document.getElementById('searchBox').value.toLowerCase();
    const filteredStock = stock.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.cylinderNumber.toLowerCase().includes(query)
    );

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

// Load the stock data when the page loads
fetchStock();
