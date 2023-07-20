export default async function apiConfig(url) {
  const res = await fetch(url);
  return res.json();
}
