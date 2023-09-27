import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const MealList = () => {
  const [userId, setUserId] = useState(""); // State for userId input
  const [date, setDate] = useState(""); // State for date input
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const fetchMeals = async () => {
    try {
      // Make an API request to fetch meals for the specified userId and date
      console.log(date);
      const response = await fetch(`/api/meals/${userId}/${date}`);
      const data = await response.json();
      setMeals(data.meals);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    setLoading(true); // Set loading to true when submitting the form
    fetchMeals();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="User ID"
          variant="outlined"
          value={userId}
          onChange={handleUserIdChange}
          fullWidth
          required
        />
        <TextField
          label="Date (YYYY-MM-DD)"
          variant="outlined"
          value={date}
          onChange={handleDateChange}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Fetch Meals
        </Button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : meals.length === 0 ? (
        <p>No meals found for the specified user and date.</p>
      ) : (
        <Paper elevation={3}>
          <Typography variant="h5" align="center" gutterBottom>
            Meals for {date}
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Meal Type</TableCell>
                  <TableCell>Food Items</TableCell>
                  <TableCell>Total Calories</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {meals.map((meal) => (
                  <TableRow key={meal._id}>
                    <TableCell>{meal.meal_type}</TableCell>
                    <TableCell>
                      <ul>
                        {meal.food_items.map((food) => (
                          <li key={food._id}>
                            {food.name} x {food.quantity} - {food.calories}{" "}
                            calories
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>{meal.total_calories} calories</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </div>
  );
};

export default MealList;
