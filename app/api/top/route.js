import { NextResponse } from "next/server";

export async function GET() {
  let cache = null;
  let cacheExpiry = null;
  const cacheDuration = 3600 * 1000;

  if (cache && cacheExpiry && cacheExpiry > Date.now()) {
    return NextResponse.json(data);
  }
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjI5YzhiNGY1NWNlZDJhNTlhYmI1NGI0YjE5OGVmOCIsInN1YiI6IjY0M2UyNWYxY2I2ZGI1MDQ5OWIwYTQ1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JHBrCxbxzuLAwtaatuTrtxyzN2aNDgs5AeAmhTy1Tis",
    },
  };

  const res = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated",
    options
  );

  const data = await res.json();
  cache = data;
  cacheExpiry = Date.now() + cacheDuration;
  return NextResponse.json(data);
}
