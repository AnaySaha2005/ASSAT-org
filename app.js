const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const otpGenerator = require('otp-generator');
const { boolean } = require('mathjs');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/attendanceSystem', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a mongoose model for OTPs
const Otp = mongoose.model('Otp', {
    teacherName: String,
    otp: String,
    validUntil: Date,
});

// Display the teacher OTP form
app.get('/teacher', (req, res) => {
    res.render('teacherForm.ejs');
});

// Handle teacher form submission
app.post('/teacher/submit', async (req, res) => {
    const teacherName = req.body.teacherName;
    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
    const validUntil = new Date(Date.now() + 3 * 60 * 1000); // Valid for 5 minutes

    // Save OTP in the database
    const teacherOtp = new Otp({ teacherName, otp, validUntil });
    await teacherOtp.save();

    res.render('teacherSuccess.ejs', { otp });
});

// Display the student attendance form
app.get('/student', (req, res) => {
    firstName = "Rohan"
    res.render('student.ejs', { firstName });
});

// Handle student form submission
app.post('/student/submit', async (req, res) => {
    const enteredOtp = req.body.enteredOtp;
    console.log(enteredOtp);
    // Find the OTP in the database
    const teacherOtp = await Otp.findOne({ otp: enteredOtp, validUntil: { $gt: new Date() } });

    if (teacherOtp) {
        s = "Attendance Taken Successfully!!"
        // Valid OTP, mark attendance or perform other actions
        res.render("studentSuccess.ejs", { s });
    } else {
        f = "Sorry your attendance has not been taken.."
        res.render("studentSuccess.ejs", { f });
    }
});

app.listen(port, function () {
    console.log(`Server is running on port ${port}`);
});