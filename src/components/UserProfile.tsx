// src/components/UserProfile.tsx
import React, { useEffect, useState } from "react";
import { UserDetailsType } from "../types/UserDetails";
import { getUserById } from "@/services/userDetailsService";
import { getUserDetails } from "@/services/userDetailsService";

// const UserProfile: React.FC = () => {
//   const { userId } = useParams<{ userId: string }>();
//   const [profile, setProfile] = useState<UserDetailsType | null>(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const docRef = doc(db, "user details", userId);
//         const docSnap = await getDoc(docRef);
//         console.log(docSnap.data());

//         if (docSnap.exists()) {
//           setProfile(docSnap.data() as UserDetailsType);
//         } else {
//           console.log("No such document!");
//         }
//       } catch (error) {
//         console.error("Error fetching document:", error);
//       }
//     };

//     fetchProfile();
//   }, [userId]);

//   if (!profile) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
//       <div
//         className="bg-cover bg-center h-56 p-4"
//         style={{ backgroundImage: `url(${profile.avatarURL})` }}
//       ></div>
//       <div className="p-4">
//         <h2 className="text-2xl font-bold">{profile.firstName}</h2>
//         <p className="text-gray-700">{profile.email}</p>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

const UserComponent: React.FC<{ userId: string }> = ({ userId }) => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(userId);
        setUser(userData);
      } catch (error) {
        setError(error.message);
      }
    };
    console.log(userId);
    fetchUser();
  }, [userId]);
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>{user.firstName}</h1> <p>{user.email}</p>
    </div>
  );
};
export default UserComponent;
