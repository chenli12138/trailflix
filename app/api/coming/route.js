import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(resquest) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjI5YzhiNGY1NWNlZDJhNTlhYmI1NGI0YjE5OGVmOCIsInN1YiI6IjY0M2UyNWYxY2I2ZGI1MDQ5OWIwYTQ1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JHBrCxbxzuLAwtaatuTrtxyzN2aNDgs5AeAmhTy1Tis",
    },
  };

  const res = await fetch(
    "https://api.themoviedb.org/3/movie/upcoming?page=1",
    options
  );

  const data = await res.json();
  revalidatePath(resquest.url);
  return NextResponse.json(data);
}
