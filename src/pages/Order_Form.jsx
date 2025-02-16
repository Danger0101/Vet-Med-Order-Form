import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Card, CardContent } from "../components/card";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Combobox } from "../components/combo";
import "../css/order-form.css";
import { medOptions } from "../data/medOptions";

export default function VetMedOrderForm() {
  const [user, setUser] = useState("");  // State for name or email
  const [orders, setOrders] = useState([{ med: "", quantity: "", company: "", location: "" }]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const filteredMedOptions = medOptions.filter((med) =>
    med.med.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const locations = ["London Fields (Hub)", "Clapton", "Columbia Road"];

  const handleOrderChange = (index, field, value) => {
    const newOrders = [...orders];
    newOrders[index][field] = value;
    setOrders(newOrders);
  };

  const addOrder = () => {
    if (orders.some((order) => !order.med || !order.quantity || !order.company || !order.location)) {
      alert("Please fill out the current medication order before adding a new one.");
    } else {
      setOrders([...orders, { med: "", quantity: "", company: "", location: "" }]);
    }
  };

  const removeOrder = (index) => {
    if (orders.length > 1) {
      const newOrders = orders.filter((_, i) => i !== index);
      setOrders(newOrders);
    } else {
      alert("You must always have at least one medication order.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.trim()) {
      alert("Please enter your name or email for verification.");
      return;
    }

    if (orders.length === 0 || orders.some((o) => !o.med || !o.quantity || !o.company || !o.location)) {
      alert("Please enter the quantity, company, and location for each order.");
      return;
    }

    // Format the email message as plain text, including company and location
    const formattedMessage = orders
      .map(
        (order) => `
        Medication To Order:
           ${order.med}

        Order From Company:
           ${order.company}

        Quantity Requested:
           ${order.quantity}

        For Location:
           ${order.location}
        ------------------------`
      )
      .join("\n");

    // Prepare the email data (fields that will be sent to Web3Forms)
    const formData = new FormData();
    formData.append("access_key", "db1c9c3c-bfc8-4159-86e9-d9a3c36ae9e0"); // Public Access Key from Web3Forms
    formData.append("name_or_email", user);  // Added user verification field
    formData.append("message", formattedMessage);

    // Send the form data to Web3Forms
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
      headers: {
        "Accept": "application/json",
        "Authorization": "db1c9c3c-bfc8-4159-86e9-d9a3c36ae9e0", // Public Access Key from Web3Forms
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Order submitted successfully!");
          navigate("/");  // Navigate back to the homepage after successful submission
        } else {
          alert(`There was an issue submitting your order: ${data.message || data.error}`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an issue submitting your order.");
      });
  };

  return (
    <div className="max-w-full sm:max-w-lg mx-auto p-4">
      <Card className="card-container">
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Input
              name="user"
              placeholder="Enter your Name or Email for Verification"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="input-field mb-6"
            />
            {orders.map((order, index) => (
              <div key={index} className="form-container mb-4">
                <Combobox
                  name={`med-${index}`}
                  options={filteredMedOptions.map((item) => item.med)}
                  placeholder="Select Med"
                  value={order.med}
                  onChange={(value) => {
                    const selectedMed = medOptions.find((item) => item.med === value);
                    handleOrderChange(index, "med", value);
                    handleOrderChange(index, "company", selectedMed ? selectedMed.company : "");
                  }}
                  onInputChange={(e) => setSearchTerm(e.target.value)}
                  className="combobox"
                />
                <Input
                  type="number"
                  name={`quantity-${index}`}
                  placeholder="Quantity"
                  value={order.quantity}
                  onChange={(e) => handleOrderChange(index, "quantity", e.target.value)}
                  className="input-field"
                />
                <select
                  name={`location-${index}`}
                  value={order.location}
                  onChange={(e) => handleOrderChange(index, "location", e.target.value)}
                  className="input-field"
                >
                  <option value="">Select Location</option>
                  {locations.map((location, idx) => (
                    <option key={idx} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
                <Button
                  type="button"
                  onClick={() => removeOrder(index)}
                  className="button remove-button bg-red-500 hover:bg-red-600 text-white"
                >
                  Remove Med
                </Button>
              </div>
            ))}
            <div className="flex gap-4 mb-4">
              <Button type="button" onClick={addOrder} className="button secondary">
                + Add More
              </Button>
              <Button type="submit" className="button primary">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}