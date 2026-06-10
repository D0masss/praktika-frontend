import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router"; // Just the simple link!

const NavigationBar = () => {
  return (
    <Box component="nav" sx={{ width: "100%", backgroundColor: "white", py: 1, height: "60px" }}>
      <Container maxWidth="xl" sx={{ height: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", gap: 15 }}>

          <Typography variant="body1">
            <Link
              to="/"
              style={{
                color: "#1976d2",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "24px",
              }}
            >
              Track a Flight
            </Link>
          </Typography>

          <Typography variant="body1">
            <Link
              to="/following-flights"
              style={{
                color: "#1976d2",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "24px",
              }}
            >
              Tracked Flights
            </Link>
          </Typography>

        </Box>
      </Container>
    </Box>
  );
};

export default NavigationBar;