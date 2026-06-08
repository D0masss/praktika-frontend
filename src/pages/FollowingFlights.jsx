
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Container from "@mui/material/Container";
import NavigationBar from "../NavigationBar.jsx";
import {Button, TextField, Typography} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {useEffect, useState} from "react";

const columns = [
  {
    field: 'origin',
    headerName: 'Origin',
    sortable: false,
    width: 200
  },
  {
    field: 'destination',
    headerName: 'Destination',
    sortable: false,
    width: 200
  },
  {
    field: 'departureDate',
    headerName: 'Departure Date',
    width: 150,
  },
  {
    field: 'returnDate',
    headerName: 'Return Date',
    width: 150,
  },
  {
    field: 'lowestPrice',
    headerName: 'Lowest Price',
    width: 150,
  }
];

const paginationModel = { page: 0, pageSize: 5 };

const FollowingFlights = () => {

  const {control, handleSubmit, reset, formState} = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
    mode: "onBlur",
  });

  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      const queryString = new URLSearchParams({
        name: data.name,
        email: data.email
      }).toString();

      const backendUrl = `http://localhost:8080/tracked-flights?${queryString}`;
      console.log("Sending to URL:", backendUrl);

      const response = await fetch(backendUrl);

      if (!response.ok) {
        setError(true);
      }

      const result = await response.text();
      console.log("Backend response:", result);

      setRows(JSON.parse(result));

    } catch (error) {
      console.error("Form submission error:", error);
    }

    console.log(data);
  }

  useEffect (() => {
    if (formState.isSubmitSuccessful) {
      reset({
        name: "",
        email: "",
      })
    }
  }, [formState,  reset]);


  return (
    <Box sx={{ width: '100%', minHeight: '100vh' }}>
      <NavigationBar />
      <div className={"flex justify-center items-center"}>
        <Box component={"form"}
             onSubmit={handleSubmit(onSubmit)}
             sx={{
               gap: 2,
               my: 4,
               p: 4,
               backgroundColor: '#EBE6D2',
               border: '2px solid black',
               borderRadius: 4,
             }}
             className={"flex-col flex justify-center items-center"}
        >
          <div className={"flex justify-center items-center gap-6"}>
            <Controller
              name={"name"}
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Name"
                  variant="outlined"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />

            <Controller
              name={"email"}
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format"
                }
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            {error && (
              <Typography variant="body2" component="p">{error.message}</Typography>
            )}
          </div>
          <div className={"gap-3 w-1/3"}>
            <Button type={"submit"} variant={"contained"} className={"w-full p-9"}>Submit</Button>
          </div>
        </Box>
      </div>

      <Container maxWidth="md">
        <div className={"flex justify-center flex-col items-center mt-10"}>
          <Typography variant={"h4"}>TRACKED FLIGHTS</Typography>
          <div className={"mt-3"}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              sx={{ border: 0}}
              autoHeight={true}
            />
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default FollowingFlights;
