import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/card";
import { Button } from "../components/button";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="p-6 text-center">
        <CardContent>
          <h1 className="text-2xl font-bold mb-4">Welcome to Vet Med Order</h1>
          <p className="text-gray-600 mb-6">Easily order veterinary medications online.</p>
          <Button onClick={() => navigate("/order")} className="bg-blue-500 text-white">
            Place an Order
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
