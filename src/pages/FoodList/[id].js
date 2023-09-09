import {
  CircularProgress,
  Typography,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ListingIdPage() {
  const router = useRouter();
  const { id } = router.query;

  const [originalFood, setOriginalFood] = useState({});
  const [food, setFood] = useState({});
  const [loading, setLoading] = useState(false);

  async function fetchFood() {
    setLoading(true);
    const response = await fetch(`/api/food/${id}`);
    const data = await response.json();
    setFood(data);
    setOriginalFood(data);
    setLoading(false);
  }

  async function deleteListingHandler() {
    const response = await fetch(`/api/food/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    router.push("/FoodList");
  }

  useEffect(() => {
    if (!id) return;
    fetchFood();
  }, [id]);

  async function handleSubmit() {
    const response = await fetch(`/api/food/${id}`, {
      method: "PUT",
      body: JSON.stringify(food),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setFood(data);
    setOriginalFood(data);
  }

  return (
    <>
      {loading && <CircularProgress />}
      {!food?._id && !loading && <Typography>Listing not found</Typography>}
      {food?._id && (
        <>
          <Typography variant="h1">Listing Detail Page</Typography>
          <Stack spacing={2}>
            <TextField
              value={food.name}
              onChange={(e) => setFood({ ...food, name: e.target.value })}
              label="Name"
              variant="standard"
            />
            <TextField
              value={food.calories}
              onChange={(e) => setFood({ ...food, calories: e.target.value })}
              label="Calories"
              variant="standard"
            />
            <Button
              disabled={JSON.stringify(originalFood) === JSON.stringify(food)}
              onClick={() => handleSubmit()}
              variant="contained"
              color="primary"
            >
              Update
            </Button>
          </Stack>
          <Button
            onClick={deleteListingHandler}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
          <Link href=".">
            <Button variant="contained" color="primary">
              Return to Food List
            </Button>
          </Link>
        </>
      )}
    </>
  );
}
