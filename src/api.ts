import { InferredInfo, Req } from "./Type.ts";

export const ROOT = "https://api.postcodes.io";

export const fetchPostcode = (postcode: string): Promise<Response> => {
  return fetch(`${ROOT}/postcodes/${postcode}`);
};

export async function getPostcode<T>(postcode: string): Promise<T> {
  const response = await fetchPostcode(postcode);
  return await response.json();
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
