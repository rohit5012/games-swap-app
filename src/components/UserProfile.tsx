import React, { useEffect, useState } from "react";
import { UserDetailsType } from "../types/UserDetails";
import { getUserById } from "@/services/userDetailsService";
import { getUserDetails } from "@/services/userDetailsService";


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
