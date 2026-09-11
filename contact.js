const contactForm = document.getElementById("contactForm");

const status = document.getElementById("status");

const sendButton = document.getElementById("sendButton");


contactForm.addEventListener("submit", async (e) => {

    e.preventDefault();


    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const message = document.getElementById("message").value.trim();


    // Change button text
    sendButton.textContent = "Sending...";

    sendButton.disabled = true;

    status.textContent = "";


    try {

        const response = await fetch(


          "https://skincare-website-hquu.onrender.com/",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    message
                })
            }
        );


        const data = await response.json();


        if (response.ok) {

            status.textContent = "Message sent successfully!";

            status.className = "text-center font-medium text-green-600";

            contactForm.reset();

        } else {

            status.textContent = data.message || "Failed to send message.";

            status.className = "text-center font-medium text-red-600";

        }


    } catch (error) {

        console.error(error);

        status.textContent =
            "Unable to send message. Please try again.";

        status.className =
            "text-center font-medium text-red-600";

    }


    sendButton.textContent = "Send Email";

    sendButton.disabled = false;

});