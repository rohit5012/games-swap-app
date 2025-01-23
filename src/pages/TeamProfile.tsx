import React, { useEffect } from "react";
import Pic2 from "../assets/pic2.webp";
import Pic3 from "../assets/pics3.jpg";
import Pic4 from "../assets/pic4.jpg";
import Pic5 from "../assets/pic5.jpg";
import Luke from "../assets/luke.png";
import Liliia from "../assets/Liliia.jpg";
import Rohit from "../assets/Rohit.jpeg";
import Nadim from "../assets/Nadim.png";
import Javier from "../assets/Javier.jpg";

interface ProfileSectionProps {
  title: string;
  content: string;
  imageUrl: string;
}

const TeamPhotos = [
  { name: "Luke Goncalves", imageUrl: Luke },
  { name: "Javier Martinez", imageUrl: Javier },
  { name: "Rohit Sharma", imageUrl: Rohit },
  { name: "Liliia Bahirova", imageUrl: Liliia },
  { name: "Nadim Chatellier", imageUrl: Nadim },
];

const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  content,
  imageUrl,
}) => (
  <div
    className="flex flex-col md:flex-row lg:gap-0 items-center mb-8 justify-around py-8 p-2"
    style={{ backgroundColor: "#c0c0c0" }}
  >
    <div className="text-center md:text-left w-full md:w-1/3 lg:w-1/2">
      <h3 className="text-3xl md:text-4xl lg:text-5xl text-nowrap font-bold mb-2 text-white">
        {title}
      </h3>
      <p className="text-gray-800  md:text-lg lg:text-lg">{content}</p>
    </div>
    <img
      src={imageUrl}
      alt={title}
      className="hidden md:block md:w-72 md:h-auto mb-4 md:mb-0 md:mr-6 rounded-full"
    />
  </div>
);

const ProfilePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="flex flex-col items-center container mx-auto px-2  ">
      {/* <h1 className="text-3xl font-bold mb-8 text-center">Profile Page</h1> */}
      <ProfileSection
        title="WHAT IS EUROSTARS?"
        content="An innovative application connects gamers within your local area, allowing them to swap, lend, or trade their video games easily. Users can list their available games, browse others' listings, and arrange swaps with nearby gamers1. The app ensures a secure and transparent transaction process, making it simple and convenient to refresh your game library without spending money. The app is live on Netlify, providing a seamless user experience with features like notifications, chat, and a trusted trader system."
        imageUrl={Pic2}
      />

      <div className="flex flex-col items-center py-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-600">
          HOW IT WORKS
        </h1>
        <div className="border-t-2 border-black w-full mb-16"></div>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <div className="flex flex-col items-center gap-3">
            <img src={Pic5} className="w-60 md:w-72" />
            <h4 className="text-xl md:text-2xl font-bold text-gray-600">
              Browse The Games
            </h4>
            <p className="text-[16px] md:text-lg text-gray-500">
              Once you find a game that interests you, clicking on it will take
              you to a dedicated page with detailed information. You can also
              locate them on map and contact them.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <img src={Pic4} className="md:w-56" />
            <h4 className="text-xl md:text-2xl font-bold text-gray-600">
              Find On Map
            </h4>
            <p className="text-[16px] md:text-lg text-gray-500">
              Once you find a game that interests you, clicking on it will take
              you to a dedicated page with detailed information. You can also
              locate them on map and contact them.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <img src={Pic3} className="w-72 md:w-auto md:h-60" />
            <h4 className="text-xl md:text-2xl font-bold text-gray-600">
              Contact The Gamers
            </h4>
            <p className="text-[16px] md:text-lg text-gray-500">
              You can use one of our core feature of contacting the near by
              gamers through chat system and fixed the deal.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-black text-gray-200 p-6 w-full flex items-center justify-center text-lg font-bold md:text-3xl">
        <p>WHO WE ARE</p>
      </div>

      <div className="text-lg text-gray-800 mb-4 bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto my-8">
        <p className="w-full">
          Meet our exceptional team of web developers—Javier, Luke, Rohit,
          Liliia and Nadim. They bring expertise in front-end and back-end
          technologies like React, Typescript, Node.js, Firebase, Javascript and
          Netify. Beyond their technical prowess, they are known for their
          friendly and supportive nature. Javier, the front-end wizard,
          simplifies complex concepts with her approachable demeanor. Rohit and
          Luke, the full-stack expert, excels in collaborative troubleshooting.
          Nadim and Liliia, the Backend specialist, contributes bright ideas
          with a positive attitude. Together, they create a dynamic, supportive,
          and innovative environment, making them not just skilled professionals
          but also amazing colleagues.
        </p>
      </div>

      <div className="flex justify-around items-center p-6 gap-6 rounded-lg shadow-md">
        {TeamPhotos.map((member) => (
          <div key={member.name} className="flex flex-col items-center">
            <img
              src={member.imageUrl}
              alt={member.name}
              className="w-40 h-40 rounded-full object-cover mb-2"
            />
            <p className="text-lg font-semibold text-gray-800">{member.name}</p>
          </div>
        ))}
      </div>

      <div className=" py-8 flex flex-col items-center ">
        <h1 className="text-3xl font-bold mb-6">Sign Up For More</h1>
        <form className="w-full  flex flex-row md:flex-row gap-3 ">
          <input
            className="shadow appearance-none border rounded  py-2 px-3  text-gray-700 "
            id="email"
            type="text"
            placeholder="your@email.com"
          />

          <button
            className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-[50px] rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
