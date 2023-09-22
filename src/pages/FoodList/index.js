import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Calories</TableCell>
              <TableCell>Measurement</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foods.map((food) => (
              <TableRow key={food._id}>
                <TableCell>{food.name}</TableCell>
                <TableCell>{food.calories} calories</TableCell>
                <TableCell>{food.measurement}</TableCell>
                <TableCell>
                  <Link href={`/FoodList/${food._id}`}>
                    <Button variant="contained" color="primary">
                      View Details
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link href="/FoodList/new">
        <Button variant="contained" color="primary">
          New Item
        </Button>
      </Link>
    </div>
  );
}
