import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops!</h1>
        <p>Sorry, an error has occurred.</p>
        <p>{error.status} {error.statusText}</p>
      </div>
    );
  }

  return <p>{"Unknown Error"}</p>;
}
