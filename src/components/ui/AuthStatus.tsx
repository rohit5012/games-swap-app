import { useAuth } from "@/hooks/useAuth";
import React from "react";

const AuthStatus: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>{user ? `profile image` : null}</div>
  );
};

export default AuthStatus;
