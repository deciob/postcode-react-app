import { InferredInfo, Req } from "./Type.ts";

export const ROOT = "https://api.postcodes.io";

export function getPostcode<T>(postcode: string): Promise<T> {
  return fetch(`${ROOT}/postcodes/${postcode}`)
    .then((r) => r.json())
    .then((d) => d as T);
}

export const requestPostcode = (
  // see: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example
  callback: React.Dispatch<React.SetStateAction<InferredInfo>>,
  postcode: string,
) => {
  getPostcode<Req>(postcode)
    .then(({ result, status }) => {
      if (status === 200 && result) {
        callback({
          postcode: postcode,
          admin_county: result.admin_county,
          parish: result.parish,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
