import "./globals.css";
import NavBar from "./NavBar";
import { AuthContextProvider } from "./context/AuthContext";

export const metadata = {
  title: "Traifilx By Chen",
  description:
    "A Showcase Project by Chen. Next JS ver 13, Firebase for Auth, Tailwind for CSS, API from TMDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=" bg-neutral-950 text-white">
        <AuthContextProvider>
          <NavBar />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
