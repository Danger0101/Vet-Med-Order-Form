// import emailjs from "emailjs-com";

// export const sendEmail = (emailData) => {
//   emailjs.send(
//     "your_service_id",  // Replace with your EmailJS service ID
//     "your_template_id", // Replace with your EmailJS template ID
//     {
//       user: emailData.user,
//       orders: emailData.orders.map(o => `${o.med}: ${o.quantity}`).join(", "),
//     },
//     "your_user_id" // Replace with your EmailJS public key
//   )
//   .then(() => alert("Email sent successfully!"))
//   .catch(err => console.error("Email error:", err));
// };
// To Be Decided if will use emailjs or not.
// export const sendEmail = (emailData) => {
//   // Format the order details into a string
//   const formattedOrders = emailData.orders
//     .map((o) => `${o.med}: ${o.quantity}`)
//     .join(", ");

//   // Prepare the request body for the email
//   const requestBody = {
//     _subject: "New Veterinary Med Order",
//     user: emailData.user, // Dynamically get the user's name or email
//     orders: formattedOrders,
//   };

//   // Send the email using FormSubmit API
//   fetch("https://formsubmit.co/el/jeluvu", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(requestBody),
//   })
//     .then(() => {
//       alert("Order submitted successfully!");
//     })
//     .catch((err) => {
//       console.error("Error:", err);
//       alert("There was an issue submitting your order.");
//     });
// };

// Or Resend
// import { Resend } from "resend";

// export default async function (req, res) {
//   const { user, orders } = req.body;

//   const resend = new Resend("your-resend-api-key"); // Secure API Key

//   try {
//     await resend.emails.send({
//       from: "orders@yourdomain.com",
//       to: "vetorders@example.com",
//       subject: "New Veterinary Med Order",
//       text: `User: ${user}\nOrders:\n${orders}`,
//     });

//     res.status(200).json({ success: true, message: "Email sent!" });
//   } catch (error) {
//     res.status(500).json({ error: "Email failed" });
//   }
// }
