document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();  // Prevent the default form submission

    // Get the values from the input fields
    const email = document.getElementById('email').value; // Changed to 'email'
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email, // Use 'email' here
                password: password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            alert('Login successful!');
        } else {
            console.error('Login failed:', data);
            alert(`Login failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Error during fetch:', error);
        alert('An error occurred during login.');
    }
});
