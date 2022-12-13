import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./views/Profile";
import Home from "./views/Home";
import NavBar from "./components/NavBar";
import TweetProvider from "./providers/TweetProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);
function App() {
  return (
    <TweetProvider>
      <div className="App">
        <NavBar />
        <RouterProvider router={router} />
      </div>{" "}
    </TweetProvider>
  );
}

export default App;
