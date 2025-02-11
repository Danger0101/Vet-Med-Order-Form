mport { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/combobox";
import { sendEmail } from "./emailService";

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
    const emailData = {
      user,
      orders: orders.filter((o) => o.med && o.quantity),
    };
    sendEmail(emailData);
    alert("Order submitted!");
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