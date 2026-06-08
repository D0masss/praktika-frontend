import {createBrowserRouter} from "react-router";
import CitySelection from "./pages/CitySelection.jsx";
import FollowingFlights from "./pages/FollowingFlights.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

const AppRoutes = createBrowserRouter([

  {
    path: "/",
    element: <CitySelection />,
    errorElement: <ErrorPage />
  },

  {
    path: "/following-flights",
    element: <FollowingFlights />,
    errorElement: <ErrorPage />
  }
])

export default AppRoutes;