const API_KEY = "a629c8b4f55ced2a59abb54b4b198ef8";
export const requestTrending = {
  Trendings: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
  requestName: "Trend",
};
export const requestUpcoming = {
  Upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`,
  requestName: "Upcoming",
};
export const requestTop = {
  Top: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
  requestName: "Top Rated",
};
