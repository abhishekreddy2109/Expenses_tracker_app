document.getElementById('register-form').addEventListener('submit', async function (event) {
    event.preventDefault();  // Prevent the default form submission

    // Get the values from the input fields
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
            }),
        });

        const data = await response.json();
        console.log(data); // Log the response data for debugging

        if (response.ok) {
            alert('Registration successful!');
            // Redirect to login page or perform other actions
            window.location.href = 'login.html'; // Uncomment to redirect to login after registration
        } else {
            console.error('Registration failed:', data);
            alert(`Registration failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Error during fetch:', error);
        alert('An error occurred during registration.');
    }
});
