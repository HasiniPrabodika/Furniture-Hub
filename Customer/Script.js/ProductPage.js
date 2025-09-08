// සියලුම product sections තෝරාගැනීම
const productSections = document.querySelectorAll('.product-section');

// එක් එක් product section එක සඳහා carousel එක සකස් කිරීම
productSections.forEach(section => {
    const productGrid = section.querySelector('.product-grid');
    const prevBtn = section.querySelector('.prev-btn');
    const nextBtn = section.querySelector('.next-btn');

    // carousel එකේ එක් product card එකක පළල තීරණය කිරීම
    // පළමු product card එක තෝරාගෙන එහි පළල ගන්නවා
    const firstProductCard = productGrid.querySelector('.product-card');
    const cardWidth = firstProductCard.clientWidth;

    // Next බොත්තම සඳහා event listener එක
    nextBtn.addEventListener('click', () => {
        // card එකේ පළල අනුව scroll කරන්න
        productGrid.scrollLeft += cardWidth;
    });

    // Prev බොත්තම සඳහා event listener එක
    prevBtn.addEventListener('click', () => {
        // card එකේ පළල අනුව ආපසු scroll කරන්න
        productGrid.scrollLeft -= cardWidth;
    });
});// Pop-up එකේ elements තෝරාගැනීම
const modal = document.getElementById('productModal');
const modalImage = document.getElementById('modal-image');
const modalName = document.getElementById('modal-name');
const modalPrice = document.getElementById('modal-price');
const modalDesc = document.getElementById('modal-desc');
const closeBtn = document.querySelector('.close-btn');

// සියලුම product cards තෝරාගැනීම
const productCards = document.querySelectorAll('.product-card');

// එක් එක් product card එකට click event listener එකක් එකතු කිරීම
productCards.forEach(card => {
    card.addEventListener('click', () => {
        // Click කළ card එකේ data එක ගන්න
        const imageSrc = card.querySelector('img').src;
        const name = card.querySelector('.product-name').textContent;
        const price = card.querySelector('.product-price').textContent;
        const desc = card.querySelector('.product-desc').textContent;

        // Pop-up එකේ content update කිරීම
        modalImage.src = imageSrc;
        modalName.textContent = name;
        modalPrice.textContent = price;
        modalDesc.textContent = desc;

        // Pop-up එක display කිරීම
        modal.style.display = 'block';
    });
});

// Close බොත්තම click කළ විට Pop-up එක වසන්න
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Pop-up එකේ පිටත click කළ විට වසන්න
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});
// ProductPage.js

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const productsContainer = document.getElementById('productsContainer');
    const productTableBody = document.getElementById('productTableBody');
    const mainTable = document.getElementById('mainTable');

    // This function extracts all product data from the HTML
    const getAllProducts = () => {
        const products = [];
        const productSections = document.querySelectorAll('.product-section');

        productSections.forEach(section => {
            const category = section.querySelector('.section-title').textContent.trim();
            const productCards = section.querySelectorAll('.product-card');

            productCards.forEach(card => {
                const name = card.querySelector('.product-name').textContent.trim();
                const price = card.querySelector('.product-price').textContent.trim();
                const description = card.querySelector('.product-desc').textContent.trim();
                
                products.push({
                    name: name,
                    category: category,
                    price: price,
                    description: description
                });
            });
        });
        return products;
    };

    const allProducts = getAllProducts();

    // Function to display products in the table
    const displayProductsInTable = (productsToDisplay) => {
        productTableBody.innerHTML = ''; // Clear any existing data in the table

        if (productsToDisplay.length === 0) {
            productTableBody.innerHTML = `
                <tr>
                    <td colspan="4">No products found for this category.</td>
                </tr>
            `;
            // Show the table with the "no results" message
            mainTable.style.display = 'table';
            productsContainer.style.display = 'none';
            return;
        }

        productsToDisplay.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.price}</td>
                <td>${product.description}</td>
            `;
            productTableBody.appendChild(row);
        });

        // Show the table and hide the original product sections
        mainTable.style.display = 'table';
        productsContainer.style.display = 'none';
    };

    // Event listener for the search button
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const filteredProducts = allProducts.filter(product =>
            product.category.toLowerCase().includes(searchTerm)
        );
        displayProductsInTable(filteredProducts);
    });

    // Optional: Also perform search on Enter key press
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const filteredProducts = allProducts.filter(product =>
                product.category.toLowerCase().includes(searchTerm)
            );
            displayProductsInTable(filteredProducts);
        }
    });

    // To prevent the table from showing on initial page load, uncomment the line below.
    // mainTable.style.display = 'none';
});