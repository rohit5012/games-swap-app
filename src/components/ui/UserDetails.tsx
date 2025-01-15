import React, { useState, useEffect } from "react";
import { UserDetailsType } from "../../types/UserDetails";
import { useAuth } from "@/hooks/useAuth";
import { addUserDetails, getUserDetails } from "@/services/userDetailsService";

const UserDetails: React.FC = () => {
  const [details, setDetails] = useState<UserDetailsType[]>([]);
  const [newUserTitle, setNewUserTitle] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadDetails();
    }
  }, [user]);

  const loadDetails = async () => {
    if (user) {
      const userDetails = await getUserDetails(user.uid);
      setDetails(userDetails);
    }
  };

  const handleAddUserDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user && newUserTitle.trim()) {
      const newUserDetails: Omit<UserDetailsType, "id"> = {
        firstName: newUserTitle,
        lastName: newUserTitle,
        location: "",
        gamesOwned: 0,
        gamesLent: 0,
        gamesBorrowed: 0,
        userId: user.uid,
      };
      await addUserDetails(newUserDetails);
      setNewUserTitle("");
      loadDetails();
    }
  };

  if (!user) {
    return <div>Please log in to view tasks.</div>;
  }

  return (
    <div className="border-2">
      <h2>User Details</h2>
      <form onSubmit={handleAddUserDetails}>
        <input
          type="text"
          value={newUserTitle}
          onChange={(e) => setNewUserTitle(e.target.value)}
          placeholder="First Name"
        />
        <button type="submit">Add Details</button>
      </form>
      <ul>
        {details.map((detail) => (
          <li key={detail.id}>
            <p>Name: {detail.firstName}</p>
            <p>Location: {detail.location}</p>
            <p>Games Owned: {detail.gamesOwned}</p>
            <p>Games Borrowed: {detail.gamesBorrowed}</p>
            <p>Games Lent: {detail.gamesLent}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetails;
