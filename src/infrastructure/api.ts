const BASE_URL = "http://localhost:3002";

export async function request(url: string) {
  const response = await fetch(`${BASE_URL}${url}`);
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message);
  }
  return await response.json();
}
