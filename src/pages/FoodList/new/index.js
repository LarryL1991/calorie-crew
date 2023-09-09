import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, TextField, Typography, Container, Grid } from "@mui/material";

export default function AddFoodForm() {
  const router = useRouter();
  const [food, setFood] = useState({ name: "", calories: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFood({ ...food, [name]: value });
  };

  const handleAddFood = async () => {
    const response = await fetch("/api/food", {
      method: "POST",
      body: JSON.stringify(food),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(JSON.stringify(food));
    const data = await response.json();
    router.push(`/FoodList/${data._id}`);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Add Food Entry
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={food.name}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Calories"
              name="calories"
              value={food.calories}
              onChange={handleInputChange}
              variant="outlined"
              type="number"
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleAddFood}
            >
              Add
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={() => router.push("/FoodList")}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
