import { useState } from "react";
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

const AddMealForm = () => {
  const [selectedFoods, setSelectedFoods] = useState([""]); // Initialize with one empty food item
  const [selectedMealType, setSelectedMealType] = useState("");

  const handleAddItem = () => {
    setSelectedFoods([...selectedFoods, ""]);
  };

  const handleRemoveItem = (index) => {
    const updatedSelectedFoods = [...selectedFoods];
    updatedSelectedFoods.splice(index, 1); // Remove the food item at the specified index
    setSelectedFoods(updatedSelectedFoods);
  };

  const handleFoodSelection = (food, index) => {
    const updatedSelectedFoods = [...selectedFoods];
    updatedSelectedFoods[index] = food;
    setSelectedFoods(updatedSelectedFoods);
  };

  const handleMealTypeChange = (event) => {
    setSelectedMealType(event.target.value);
  };

  const handleCompleteMeal = async () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const meal = selectedFoods
      .filter((food) => food !== "")
      .map((food) => ({
        food_id: "food_id", // Replace with the actual food ID
        quantity: 1, // Replace with the quantity
        calories_consumed: 150, // Replace with the calories consumed
      }));

    try {
      // Prepare the data to send to the API
      const mealData = {
        user_id: "user_id", // Replace with the actual user ID
        daily: {
          date: currentDate, // Replace with the date or timestamp for the meal
          meals: [
            {
              type: selectedMealType.toLowerCase(),
              foods: selectedFoods,
            },
          ],
        },
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
        setSelectedFoods([""]); // Reset selected foods
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
        <InputLabel id="meal-type-label">Meal Type</InputLabel>
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
          <Grid item xs={11}>
            <FoodSelector
              foodTypes={[]} // Pass your food types here
              onFoodSelect={(food) => handleFoodSelection(food, index)}
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
        <Button variant="outlined" onClick={handleCompleteMeal}>
          Complete Meal
        </Button>
      </div>
    </div>
  );
};

export default AddMealForm;
