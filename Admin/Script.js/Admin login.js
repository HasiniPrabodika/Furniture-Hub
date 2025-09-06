

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); 

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        
        if (email === "" || password === "") {
            alert("Please fill in both Email and Password.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        
        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        
        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ email, password })
            });

            const result = await response.text();
            alert(result);

            if (result.includes("Login Successful")) {

                window.location.href = "/dashboard.html";
            }

        } catch (error) {
            alert("Error connecting to server!");
            console.error(error);
        }
    });

    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    }
});
