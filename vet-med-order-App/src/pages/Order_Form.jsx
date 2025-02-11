import { useState } from "react";
import { Card, CardContent } from "../components/card";  // Correct path for Card and CardContent
import { Button } from "../components/button";  // Correct path for Button
import { Input } from "../components/input";  // Correct path for Input
import { Combobox } from "../components/combo";  // Correct path for Combobox
import { sendEmail } from "../services/emailService";

const medOptions = ["Amoxicillin", "Cephalexin", "Prednisone", "Carprofen", "Metronidazole"];

export default function VetMedOrderForm() {
  const [user, setUser] = useState("");
  const [orders, setOrders] = useState([{ med: "", quantity: "" }]);

  const handleOrderChange = (index, field, value) => {
    const newOrders = [...orders];
    newOrders[index][field] = value;
    setOrders(newOrders);
  };

  const addOrder = () => {
    setOrders([...orders, { med: "", quantity: "" }]);
  };

  const handleSubmit = () => {
    if (!user.trim()) {
      alert("Please enter your name or email.");
      return;
    }
    if (orders.length === 0 || orders.some((o) => !o.med || !o.quantity)) {
      alert("Please add at least one valid medication order.");
      return;
    }

    // Prepare the email data
    const emailData = {
      user,
      orders: orders.filter((o) => o.med && o.quantity),
    };

    // Call the sendEmail function to send the data
    sendEmail(emailData);
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Veterinary Med Order Form</h2>
          <Input
            placeholder="Your Name or Email"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="mb-4"
          />
          {orders.map((order, index) => (
            <div key={index} className="mb-4 flex gap-2">
              <Combobox
                options={medOptions}
                placeholder="Select Med"
                value={order.med}
                onChange={(value) => handleOrderChange(index, "med", value)}
              />
              <Input
                type="number"
                placeholder="Quantity"
                value={order.quantity}
                onChange={(e) => handleOrderChange(index, "quantity", e.target.value)}
              />
            </div>
          ))}
          <Button onClick={addOrder} className="mr-2">+ Add More</Button>
          <Button onClick={handleSubmit} className="bg-blue-500 text-white">Submit</Button>
        </CardContent>
      </Card>
    </div>
  );
}
