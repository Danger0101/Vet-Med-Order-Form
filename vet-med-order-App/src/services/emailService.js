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
// To Be Decided if will use emailjs or not. https://formsubmit.co/ is another option.
// formsubmit:
// const handleSubmit = () => {
//   const emailData = {
//     _subject: "New Veterinary Med Order",
//     user: "John Doe",
//     orders: [
//       { med: "Amoxicillin", quantity: "10" },
//       { med: "Carprofen", quantity: "5" }
//     ].map(o => `${o.med}: ${o.quantity}`).join(", "),
//   };

//   fetch("https://formsubmit.co/vetorders@example.com", { // Replace with your actual email
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(emailData),
//   })
//   .then(() => alert("Order submitted successfully!"))
//   .catch(err => console.error("Error:", err));
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
