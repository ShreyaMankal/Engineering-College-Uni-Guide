const signupForm = document.getElementById('signupForm');
const messageElement = document.getElementById('message');

signupForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => response.json())
    .then(data => {
        messageElement.textContent = data.message;
    })
    .catch(error => {
        console.error(error);
        messageElement.textContent = "Error signing up";
    });
});
const loginForm = document.getElementById('loginForm');
const messageElement1 = document.getElementById('message');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        messageElement.textContent = data.message;
        if (data.message === 'Login successful') {
            // Successful login
            if (data.userType === 'customer') {
                window.location.href = '/customer'; // Redirect to customer page
            } else if (data.userType === 'admin') {
                window.location.href = '/admin'; // Redirect to admin page
            }
        }
    })
    .catch(error => {
        console.error(error);
        messageElement.textContent = "Error logging in";
    });
});