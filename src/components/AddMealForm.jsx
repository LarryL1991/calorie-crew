import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import FoodSelector from "./FoodSelector"; // Import your FoodSelector component
import DeleteIcon from "@mui/icons-material/Delete"; // Import the delete icon
import { useAuth } from "@clerk/nextjs";

const AddMealForm = () => {
  const [selectedFoods, setSelectedFoods] = useState([
    {
      name: "", // User-selected food
      calories: 0, // Calories for the selected food (fetched from the database)
      measurement: "",
      quantity: 1, // Quantity set by the user (initially set to 1)
    },
  ]);
  const [selectedMealType, setSelectedMealType] = useState("");
  const [date, setDate] = useState("1970-01-02");

  const { isLoaded, userId } = useAuth();

  const handleAddItem = () => {
    setSelectedFoods([
      ...selectedFoods,
      { name: "", calories: 0, measurement: "", quantity: 1 },
    ]);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");

    setDate(`${year}-${month}-${day}`);
  }, []);

  const handleRemoveItem = (index) => {
    const updatedSelectedFoods = [...selectedFoods];
    updatedSelectedFoods.splice(index, 1); // Remove the food item at the specified index
    setSelectedFoods(updatedSelectedFoods);
  };

  const handleFoodSelection = (food, index) => {
    const updatedSelectedFoods = [...selectedFoods];
    updatedSelectedFoods[index] = {
      name: food?.name || "", // Update name if food is not null, otherwise, reset to an empty string
      calories: food?.calories || 0, // Update calories if food is not null, otherwise, reset to 0
      measurement: food?.measurement || "",
      quantity: 1, // Reset quantity to 1
    };
    setSelectedFoods(updatedSelectedFoods);
  };

  const handleMealTypeChange = (event) => {
    setSelectedMealType(event.target.value);
  };

  const handleQuantityChange = (event, index) => {
    const updatedSelectedFoods = [...selectedFoods];
    updatedSelectedFoods[index] = {
      ...updatedSelectedFoods[index],
      quantity: parseInt(event.target.value) || 1, // Ensure quantity is a positive number
    };
    setSelectedFoods(updatedSelectedFoods);
  };

  const HandleCompleteMeal = async () => {
    if (!isLoaded || !userId) {
      return null;
    }

    const formattedDate = new Date(date);
    formattedDate.setHours(0, 0, 0, 0);
    console.log(formattedDate.toISOString());

    try {
      // Calculate the total calories consumed for the meal
      const totalCalories = selectedFoods.reduce(
        (total, food) => total + food.calories * food.quantity,
        0
      );

      // Prepare the data to send to the API
      const mealData = {
        user_id: userId,
        date,
        meal_type: selectedMealType.toLowerCase(),
        food_items: selectedFoods,
        total_calories: totalCalories,
      };

      console.log(mealData);

      // Send a POST request to your API endpoint
      const response = await fetch("/api/addMeal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mealData), // Convert data to JSON format
      });

      if (response.ok) {
        // Handle success, e.g., show a success message
        console.log("Meal added successfully!");
        // Reset the form or do any other necessary actions
        setSelectedFoods([
          {
            name: "",
            calories: 0,
            measurement: "",
            quantity: 1,
          },
        ]);
        setSelectedMealType("");
      } else {
        // Handle error, e.g., show an error message
        console.error("Failed to add meal");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <FormControl fullWidth>
        <TextField
          label="Date (YYYY-MM-DD)"
          variant="outlined"
          value={date}
          onChange={handleDateChange}
          fullWidth
          required
        />
        <Select
          labelId="meal-type-label"
          id="meal-type"
          value={selectedMealType}
          label="Meal Type"
          onChange={handleMealTypeChange}
        >
          <MenuItem value="Breakfast">Breakfast</MenuItem>
          <MenuItem value="Lunch">Lunch</MenuItem>
          <MenuItem value="Dinner">Dinner</MenuItem>
          <MenuItem value="Snack">Snack</MenuItem>
        </Select>
      </FormControl>
      {selectedFoods.map((selectedFood, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={5}>
            <FoodSelector
              onFoodSelect={(food) => handleFoodSelection(food, index)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Calories"
              variant="outlined"
              value={selectedFood.calories}
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Quantity"
              variant="outlined"
              value={selectedFood.quantity}
              onChange={(event) => handleQuantityChange(event, index)}
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton
              color="error"
              aria-label="Remove"
              onClick={() => handleRemoveItem(index)}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      <Button variant="outlined" onClick={handleAddItem}>
        Add Item
      </Button>
      <div>
        <Button variant="outlined" onClick={HandleCompleteMeal}>
          Complete Meal
        </Button>
      </div>
    </div>
  );
};

export default AddMealForm;
