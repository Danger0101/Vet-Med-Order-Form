import emailjs from "emailjs-com";

export const sendEmail = (emailData) => {
  emailjs.send(
    "your_service_id",  // Replace with your EmailJS service ID
    "your_template_id", // Replace with your EmailJS template ID
    {
      user: emailData.user,
      orders: emailData.orders.map(o => `${o.med}: ${o.quantity}`).join(", "),
    },
    "your_user_id" // Replace with your EmailJS public key
  )
  .then(() => alert("Email sent successfully!"))
  .catch(err => console.error("Email error:", err));
};
