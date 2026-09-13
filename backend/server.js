const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// =========================
// RESEND
// =========================

const resend = new Resend(process.env.RESEND_API_KEY);


// =========================
// MONGODB
// =========================

const mongoClient = new MongoClient(process.env.MONGODB_URI);

let db;
let wishlistsCollection;

async function connectMongoDB() {
    try {

        await mongoClient.connect();

        db = mongoClient.db("Benilux");

        wishlistsCollection = db.collection("wishlists");

        console.log("MongoDB connected successfully!");

    } catch (error) {

        console.error("MongoDB connection error:", error);

    }
}

connectMongoDB();


// =========================
// TEST ROUTE
// =========================

app.get("/", (req, res) => {

    res.send("Backend is running!");

});


// =========================
// SEND EMAIL
// =========================

app.post("/send-email", async (req, res) => {

    try {

        const { name, email, message } = req.body;

        if (!name || !email) {

            return res.status(400).json({
                success: false,
                message: "Please enter your name and email."
            });

        }

        const { data, error } = await resend.emails.send({

            from: "onboarding@resend.dev",

            to: ["chimnaonuel@gmail.com"],

            replyTo: email,

            subject: `New message from ${name}`,

            html: `
                <h2>New Contact Form Message</h2>

                <p>
                    <strong>Name:</strong> ${name}
                </p>

                <p>
                    <strong>Email:</strong> ${email}
                </p>

                <h3>Message:</h3>

                <p>
                    ${message || "No message provided."}
                </p>
            `
        });


        if (error) {

            console.error("RESEND ERROR:", error);

            return res.status(400).json({

                success: false,

                message: error.message || "Failed to send email."

            });

        }


        res.status(200).json({

            success: true,

            message: "Email sent successfully!",

            data

        });


    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Server error."

        });

    }

});


// =========================
// CREATE SHARED WISHLIST
// =========================

app.post("/wishlists", async (req, res) => {

    try {

        const { items } = req.body;


        if (!items || !Array.isArray(items) || items.length === 0) {

            return res.status(400).json({

                success: false,

                message: "Your wishlist is empty."

            });

        }


        // Generate a unique wishlist ID
        const wishlistId =
            Date.now().toString(36) +
            Math.random().toString(36).substring(2, 10);


        const wishlist = {

            wishlistId: wishlistId,

            items: items,

            createdAt: new Date()

        };


        await wishlistsCollection.insertOne(wishlist);


        res.status(201).json({

            success: true,

            wishlistId: wishlistId

        });


    } catch (error) {

        console.error("WISHLIST CREATE ERROR:", error);

        res.status(500).json({

            success: false,

            message: "Unable to create wishlist."

        });

    }

});


// =========================
// GET SHARED WISHLIST
// =========================

app.get("/wishlists/:id", async (req, res) => {

    try {

        const wishlist = await wishlistsCollection.findOne({

            wishlistId: req.params.id

        });


        if (!wishlist) {

            return res.status(404).json({

                success: false,

                message: "Wishlist not found."

            });

        }


        res.status(200).json({

            success: true,

            items: wishlist.items

        });


    } catch (error) {

        console.error("WISHLIST GET ERROR:", error);

        res.status(500).json({

            success: false,

            message: "Unable to load wishlist."

        });

    }

});


// =========================
// START SERVER
// =========================

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});