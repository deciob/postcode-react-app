const ROOT = "https://api.postcodes.io";

export function getPostcode<T>(postcode: string): Promise<T> {
  return fetch(`${ROOT}/postcodes/${postcode}`)
    .then((r) => r.json())
    .then((d) => d as T);
}

//https://www.newline.co/@bespoyasov/how-to-use-fetch-with-typescript--a81ac257
