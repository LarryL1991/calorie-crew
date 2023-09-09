import { Button } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FoodList() {
  const [foods, setFoods] = useState([]);

  async function fetchFoods() {
    const response = await fetch("/api/food");
    const data = await response.json();
    setFoods(data.foodSelections);
  }

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div>
      <h1>Food List</h1>
      <ul>
        {foods.map((food) => (
          <li key={food._id}>
            {food.name} - {food.calories} calories
            <Link href={`/FoodList/${food._id}`}>
              <Button>View Details</Button>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="FoodList/new">
        <Button>New Item</Button>
      </Link>
    </div>
  );
}
