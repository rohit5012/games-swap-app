import { useAuth } from "@/hooks/useAuth";
import React, { useContext } from "react";
import { UserContext } from "@/context/Usercontext";

const AuthStatus: React.FC = () => {
  const { user, loading } = useAuth();
  const {setUser} = useContext(UserContext)
  if (loading) {
    return <div>Loading...</div>;
  }
  if (user){
    console.log(user)
    setUser(user.uid)
  }
  
  return (
    <div>{user ? `profile image` : null}</div>
  );
};

export default AuthStatus;
