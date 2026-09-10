const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Resend
const resend = new Resend(process.env.RESEND_API_KEY);


// Test route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});


// SEND EMAIL
app.post("/send-email", async (req, res) => {

    try {

        const { name, email, message } = req.body;

        // Check if fields are filled
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all fields."
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
                    ${message}
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


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});