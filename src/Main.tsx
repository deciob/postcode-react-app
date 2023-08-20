import React from "react";
import { fetchPostcode } from "./api.ts";
import ReactDOM from "react-dom/client";
import App from "./routes/App.tsx";
import ErrorPage from "./routes/ErrorPage.tsx";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const container = document.getElementById("root");

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ":postcode",
        element: <App />,
        loader: async ({ params }) => {
          return params.postcode && fetchPostcode(params.postcode);
        },
        id: "postcode",
      },
    ],
  },
]);

if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <FluentProvider theme={teamsLightTheme}>
        <RouterProvider router={router} />
      </FluentProvider>
    </React.StrictMode>,
  );
}
