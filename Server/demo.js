// // const express = require('express');
// // const mysql = require('mysql2');
// // const async = require('async');
// // const path = require('path');
// // const app = express();
// // const cors = require('cors');
// // const bodyParser = require('body-parser');

// // const db = mysql.createPool({
// //     host: 'localhost',
// //     user: 'root',
// //     database: 'college1',
// //     password: 'Mysql@*#2184'
// // });

// // app.set('view engine', 'ejs');
// // app.set('views', path.join(__dirname, 'views'));
// // app.use(express.static(path.join(__dirname, 'public')));
// // app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(cors());

// // const defaultPort = 8000;

// // app.post('/addReview', (req, res) => {
// //     const { collegeId, username, reviewText } = req.body;
// //     const addReviewQuery = 'INSERT INTO reviews (collegeId, username, review_text) VALUES (?, ?, ?)';
// //     db.query(addReviewQuery, [collegeId, username, reviewText], (err, result) => {
// //         if (err) {
// //             console.error('Error adding review to the database:', err);
// //             return res.status(500).json({ error: 'Error adding review' });
// //         }
// //         res.redirect(`/college/${collegeId}`);
// //     });
// // });

// // app.get('/college/:id', (req, res) => {
// //     const collegeId = req.params.id;
// //     console.log(`Received request for college ID: ${collegeId}`);

// //     const collegeQuery = `
// //         SELECT 
// //             c.CollegeName,
// //             c.CollegeOverview,
// //             c.CollegeLocation,
// //             c.CollegeWebsite,
// //             c.CollegeHelpline,
// //             c.CollegeCode,
// //             cc.CourseName,
// //             c.CollegeImage,
// //             r.review_id,
// //             r.username,
// //             r.review_text
// //         FROM 
// //             college c
// //         LEFT JOIN 
// //             College_courses cc ON c.CollegeId = cc.CollegeId
// //         LEFT JOIN
// //             reviews r ON c.CollegeId = r.collegeId
// //         WHERE 
// //             c.CollegeId = ?
// //     `;

// //     const updateCountQuery = `
// //         UPDATE college
// //         SET count = count + 1
// //         WHERE CollegeId = ?
// //     `;

// //     async.parallel([
// //         function(callback) {
// //             db.query(collegeQuery, [collegeId], (err, results) => {
// //                 if (err) {
// //                     console.error('Error executing college query:', err);
// //                     return callback(err);
// //                 }
// //                 console.log('College query results:', results);
// //                 callback(null, results);
// //             });
// //         },
// //         function(callback) {
// //             db.query(updateCountQuery, [collegeId], (err, results) => {
// //                 if (err) {
// //                     console.error('Error executing update count query:', err);
// //                     return callback(err);
// //                 }
// //                 console.log('Update count query results:', results);
// //                 callback(null, results);
// //             });
// //         }
// //     ], function(err, results) {
// //         if (err) {
// //             console.error('Error executing queries:', err);
// //             return res.status(500).json({ error: 'Error executing queries' });
// //         }

// //         console.log('Results from async.parallel:', results);

// //         const collegeData = results[0][0][0];
// //         console.log('College data:', collegeData);

// //         if (!collegeData) {
// //             console.error('No results found for the given CollegeId.');
// //             return res.status(404).json({ error: 'College not found' });
// //         }

// //         const courses = results[0][0].map(result => result.CourseName).filter(courseName => courseName);
// //         const reviews = [];
// //         results[0][0].forEach(result => {
// //             if (result.review_id) {
// //                 const existingReview = reviews.find(review => review.username === result.username && review.review_text === result.review_text);
// //                 if (!existingReview) {
// //                     reviews.push({
// //                         username: result.username,
// //                         review_text: result.review_text
// //                     });
// //                 }
// //             }
// //         });

// //         res.render('college', {
// //             collegeId: collegeId,
// //             collegeName: collegeData.CollegeName,
// //             collegeOverview: collegeData.CollegeOverview,
// //             collegeLocation: collegeData.CollegeLocation,
// //             collegeWebsite: collegeData.CollegeWebsite,
// //             admissionHelpline: collegeData.CollegeHelpline,
// //             collegeCode: collegeData.CollegeCode,
// //             collegeImage: collegeData.CollegeImage,
// //             courses,
// //             reviews,
// //         });
// //         console.log("College Image", collegeData.CollegeImage);
// //     });
// // });

// // const server = app.listen(defaultPort, () => {
// //     console.log(`Server running on http://localhost:${defaultPort}`);
// // });

// // server.on('error', (err) => {
// //     if (err.code === 'EADDRINUSE') {
// //         console.error(`Port ${defaultPort} is already in use.`);
// //         const newPort = defaultPort + 1;
// //         console.log(`Trying port ${newPort}...`);
// //         server.listen(newPort);
// //     } else {
// //         console.error('Server error:', err);
// //     }
// // });

// // process.on('SIGINT', () => {
// //     console.log('Closing server...');
// //     server.close(() => {
// //         console.log('Server closed.');
// //         console.log('Closing database connection...');
// //         db.end(err => {
// //             if (err) {
// //                 console.error('Error closing database connection:', err);
// //             } else {
// //                 console.log('Database connection closed.');
// //                 process.exit(0);
// //             }
// //         });
// //     });
// // });


// const express = require('express');
// const mysql = require('mysql2');
// const async = require('async');
// const path = require('path');
// const app = express();
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const db = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'college1',
//     password: 'Mysql@*#2184'
// });

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

// const defaultPort = 8000;

// app.post('/addReview', (req, res) => {
//     const { collegeId, username, reviewText } = req.body;
//     const addReviewQuery = 'INSERT INTO reviews (collegeId, username, review_text) VALUES (?, ?, ?)';
//     db.query(addReviewQuery, [collegeId, username, reviewText], (err, result) => {
//         if (err) {
//             console.error('Error adding review to the database:', err);
//             return res.status(500).json({ error: 'Error adding review' });
//         }
//         res.redirect(`/college/${collegeId}`);
//     });
// });

// app.get('/college/:id', (req, res) => {
//     const collegeId = parseInt(req.params.id);
//     if (isNaN(collegeId)) { // Check if the parsed ID is NaN
//         console.error('Invalid college ID:', req.params.id);
//         return res.status(400).json({ error: 'Invalid college ID' });
//     }

//     console.log(`Received request for college ID: ${collegeId}`);

//     const collegeQuery = `
//         SELECT 
//             c.CollegeName,
//             c.CollegeOverview,
//             c.CollegeLocation,
//             c.CollegeWebsite,
//             c.CollegeHelpline,
//             c.CollegeCode,
//             cc.CourseName,
//             c.CollegeImage,
//             r.review_id,
//             r.username,
//             r.review_text
//         FROM 
//             college c
//         LEFT JOIN 
//             College_courses cc ON c.CollegeId = cc.CollegeId
//         LEFT JOIN
//             reviews r ON c.CollegeId = r.collegeId
//         WHERE 
//             c.CollegeId = ?
//     `;

//     const updateCountQuery = `
//         UPDATE college
//         SET count = count + 1
//         WHERE CollegeId = ?
//     `;

//     const topCollegeIdsQuery = `
//     SELECT CollegeId
//     FROM college
//     ORDER BY count DESC
//     LIMIT 3;
//     `;

//     async.parallel([
//         function(callback) {
//             db.query(collegeQuery, [collegeId], (err, results) => {
//                 if (err) {
//                     console.error('Error executing college query:', err);
//                     return callback(err);
//                 }
//                 callback(null, results);
//             });
//         },
//         function(callback) {
//             db.query(updateCountQuery, [collegeId], (err, results) => {
//                 if (err) {
//                     console.error('Error executing update count query:', err);
//                     return callback(err);
//                 }
//                 callback(null, results);
//             });
//         },
//         function(callback) {
//             db.query(topCollegeIdsQuery, (err, results) => {
//                 if (err) {
//                     console.error('Error fetching top college IDs:', err);
//                     return callback(err);
//                 }
//                 // Extract college IDs from the result
//                 const topCollegeIds = results.map(row => row.CollegeId);
//                 callback(null, topCollegeIds);
//             });
//         }
//     ], function(err, results) {
//         if (err) {
//             console.error('Error executing queries:', err);
//             return res.status(500).json({ error: 'Error executing queries' });
//         }
    
//         const collegeData = results[0][0];
    
//         if (!collegeData) {
//             console.error('No results found for the given CollegeId.');
//             return res.status(404).json({ error: 'College not found' });
//         }
    
//         const courses = results[0].map(result => result.CourseName).filter(courseName => courseName);
//         const reviews = [];
//         const topCollegeIds = results[2]; // Correct index to access top college IDs
    
//         // Rest of your code...
    
    
//         results[0].forEach(result => {
//             if (result.review_id) {
//                 const existingReview = reviews.find(review => review.username === result.username && review.review_text === result.review_text);
//                 if (!existingReview) {
//                     reviews.push({
//                         username: result.username,
//                         review_text: result.review_text
//                     });
//                 }
//             }
//         });

//         res.render('college', {
//             collegeId: collegeId,
//             collegeName: collegeData.CollegeName,
//             collegeOverview: collegeData.CollegeOverview,
//             collegeLocation: collegeData.CollegeLocation,
//             collegeWebsite: collegeData.CollegeWebsite,
//             admissionHelpline: collegeData.CollegeHelpline,
//             collegeCode: collegeData.CollegeCode,
//             collegeImage: collegeData.CollegeImage,
//             courses,
//             reviews,
//             topCollegeIds: topCollegeIds
//         });
//         console.log(topCollegeIds);
//     });
// });

// const server = app.listen(defaultPort, () => {
//     console.log(`Server running on http://localhost:${defaultPort}`);
// });

// server.on('error', (err) => {
//     if (err.code === 'EADDRINUSE') {
//         console.error(`Port ${defaultPort} is already in use.`);
//         const newPort = defaultPort + 1;
//         console.log(`Trying port ${newPort}...`);
//         server.listen(newPort);
//     } else {
//         console.error('Server error:', err);
//     }
// });

// process.on('SIGINT', () => {
//     console.log('Closing server...');
//     server.close(() => {
//         console.log('Server closed.');
//         console.log('Closing database connection...');
//         db.end(err => {
//             if (err) {
//                 console.error('Error closing database connection:', err);
//             } else {
//                 console.log('Database connection closed.');
//                 process.exit(0);
//             }
//         });
//     });
// });

const express = require('express');
const mysql = require('mysql2');
const async = require('async');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'college1',
    password: 'Mysql@*#2184'
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const defaultPort = 8000;

app.post('/addReview', (req, res) => {
    const { collegeId, username, reviewText } = req.body;
    const addReviewQuery = 'INSERT INTO reviews (collegeId, username, review_text) VALUES (?, ?, ?)';
    db.query(addReviewQuery, [collegeId, username, reviewText], (err, result) => {
        if (err) {
            console.error('Error adding review to the database:', err);
            return res.status(500).json({ error: 'Error adding review' });
        }
        res.redirect(`/college/${collegeId}`);
    });
});

app.get('/college/:id', (req, res) => {
    const collegeId = parseInt(req.params.id);
    if (isNaN(collegeId)) { // Check if the parsed ID is NaN
        console.error('Invalid college ID:', req.params.id);
        return res.status(400).json({ error: 'Invalid college ID' });
    }

    console.log(`Received request for college ID: ${collegeId}`);

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

    const updateCountQuery = `
        UPDATE college
        SET count = count + 1
        WHERE CollegeId = ?
    `;

    const topCollegesQuery = `
    SELECT CollegeId, CollegeName
    FROM college
    ORDER BY count DESC
    LIMIT 3;
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
        function(callback) {
            db.query(updateCountQuery, [collegeId], (err, results) => {
                if (err) {
                    console.error('Error executing update count query:', err);
                    return callback(err);
                }
                callback(null, results);
            });
        },
        function(callback) {
            db.query(topCollegesQuery, (err, results) => {
                if (err) {
                    console.error('Error fetching top colleges:', err);
                    return callback(err);
                }
                // Extract college IDs and names from the result
                const topColleges = results.map(row => ({ id: row.CollegeId, name: row.CollegeName }));
                callback(null, topColleges);
            });
        }
    ], function(err, results) {
        if (err) {
            console.error('Error executing queries:', err);
            return res.status(500).json({ error: 'Error executing queries' });
        }
    
        const collegeData = results[0][0];
    
        if (!collegeData) {
            console.error('No results found for the given CollegeId.');
            return res.status(404).json({ error: 'College not found' });
        }
    
        const courses = results[0].map(result => result.CourseName).filter(courseName => courseName);
        const reviews = [];
        const topColleges = results[2]; // Correct index to access top colleges
        
    
        results[0].forEach(result => {
            if (result.review_id) {
                const existingReview = reviews.find(review => review.username === result.username && review.review_text === result.review_text);
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
            collegeImage: collegeData.CollegeImage,
            courses,
            reviews,
            topColleges
        });

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

process.on('SIGINT', () => {
    console.log('Closing server...');
    server.close(() => {
        console.log('Server closed.');
        console.log('Closing database connection...');
        db.end(err => {
            if (err) {
                console.error('Error closing database connection:', err);
            } else {
                console.log('Database connection closed.');
                process.exit(0);
            }
        });
    });
});
