
import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/firebase'; // Adjust to your Firebase setup
import { FaPlaystation, FaXbox } from 'react-icons/fa6';
import { BsNintendoSwitch } from 'react-icons/bs';
import OtherPPLWishlist from './OtherPPLOwnedGames';
import { Button } from './ui/Button';
import Wishlist from './Wishlist';



interface UserProfileRegUser {
  firstName: string;
  lastName: string;
  location: string;
  avatarUrl: string;
  platforms: string[];
  nickname: string;
  aboutMe: string;
  gamesOwned: number;
  gamesLent: number;
  gamesBorrowed: number;
}

const ViewProfileComponent: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [profile, setProfile] = useState<UserProfileRegUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [listItems, setListItems] = useState<string>("Owned");

  useEffect(() => {
    if (userId) {
      const fetchUserProfile = async () => {
        try {
          const q = query(
            collection(db, "user details"),
            where("userId", "==", userId)
          );

          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setProfile(userData as UserProfileRegUser);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserProfile();
    }
  }, [userId]);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!profile) {
    return <div>User profile not found.</div>;
  }

  const handleListsToggle = (list: string) => {
    setListItems(list);
  };
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors duration-200 mt-12">
      <div className="relative h-48">
        <img
          src={profile.avatarUrl}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute -bottom-12 left-6">
          <img
            src={profile.avatarUrl}
            alt="Profile"
            className="w-24 h-24 rounded-xl object-cover border-4 border-white dark:border-gray-800 shadow-lg"
          />
        </div>
      </div>

      <div className="relative pt-16 px-6 pb-6 flex flex-col md:flex-row gap-6">
        <div className="flex flex-col flex-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {profile.nickname}
          </h1>
          <p className="mt-5 text-gray-600 dark:text-gray-300">
            {profile.firstName} {profile.lastName}
          </p>
          <p className="text-purple-600 dark:text-purple-400 mt-2">
            {profile.location}
          </p>
          
          <Button variant={"default"}>
          <Link to={`/messages`} className="w-full h-full">
                            Message
                            </Link>
                          </Button>
         
        </div>

        <div className="flex flex-col text-gray-600 dark:text-gray-300 flex-1">
          <p className="mt-6">Games Owned: {profile.gamesOwned}</p>
          <p className="mt-0.5">Games Lent: {profile.gamesLent}</p>
          <p className="mt-0.5">Games Borrowed: {profile.gamesBorrowed}</p>

          <div className="mt-2 flex space-x-2">
            {profile.platforms.map((platform, index) => (
              <span key={index} className="mr-1">
                {renderPlatformIcon(platform)}
              </span>
            ))}
          </div>
          
        </div>
      </div>

      <div className="mt-6 p-6 bg-gray-200 dark:bg-purple-900 text-gray-700 dark:text-purple-300">
        <h2 className="font-semibold">About Me</h2>
        <p>{profile.aboutMe}</p>
      </div>

      <div className="flex items-center justify-center">
          <Button
            className="m-5 "
            onClick={() => {
              handleListsToggle("Wishlist");
            }}
          >
            Wishlist
          </Button>
          <Button
            className="m-5 "
            onClick={() => {
              handleListsToggle("Owned");
            }}
          >
            Owned
          </Button>
        </div>
        {listItems === "Owned" ? (
          <OtherPPLWishlist userId={userId} username={profile.nickname}></OtherPPLWishlist>
        ) : (
          <Wishlist userId={userId}></Wishlist>
        )}
 
      
    </div>
    
  );

  function renderPlatformIcon(platform: string) {
    switch (platform) {
      case "Xbox Series X/S":
        return <FaXbox className="text-xl text-green-600" />;
      case "PlayStation 5":
        return <FaPlaystation className="text-xl text-blue-600" />;
      case "Switch":
        return <BsNintendoSwitch className="text-xl text-red-600" />;
      default:
        return null;
    }
  }
};

export default ViewProfileComponent;
