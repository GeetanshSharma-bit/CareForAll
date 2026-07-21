document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            // Basic Client-Side Validation
            if (!email.includes("@") || password.length < 6) {
                e.preventDefault(); // Stops the form from submitting
                alert("Please enter a valid email and a password with at least 6 characters.");
            }
        });
    }
});