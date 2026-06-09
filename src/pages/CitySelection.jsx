import {Alert, Autocomplete, Box, Button, Container, Snackbar, TextField, Typography} from "@mui/material";
import { useState } from "react";
import {useMutation} from "@tanstack/react-query";
import NavigationBar from "../NavigationBar.jsx";

const cities = [
  { id: 1, originCity: 'Vilnius', origin: 'VNO' },
  { id: 2, originCity: 'London', origin: 'LHR' },
];

const isEmailValid = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

const CitySelection = () => {
  const [valueA, setValueA] = useState(null);
  const [valueB, setValueB] = useState(null);

  const [snackOpen, setSnackOpen] = useState(false);

  const [formInput, setFormInput] = useState({
    departureDate: "",
    arrivalDate: "",
    name: "",
    email: "",
  });

  const isDateOrderInvalid = formInput.departureDate && formInput.arrivalDate && formInput.departureDate > formInput.arrivalDate;
  const isEmailFormatInvalid = formInput.email && !isEmailValid(formInput.email);

  const isFormInvalid =
    !valueA ||
    !valueB ||
    !formInput.name ||
    !formInput.email ||
    isEmailFormatInvalid ||
    !formInput.departureDate ||
    !formInput.arrivalDate ||
    isDateOrderInvalid;

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch("/api/search-flights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data)
      });
      const errorData = await response.text();

      if (!response.ok) {
        throw new Error(errorData)
      }

      if (response.status === 200) {
        setSnackOpen(true);
      }

      if (response.status === 500) {
        throw new Error("Server error. Please try again later.");
      }

      try {
        return JSON.parse(errorData);
      } catch {
        return errorData;
      }
    }
  })

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const fullFormInputData = {
      origin: valueA.origin,
      originCity: valueA.originCity,
      destination: valueB.origin,
      destinationCity: valueB.originCity,
      departureDate: formInput.departureDate,
      returnDate: formInput.arrivalDate,
      name: formInput.name,
      email: formInput.email,
    }

    mutation.mutate(fullFormInputData)
  };

  return (

    <Box sx={{ width: '100%', minHeight: '100vh' }}>
      <NavigationBar />
      <Container maxWidth="full">
        {mutation.isSuccess && (
          <Snackbar
            open={snackOpen}
            autoHideDuration={6000}
            onClose = { () => setSnackOpen(false)}
          >
            <Alert severity="success" sx={{ width: '100%' }}>
              Successfully submitted flight search! Check your email for results.
            </Alert>
          </Snackbar>
        )
        }
        <Container maxWidth="md" sx={{ p:4, my: 4, backgroundColor: '#EBE6D2', border: '2px solid black', borderRadius: 4 }}>
          <Box sx={{ mt: 3 }} component="form" onSubmit={handleFormSubmit}>
            <div className={"flex justify-center align-center pb-3 gap-3"}>
              <Autocomplete
                disablePortal
                options={cities}
                value={valueA}
                onChange={(event, newValue) => setValueA(newValue)}
                getOptionLabel={(option) => option.originCity}
                getOptionDisabled={(option) => option.id === valueB?.id}
                renderInput={(params) => <TextField {...params} label="Origin city" />}
                sx={{ width: 350 }}
              />

              <Autocomplete
                disablePortal
                options={cities}
                value={valueB}
                onChange={(event, newValue) => setValueB(newValue)}
                getOptionLabel={(option) => option.originCity}
                getOptionDisabled={(option) => option.id === valueA?.id}
                renderInput={(params) => <TextField {...params} label="Destination city" />}
                sx={{ width: 350 }}
              />

              <TextField
                label="Departure date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formInput.departureDate}
                onChange={(event) => setFormInput(prev => ({ ...prev, departureDate: event.target.value }))}
                error={isDateOrderInvalid}
                helperText={isDateOrderInvalid ? "Departure date cannot be after arrival date" : ""}
                sx={{ width: 250 }}
              />

              <TextField
                label="Arrival date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formInput.arrivalDate}
                onChange={(event) => setFormInput(prev => ({ ...prev, arrivalDate: event.target.value }))}
                error={isDateOrderInvalid}
                helperText={isDateOrderInvalid ? "Arrival date cannot be before departure date" : ""}
                sx={{ width: 250 }}
              />
            </div>

            <div className={"flex justify-center align-center gap-3 mt-4"}>
              <TextField
                label="Name"
                type="text"
                InputLabelProps={{ shrink: true }}
                value={formInput.name}
                onChange={(event) => setFormInput(prev => ({ ...prev, name: event.target.value }))}
                sx={{ width: 250 }}
              />

              <TextField
                label="Email"
                type="email"
                InputLabelProps={{ shrink: true }}
                value={formInput.email}
                onChange={(event) => setFormInput(prev => ({ ...prev, email: event.target.value }))}
                error={!!isEmailFormatInvalid}
                helperText={isEmailFormatInvalid ? "Invalid email address" : ""}
                sx={{ width: 250 }}
              />
            </div>
            {mutation.isError && (
              <Typography color="error" sx={{ p: 2, textAlign: 'center' }}>
                {mutation.error.message}
              </Typography>
            )}
            <Box sx={{ mt: 4, display: 'flex', justifyContent: "center" }}>
              <Button
                type="submit"
                disabled={isFormInvalid || mutation.isPending}
                variant="contained"
              >
                {mutation.isPending ? "Submitting..." : "Search flights"}
              </Button>
            </Box>
          </Box>
        </Container>
      </Container>
    </Box>
  );
};

export default CitySelection;