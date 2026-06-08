import {createBrowserRouter} from "react-router";
import CitySelection from "./CitySelection.jsx";
import FollowingFlights from "./FollowingFlights.jsx";
import ErrorPage from "./ErrorPage.jsx";

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