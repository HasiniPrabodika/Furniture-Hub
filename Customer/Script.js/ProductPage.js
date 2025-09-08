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