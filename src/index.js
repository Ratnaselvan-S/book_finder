import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./screens/Home";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import BookDetails from "./components/BookDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/book/works/:bookKey",
    element: <BookDetails />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
