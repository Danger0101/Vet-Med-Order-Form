import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Card, CardContent } from "../components/card";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Combobox } from "../components/combo";
import "../css/order-form.css";
import { medOptions } from "../data/medOptions";
import React from "react";

export default function VetMedOrderForm() {
  const [user, setUser] = useState("");  
  const [location, setLocation] = useState("");  
  const [orders, setOrders] = useState([{ med: "", quantity: "", company: "" }]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); 

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
    if (orders.some((order) => !order.med || !order.quantity || !order.company) || !location) {
      alert("Please fill out all fields before adding a new order.");
    } else {
      setOrders([...orders, { med: "", quantity: "", company: "" }]);
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

    if (!user.trim() || !location.trim()) {
      alert("Please enter your name/email and select a location.");
      return;
    }

    if (orders.length === 0 || orders.some((o) => !o.med || !o.quantity || !o.company)) {
      alert("Please enter all medication details.");
      return;
    }

    const formattedMessage = orders
      .map(
        (order) => `
        Medication To Order:
        •   ${order.med}

        Order From Company:
        •   ${order.company}

        Quantity Requested:
        •   ${order.quantity}
        ------------------------`
      )
      .join("\n");

    const formData = new FormData();
    formData.append("access_key", "db1c9c3c-bfc8-4159-86e9-d9a3c36ae9e0");
    formData.append("name_or_email", user);
    formData.append("location", location);
    formData.append("message", formattedMessage);

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
      headers: {
        "Accept": "application/json",
        "Authorization": "db1c9c3c-bfc8-4159-86e9-d9a3c36ae9e0",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Order submitted successfully!");
          navigate("/");
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
            {/* Flex container for Name/Email and Location dropdown in one row */}
            <div className="flex gap-4 mb-6">
              <Input
                name="user"
                placeholder="Enter Name or Email"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="input-field flex-1"
              />
              <select
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input-field flex-1"
              >
                <option value="">Select Location</option>
                {locations.map((loc, idx) => (
                  <option key={idx} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {orders.map((order, index) => (
              <div key={index} className="form-container mb-4">
                <div>
                <Combobox
                name={`med-${index}`}
                options={medOptions.map((item) => item.med)} // Pass med names only
                placeholder="Search or Enter Med"
                value={order.med}
                onChange={(value) => {
                  const selectedMed = medOptions.find((item) => item.med === value);
                  handleOrderChange(index, "med", value);
                  handleOrderChange(index, "company", selectedMed ? selectedMed.company : "Unknown");
                }}
                className="combobox"
                />
                </div>
                <Input
                  type="number"
                  name={`quantity-${index}`}
                  placeholder="Quantity"
                  value={order.quantity}
                  onChange={(e) => handleOrderChange(index, "quantity", e.target.value)}
                  className="input-field"
                />
                <Button
                  type="button"
                  onClick={() => removeOrder(index)}
                  className="button remove-button bg-red-500 hover:bg-red-600 text-white"
                >
                  Remove Med
                </Button>
                <br />
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
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card, CardContent } from "../components/card";
// import { Button } from "../components/button";
// import { Input } from "../components/input";
// import { Combobox } from "../components/combo";
// import "../css/order-form.css";
// import { medOptions } from "../data/medOptions";
// import React from "react";

// export default function VetMedOrderForm() {
//   const [user, setUser] = useState("");  
//   const [location, setLocation] = useState("");  
//   const [orders, setOrders] = useState([{ med: "", quantity: "", company: "" }]);
//   const navigate = useNavigate(); 

//   const locations = ["London Fields (Hub)", "Clapton", "Columbia Road"];

//   const handleOrderChange = (index, field, value) => {
//     const newOrders = [...orders];
//     newOrders[index][field] = value;
//     setOrders(newOrders);
//   };

//   const addOrder = () => {
//     if (orders.some((order) => !order.med || !order.quantity || !order.company) || !location) {
//       alert("Please fill out all fields before adding a new order.");
//     } else {
//       setOrders([...orders, { med: "", quantity: "", company: "" }]);
//     }
//   };

//   const removeOrder = (index) => {
//     if (orders.length > 1) {
//       const newOrders = orders.filter((_, i) => i !== index);
//       setOrders(newOrders);
//     } else {
//       alert("You must always have at least one medication order.");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!user.trim() || !location.trim()) {
//       alert("Please enter your name/email and select a location.");
//       return;
//     }

//     if (orders.length === 0 || orders.some((o) => !o.med || !o.quantity || !o.company)) {
//       alert("Please enter all medication details.");
//       return;
//     }

//     fetch("https://script.google.com/macros/s/AKfycbwlYWfSri2yTTdZDA5vXMmZAvWidQMmcaSv7RRHxWrXau5_-6p7CtBTu1hGgS9YQyaikw/exec", {
//       method: "POST",
//       body: JSON.stringify({ user, location, orders }),
//       headers: {
//         "Content-Type": "application/json"
//       },
//       mode: "cors"  // Ensure CORS is enabled
//     })
//     .then(response => response.json())
//     .then(data => {
//       if (data.success) {
//         alert("Order submitted successfully!");
//         navigate("/");  // Redirect to another page after submission
//       } else {
//         alert(`There was an issue submitting your order: ${data.message || data.error}`);
//       }
//     })
//     .catch(error => {
//       console.error("Error:", error);
//       alert("There was an issue submitting your order.");
//     });
//   };

//   return (
//     <div className="max-w-full sm:max-w-lg mx-auto p-4">
//       <Card className="card-container">
//         <CardContent>
//           <form onSubmit={handleSubmit}>
//             <div className="flex gap-4 mb-6">
//               <Input
//                 name="user"
//                 placeholder="Enter Name or Email"
//                 value={user}
//                 onChange={(e) => setUser(e.target.value)}
//                 className="input-field flex-1"
//               />
//               <select
//                 name="location"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 className="input-field flex-1"
//               >
//                 <option value="">Select Location</option>
//                 {locations.map((loc, idx) => (
//                   <option key={idx} value={loc}>{loc}</option>
//                 ))}
//               </select>
//             </div>

//             {orders.map((order, index) => (
//               <div key={index} className="form-container mb-4">
//                 <div>
//                   <Combobox
//                     name={`med-${index}`}
//                     options={medOptions.map((item) => item.med)}
//                     placeholder="Search or Enter Med"
//                     value={order.med}
//                     onChange={(value) => {
//                       const selectedMed = medOptions.find((item) => item.med === value);
//                       handleOrderChange(index, "med", value);
//                       handleOrderChange(index, "company", selectedMed ? selectedMed.company : "Unknown");
//                     }}
//                     className="combobox"
//                   />
//                 </div>
//                 <Input
//                   type="number"
//                   name={`quantity-${index}`}
//                   placeholder="Quantity"
//                   value={order.quantity}
//                   onChange={(e) => handleOrderChange(index, "quantity", e.target.value)}
//                   className="input-field"
//                 />
//                 <Button
//                   type="button"
//                   onClick={() => removeOrder(index)}
//                   className="button remove-button bg-red-500 hover:bg-red-600 text-white"
//                 >
//                   Remove Med
//                 </Button>
//                 <br />
//               </div>
//             ))}

//             <div className="flex gap-4 mb-4">
//               <Button type="button" onClick={addOrder} className="button secondary">+ Add More</Button>
//               <Button type="submit" className="button primary">Submit</Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
