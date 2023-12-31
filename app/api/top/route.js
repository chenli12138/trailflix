import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request) {
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
  revalidatePath(request.url);
  return NextResponse.json(data);
}
