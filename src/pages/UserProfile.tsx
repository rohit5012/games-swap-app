import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/firebase/firebase";
import { db } from "../firebase/firebase";

export type UserProfile = {
  id: string;
  firstName: string;
  email: string;
};

const UserProfile: React.FC = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const getSnapshot = await getDocs(collection(db, "user details"));
      const getProfileData = getSnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as UserProfile)
      );
      setProfiles(getProfileData);
    };
    console.log(profiles);

    fetchProfiles();
  }, []);

  return (
    <div>
      {profiles.map((profile) => {
        return <p>{profile.firstName}</p>;
      })}
    </div>
  );
};

export default UserProfile;
