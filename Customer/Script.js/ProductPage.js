

const productSections = document.querySelectorAll('.product-section');


productSections.forEach(section => {
    const productGrid = section.querySelector('.product-grid');
    const prevBtn = section.querySelector('.prev-btn');
    const nextBtn = section.querySelector('.next-btn');

    
    const firstProductCard = productGrid.querySelector('.product-card');
    const cardWidth = firstProductCard.clientWidth;

    
    nextBtn.addEventListener('click', () => {
        
        productGrid.scrollLeft += cardWidth;
    });

    
    prevBtn.addEventListener('click', () => {
        
        productGrid.scrollLeft -= cardWidth;
    });
});
const modal = document.getElementById('productModal');
const modalImage = document.getElementById('modal-image');
const modalName = document.getElementById('modal-name');
const modalPrice = document.getElementById('modal-price');
const modalDesc = document.getElementById('modal-desc');
const closeBtn = document.querySelector('.close-btn');


const productCards = document.querySelectorAll('.product-card');


productCards.forEach(card => {
    card.addEventListener('click', () => {
        
        const imageSrc = card.querySelector('img').src;
        const name = card.querySelector('.product-name').textContent;
        const price = card.querySelector('.product-price').textContent;
        const desc = card.querySelector('.product-desc').textContent;

        
        modalImage.src = imageSrc;
        modalName.textContent = name;
        modalPrice.textContent = price;
        modalDesc.textContent = desc;

       
        modal.style.display = 'block';
    });
});


closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});


window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const productsContainer = document.getElementById('productsContainer');
    const productTableBody = document.getElementById('productTableBody');
    const mainTable = document.getElementById('mainTable');

    
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

  
    const displayProductsInTable = (productsToDisplay) => {
        productTableBody.innerHTML = ''; 
        if (productsToDisplay.length === 0) {
            productTableBody.innerHTML = `
                <tr>
                    <td colspan="4">No products found for this category.</td>
                </tr>
            `;
           
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

       
        mainTable.style.display = 'table';
        productsContainer.style.display = 'none';
    };

    
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const filteredProducts = allProducts.filter(product =>
            product.category.toLowerCase().includes(searchTerm)
        );
        displayProductsInTable(filteredProducts);
    });

    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const filteredProducts = allProducts.filter(product =>
                product.category.toLowerCase().includes(searchTerm)
            );
            displayProductsInTable(filteredProducts);
        }
    });

    
});