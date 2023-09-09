import { useState, useEffect } from "react";
import { TextField, Autocomplete, CircularProgress } from "@mui/material";

const FoodSelector = ({ onFoodSelect }) => {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      // Fetch data from your database based on the user's query
      // Replace this with your API fetch logic
      const response = await fetch(`/api/food?query=${query}`);
      const data = await response.json();

      if (active) {
        setOptions(data.foodSelections);
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, query]);

  useEffect(() => {
    if (!query.trim()) {
      return undefined;
    }

    setLoading(true);
  }, [query]);

  return (
    <Autocomplete
      id="food-search"
      options={options}
      getOptionLabel={(option) =>
        `${option.name} - ${option.calories} calories`
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Add an item to your meal..."
          variant="outlined"
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      onChange={(_, newValue) => onFoodSelect(newValue)}
    />
  );
};

export default FoodSelector;
