
document.addEventListener("DOMContentLoaded", function() {

    const addItemButton = document.querySelector(".add-btn");
    addItemButton.addEventListener("click", function() {
        
        window.location.href = "additem.html";
    });
    document.getElementById("searchBtn").addEventListener("click", function() {
        const searchValue = document.getElementById("searchInput").value.toLowerCase();
        const categoryValue = document.getElementById("categorySelect").value.toLowerCase(); 

        document.querySelectorAll(".product-card").forEach(card => {
            const title = card.querySelector("span").textContent.toLowerCase(); 
            const category = card.getAttribute("data-category").toLowerCase();

            
            if ((title.includes(searchValue) || searchValue === "") &&
                (category.includes(categoryValue) || categoryValue === "")) {
                card.style.display = "block"; 
            } else {
                card.style.display = "none"; 
            }
        });
    });

    
    document.getElementById("searchInput").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("searchBtn").click(); 
        }
    });
});