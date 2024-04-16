const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config(); // Make sure to include dotenv for environment variables

const app = express();
const port = 3016;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files

// Handle form submission
app.post('/submit-form', (req, res) => {
    const { firstName, lastName, telephone, email, message, dob, smoker } = req.body;
    console.log(req.body); // Log form data for verification
    
    // Setup Nodemailer transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Use environment variables
            pass: process.env.EMAIL_PASS,
        },
    });

    // Email options
    let mailOptions = {
        from: `"Form Submission" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER, // Sending the email to yourself
        subject: 'New Form Submission',
        text: `Details: ${JSON.stringify(req.body)}`,
    };

    // Sending email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            res.status(500).send('Error sending email.');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Form submitted successfully.');
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
