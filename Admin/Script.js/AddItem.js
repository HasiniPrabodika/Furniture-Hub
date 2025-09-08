const form = document.getElementById("furnitureForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); 


  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const image = document.getElementById("image").files[0];

  if (!image) {
    alert("Please select an image!");
    return;
  }

  
  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price);
  formData.append("category", category);
  formData.append("description", description);
  formData.append("image", image);

  try {
    const response = await fetch("http://localhost:5000/api/items", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (response.ok) {
      alert("Item added successfully ✅");
      form.reset();
    } else {
      alert("Error adding item: " + data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Server error. Check console.");
  }
});