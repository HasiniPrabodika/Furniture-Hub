
function resetForm() {
  document.getElementById("furnitureForm").reset();
}


document.getElementById("furnitureForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Furniture item added successfully!");
});
