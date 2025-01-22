// Initialize stock array from localStorage or empty array
let stock = JSON.parse(localStorage.getItem('stock')) || [];
console.log('Loaded stock from localStorage:', stock);

// Add event listener to the form
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

    // Save stock to localStorage
    localStorage.setItem('stock', JSON.stringify(stock));
    console.log('Data saved to localStorage:', stock);

    // Reset form
    this.reset();
    document.getElementById('name').focus();  // Auto focus on name input after reset

    // Refresh the table
    displayStock();
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
    console.log('Stock displayed in table:', stock);
}

// Function to delete stock
function deleteStock(index) {
    stock.splice(index, 1);

    // Update localStorage
    localStorage.setItem('stock', JSON.stringify(stock));
    console.log('Data saved to localStorage after deletion:', stock);

    displayStock();
}

// Function to edit stock
function editStock(index) {
    const item = stock[index];
    document.getElementById('name').value = item.name;
    document.getElementById('cylinderNumber').value = item.cylinderNumber;

    // Remove the item from stock
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
    console.log('Filtered stock displayed:', filteredStock);
}

// Display stock on page load
displayStock();
