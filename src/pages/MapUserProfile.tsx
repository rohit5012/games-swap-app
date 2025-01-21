// GymProfile.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Gamer } from "../types/Gamer";

const MapUserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<Gamer[]>([]);

  useEffect(() => {
    const fetchGamer = async () => {
      const docRef = doc(db, "user details", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser(docSnap.data() as User);
      } 
    };

    fetchGamer();
  }, [id]);
  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded shadow-md max-w-2xl mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          {user.avatarUrl && (
            <img
              src={user.avatarUrl}
              alt={`${user.nickname} avatar`}
              className="w-24 h-24 rounded-full"
            />
          )}
          <h2 className="text-2xl font-bold">{user.nickname}</h2>
        </div>
        <p className="mb-4">
          <strong>Games:</strong> {user.gamesOwned}
        </p>
        <p className="mb-4">
          <strong>Platforms:</strong> {user.platforms}
        </p>
        <p className="mb-4">
          <strong>Location:</strong> {user.location}
        </p>
        <p className="mb-4">
          <strong>About Me:</strong> {user.aboutMe}
        </p>
        {/* <p>
          <strong>Coordinates:</strong> {user.latitude}, {user.longitude}
        </p> */}
      </div>
    </div>
  );
};

export default MapUserProfile;
