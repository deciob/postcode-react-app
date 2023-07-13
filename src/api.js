const ROOT = "https://api.postcodes.io";

export async function getPostcode(postcode) {
  const response = await fetch(`${ROOT}/postcodes/${postcode}`);
  return await response.json();
}
