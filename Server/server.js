const mysql = require('mysql2');
const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

// Session configuration
app.use(session({
    secret: 'your_secret_here', // Change this to a secure secret
    resave: false,
    saveUninitialized: true
}));

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, '..', 'client')));

// Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'college_details',
    password: 'Mysql@*#2184'
});


// Serve login/signup template
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'login.html'));
});

// User signup route
// User signup route
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send('Please fill all the fields');
    }

    // Check if user already exists with the provided email
    connection.query('SELECT * FROM signup WHERE email = ?', [email], (error, results) => {
        if (error) {
            console.error('Error checking user existence:', error);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length > 0) {
            // If user already exists, send a custom message to the client
            return res.status(409).send('User already exists. Please login instead.');
        }

        // Insert new user if user doesn't exist
        connection.query('INSERT INTO signup (firstname, email, password) VALUES (?, ?, ?)', [username, email, password], (error, results) => {
            if (error) {
                console.error('Error inserting user:', error);
                return res.status(500).send('Internal Server Error');
            }
            console.log('User signed up successfully');
            res.send('Signup successful'); // Send success message to client
        });
    });
});

// User login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Please enter Email and Password');
    }

    connection.query('SELECT * FROM signup WHERE email = ? AND password = ?', [email, password], (error, results) => {
        if (error) {
            console.error('Error fetching user:', error);
            return res.status(500).send('Internal Server Error');
        }
        if (results.length > 0) {
            req.session.loggedin = true;
            req.session.email = email;
            console.log('User logged in successfully');
            res.send('Login successful'); // Send success message to client
        } else {
            res.status(401).send('Incorrect Email and/or Password');
        }
    });
});

// Serve home page if user is logged in
app.get('/home', (req, res) => {
    if (req.session.loggedin) {
        res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
    } else {
        res.status(401).send('Please login to view this page!');
    }
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


app.post('/submit-advisor', (req, res) => {
    const { name, email, subject, experience, message } = req.body;

    if (!name || !email || !subject || !experience || !message) {
        return res.status(400).send('Please fill all the fields');
    }

    const sql = 'INSERT INTO advisor (name, email, subject, experience, message) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [name, email, subject, experience, message], (err, result) => {
        if (err) {
            console.error('Error inserting advisor:', err);
            res.json({ success: false, message: 'Error: ' + err.message });
        } else {
            console.log('Advisor submitted successfully');
            res.json({ success: true });
        }
    });
});