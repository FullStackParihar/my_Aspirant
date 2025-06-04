const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const categoryRoute = require('./routes/categoryroute')
const subcategoryRoute = require('./routes/subcategoryroute') 
const bannerRoute = require('./routes/bannerroute')
const packageRoute = require('./routes/packageroute')
const studentRoute = require('./routes/studentroute')
const selectedStudentRoute = require('./routes/selectedstudentroute') 
const testRoute = require('./routes/testroute')
const questionRoute = require('./routes/questionroute')
const contactUsRoute = require('./routes/contactusroute')
const notificationRoute = require('./routes/notificationroute')
const fileUpload = require('express-fileupload');
const port = 3004;
const app = express()
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));


mongoose.connect('mongodb://localhost:27017/jobsucces')
.then(console.log("conneted"))


app.use("/user", userRoutes);
app.use("/category", categoryRoute);
app.use("/subcategory", subcategoryRoute);
app.use("/banner", bannerRoute);
app.use("/package", packageRoute);
app.use("/student", studentRoute);
app.use("/selectedstudent", selectedStudentRoute);
app.use("/test", testRoute);
app.use("/question", questionRoute);
app.use("/contactus", contactUsRoute);
app.use("/notification", notificationRoute);

app.listen(port, () => {
    console.log(`running on ${port}`)
})