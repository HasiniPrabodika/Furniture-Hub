document.getElementById("reviewForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  await fetch("http://localhost:5000/api/reviews", {
    method: "POST",
    body: formData
  });

  alert("Review submitted!");
  e.target.reset();
  window.location.href = "Review.html"; 
});

window.location.href = 'Review.html';
window.location.href = 'HomePage.html';
window.location.href = 'ProductPage.html';
window.location.href = 'ContactPage.html';
window.location.href = 'About.html';


