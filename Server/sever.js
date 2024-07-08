const express = require('express');
const mysql = require('mysql2');
const async = require('async');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'college_details',
    password: 'Mysql@*#2184'
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());

const defaultPort = 8000;

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

app.post('/addReview', (req, res) => {
    const { collegeId, username, reviewText } = req.body;
    const addReviewQuery = 'INSERT INTO reviews (collegeId, username, review_text) VALUES (?, ?, ?)';
    db.query(addReviewQuery, [collegeId, username, reviewText], (err, result) => {
        if (err) {
            console.error('Error adding review to the database:', err); // Log the error message
            res.status(500).send('Error adding review: ' + err.message); // Send detailed error message to client
        } else {
            res.redirect(`/college/${collegeId}`);
        }
    });
});



app.get('/college/:id', (req, res) => {
    const collegeId = req.params.id;

    const collegeQuery = `
        SELECT 
            c.CollegeName,
            c.CollegeOverview,
            c.CollegeLocation,
            c.CollegeWebsite,
            c.CollegeHelpline,
            c.CollegeCode,
            cc.CourseName,
            c.CollegeImage,
            r.review_id,
            r.username,
            r.review_text
        FROM 
            college c
        LEFT JOIN 
            College_courses cc ON c.CollegeId = cc.CollegeId
        LEFT JOIN
            reviews r ON c.CollegeId = r.collegeId
        WHERE 
            c.CollegeId = ?
    `;

    async.parallel([
        function(callback) {
            db.query(collegeQuery, [collegeId], (err, results) => {
                if (err) {
                    console.error('Error executing college query:', err);
                    return callback(err);
                }
                callback(null, results);
            });
        },
        
    ], function(err, results) {
        if (err) {
            console.error('Error executing queries:', err);
            return res.status(500).send(err);
        }

        const collegeData = results[0][0];

        if (!collegeData) {
            console.error('No results found for the given CollegeId.');
            return res.status(404).send('College not found');
        }

        const courses = results[0].map(result => result.CourseName).filter(courseName => courseName);
        const reviews = [];
         results[0].forEach(result => {
         if (result.review_id) {
        // Check if the review is already in the array
        const existingReview = reviews.find(review => review.username === result.username && review.review_text === result.review_text);
        // If not, add it to the array
        if (!existingReview) {
            reviews.push({
                username: result.username,
                review_text: result.review_text
            });
        }
    }
});


        res.render('college', { 
            collegeId: collegeId,
            collegeName: collegeData.CollegeName,
            collegeOverview: collegeData.CollegeOverview,
            collegeLocation: collegeData.CollegeLocation,
            collegeWebsite: collegeData.CollegeWebsite,
            admissionHelpline: collegeData.CollegeHelpline,
            collegeCode: collegeData.CollegeCode,
            collegeImage:collegeData.CollegeImage,
            courses,
            reviews:reviews,
            
        });
        console.log(" college Image ",collegeData.CollegeImage);
    });
});

const server = app.listen(defaultPort, () => {
    console.log(`Server running on http://localhost:${defaultPort}`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${defaultPort} is already in use.`);
        const newPort = defaultPort + 1;
        console.log(`Trying port ${newPort}...`);
        server.listen(newPort);
    } else {
        console.error('Server error:', err);
    }
});