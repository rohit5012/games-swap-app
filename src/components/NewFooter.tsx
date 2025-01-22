import { PiGameControllerLight } from "react-icons/pi";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 dark:bg-zinc-100 text-white py-9">
      <div className="container mx-auto flex justify-between items-start px-4 md:px-40">
        <div className="flex flex-col md:flex-row md:space-x-16">
          <ul className="mb-4 md:mb-0">
            <li className="font-bold mb-4">pages</li>
            <li className="mb-4">
              <a href="/home" className="text-gray-400 hover:text-white">
                Home
              </a>
            </li>
            <li className="mb-4">
              <a href="/map" className="text-gray-400 hover:text-white">
                Borrow Games
              </a>
            </li>
            <li className="mb-4">
              <a
                href="/browse-games"
                className="text-gray-400 hover:text-white"
              >
                Upcoming Games
              </a>
            </li>
          </ul>
          <ul className="mb-4 md:mb-0">
            <li className="font-bold mb-4">resources</li>
            <li className="mb-4">
              <a href="#" className="text-gray-400 hover:text-white">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
            </li>
          </ul>
          <ul className="mb-4 md:mb-0">
            <li className="font-bold mb-4">more</li>
            <li className="mb-4">
              <a href="/contact" className="text-gray-400 hover:text-white">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div className="w-24">
          <PiGameControllerLight size={60} />
          <span className="text-gray-400 hover:text-white">EuroStars</span>
        </div>
      </div>
      <hr className="my-6 m-6 md:mx-60 border-gray-600" />

      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-60">
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <span className="text-gray-400 hover:text-white">
            ®2025 EuroStars
          </span>
        </div>
        <div className="flex space-x-2">
          <span>Developed with ❤️ by :</span>
          <span>Rohit</span>
          <a
            href="https://www.linkedin.com/in/rohittsharrma/"
            className="text-gray-400 hover:text-white"
          >
            <svg
              className="w-6 h-6 fill-current hover:animate-rotate"
              viewBox="0 0 24 24"
            >
              <path d="M22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.58c-1.14 0-2.06-.93-2.06-2.08S4.2 3.42 5.34 3.42c1.14 0 2.06.93 2.06 2.08s-.92 2.08-2.06 2.08zM20.45 20.45h-3.56v-5.98c0-1.42-.03-3.24-1.97-3.24-1.97 0-2.27 1.54-2.27 3.13v6.09h-3.56V9h3.41v1.56h.05c.47-.89 1.6-1.82 3.29-1.82 3.52 0 4.17 2.32 4.17 5.34v6.38z" />
            </svg>
          </a>
          <span>Luke</span>
          <a
            href="https://www.linkedin.com/in/lukenunogoncalves/"
            className="text-gray-400 hover:text-white"
          >
            <svg
              className="w-6 h-6 fill-current hover:animate-rotate"
              viewBox="0 0 24 24"
            >
              <path d="M22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.58c-1.14 0-2.06-.93-2.06-2.08S4.2 3.42 5.34 3.42c1.14 0 2.06.93 2.06 2.08s-.92 2.08-2.06 2.08zM20.45 20.45h-3.56v-5.98c0-1.42-.03-3.24-1.97-3.24-1.97 0-2.27 1.54-2.27 3.13v6.09h-3.56V9h3.41v1.56h.05c.47-.89 1.6-1.82 3.29-1.82 3.52 0 4.17 2.32 4.17 5.34v6.38z" />
            </svg>
          </a>
          <span>Javier</span>
          <a
            href="www.linkedin.com/in/javier-martinez-romera"
            className="text-gray-400 hover:text-white"
          >
            <svg
              className="w-6 h-6 fill-current hover:animate-rotate"
              viewBox="0 0 24 24"
            >
              <path d="M22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.58c-1.14 0-2.06-.93-2.06-2.08S4.2 3.42 5.34 3.42c1.14 0 2.06.93 2.06 2.08s-.92 2.08-2.06 2.08zM20.45 20.45h-3.56v-5.98c0-1.42-.03-3.24-1.97-3.24-1.97 0-2.27 1.54-2.27 3.13v6.09h-3.56V9h3.41v1.56h.05c.47-.89 1.6-1.82 3.29-1.82 3.52 0 4.17 2.32 4.17 5.34v6.38z" />
            </svg>
          </a>
          <span>Nadim</span>
          <a
            href="https://www.linkedin.com/in/nadim-chatellier-781b91279/"
            className="text-gray-400 hover:text-white"
          >
            <svg
              className="w-6 h-6 fill-current hover:animate-rotate"
              viewBox="0 0 24 24"
            >
              <path d="M22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.58c-1.14 0-2.06-.93-2.06-2.08S4.2 3.42 5.34 3.42c1.14 0 2.06.93 2.06 2.08s-.92 2.08-2.06 2.08zM20.45 20.45h-3.56v-5.98c0-1.42-.03-3.24-1.97-3.24-1.97 0-2.27 1.54-2.27 3.13v6.09h-3.56V9h3.41v1.56h.05c.47-.89 1.6-1.82 3.29-1.82 3.52 0 4.17 2.32 4.17 5.34v6.38z" />
            </svg>
          </a>
          <span>Liliia</span>
          <a
            href="https://www.linkedin.com/in/liliia-bahirova/"
            className="text-gray-400 hover:text-white"
          >
            <svg
              className="w-6 h-6 fill-current hover:animate-rotate"
              viewBox="0 0 24 24"
            >
              <path d="M22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.58c-1.14 0-2.06-.93-2.06-2.08S4.2 3.42 5.34 3.42c1.14 0 2.06.93 2.06 2.08s-.92 2.08-2.06 2.08zM20.45 20.45h-3.56v-5.98c0-1.42-.03-3.24-1.97-3.24-1.97 0-2.27 1.54-2.27 3.13v6.09h-3.56V9h3.41v1.56h.05c.47-.89 1.6-1.82 3.29-1.82 3.52 0 4.17 2.32 4.17 5.34v6.38z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
