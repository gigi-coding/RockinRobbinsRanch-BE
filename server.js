///////////////////////////////
// DEPENDENCIES
////////////////////////////////

require("dotenv").config();

const { PORT = 3001, MONGODB_URL } = process.env;

const express = require("express");

const app = express();

const mongoose = require("mongoose");

const cors = require("cors");
const morgan = require("morgan");


const ReviewsModel = require('./models/Reviews')
///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(MONGODB_URL);

// Connection Events
mongoose.connection
    .on("open", () => console.log("Your are connected to mongoose"))
    .on("close", () => console.log("Your are disconnected from mongoose"))
    .on("error", (error) => console.log(error));



///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", async (req, res) => {
    const review = new ReviewsModel({name: 'Spencer', review: 'Home away from home'});
    try {
        await review.save();
    } catch(err) {
        console.log(err)
    }
});

app.get

// // Reviews INDEX ROUTE
// app.get("/reviews", async (req, res) => {
//     try {
//       // get all reviews
//         res.json(await Reviews.find({}));
//     } catch (error) {
//       //send error
//         res.status(400).json(error);
//     }
// });

//   // Reviews CREATE ROUTE
// app.post("/reviews", async (req, res) => {
//     try {
//       // send all reviews
//         res.json(await Reviews.create(req.body));
//     } catch (error) {
//       //send error
//         res.status(400).json(error);
//     }
// });

// // Reviews UPDATE ROUTE
// app.put("/reviews/:id", async (req, res) => {
//     try {
//       // update reviews by ID
//     res.json(
//     await Reviews.findByIdAndUpdate(req.params.id, req.body)
//     );
//     } catch (error) {
//       //send error
//     res.status(400).json(error);
//     }
// });

//   // Reviews DELETE ROUTE
// app.delete("/reviews/:id", async (req, res) => {
//     try {
//       // delete people by ID
//         res.json(await Reviews.findByIdAndRemove(req.params.id));
//     } catch (error) {
//       //send error
//         res.status(400).json(error);
//     }
// });
///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));