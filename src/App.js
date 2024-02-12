import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Envelope from "./components/Envelope";

import "./App.css";
import RSVPlist from "./pages/RSVP-list";

const router = createBrowserRouter([
  { path: "/", element: <Envelope /> },
  { path: "/rsvp-list", element: <RSVPlist /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
