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
          <span className="text-gray-400 hover:text-white">EuroStar</span>
        </div>
      </div>
      <hr className="my-6 m-6 md:mx-60 border-gray-600" />

      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-60">
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <span className="text-gray-400 hover:text-white">®2025 EuroStar</span>
        </div>
        <div className="flex space-x-6">
          <a
            href="https://www.facebook.com"
            className="text-gray-400 hover:text-white"
          >
            <svg
              className="w-6 h-6 fill-current hover:animate-rotate"
              viewBox="0 0 24 24"
            >
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.406.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.657-4.788 1.325 0 2.463.099 2.795.142v3.24l-1.918.001c-1.504 0-1.793.715-1.793 1.763v2.311h3.586l-.467 3.622h-3.119V24h6.112c.73 0 1.324-.593 1.324-1.324V1.325C24 .593 23.406 0 22.675 0z" />
            </svg>
          </a>
          <a
            href="https://www.twitter.com"
            className="text-gray-400 hover:text-white"
          >
            <svg
              className="w-6 h-6 fill-current hover:animate-rotate"
              viewBox="0 0 24 24"
            >
              <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.608 1.793-1.574 2.163-2.723-.951.564-2.005.974-3.127 1.195-.897-.955-2.173-1.55-3.591-1.55-2.717 0-4.92 2.203-4.92 4.917 0 .386.045.762.127 1.122C7.691 8.094 4.066 6.13 1.64 3.161c-.422.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.112-.849.171-1.296.171-.315 0-.623-.03-.922-.086.623 1.947 2.432 3.366 4.576 3.406-1.68 1.318-3.801 2.104-6.102 2.104-.395 0-.787-.023-1.175-.067 2.179 1.397 4.768 2.213 7.548 2.213 9.057 0 14.01-7.498 14.01-13.986 0-.213-.005-.425-.014-.637.964-.695 1.8-1.562 2.46-2.549z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
