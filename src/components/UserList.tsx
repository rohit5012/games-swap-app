import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { UserDetailsType } from "../types/UserDetails";
import UserProfile from "./UserProfile";
import { Link } from "react-router";

const UserList: React.FC = () => {
  const [profiles, setProfiles] = useState<UserDetailsType[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const getSnapshot = await getDocs(collection(db, "user details"));
      const getProfilesData = getSnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as UserDetailsType)
      );
      setProfiles(getProfilesData);
    };
    // console.log(profiles);

    fetchProfiles();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles.map((profile) => (
          <Link
            key={profile.id}
            to={`/users/${profile.id}`}
            className="block p-4 border-b hover:bg-gray-100"
          >
            {profile.firstName}
            {<UserProfile userId={profile.userId} />}
          </Link>
        ))}
      </div>
    </>
  );
};

export default UserList;
