// components/Footer.js
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaHome,
  FaEnvelope,
  FaGithub,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="text-white py-4">
      <div className="container mx-auto flex flex-wrap justify-around items-center">
        {/* Quick Links */}
        <div className="flex flex-wrap gap-4 mb-2 sm:mb-0">
          <a href="/" className="hover:animate-bounce flex items-center">
            <FaHome className="mr-1" size={30} />
          </a>
          <a
            href="http://chenli.online"
            className="hover:animate-bounce flex items-center"
          >
            <FaEnvelope className="mr-1" size={30} />
          </a>
          <a
            href="https://github.com/chenli12138"
            className="hover:animate-bounce flex items-center"
          >
            <FaGithub className="mr-1" size={30} />
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-4 mb-2 sm:mb-0">
          <a
            href="https://facebook.com"
            className="hover:animate-bounce flex items-center"
          >
            <FaFacebook className="mr-1" size={30} />
          </a>
          <a
            href="https://twitter.com"
            className="hover:animate-bounce flex items-center"
          >
            <FaTwitter className="mr-1" size={30} />
          </a>
          <a
            href="https://instagram.com"
            className="hover:animate-bounce flex items-center"
          >
            <FaInstagram className="mr-1" size={30} />
          </a>
        </div>
      </div>
      <p className="text-center mt-8">
        Copyright © 2023 Chen Li. All Rights Reserved.
      </p>
    </footer>
  );
}
