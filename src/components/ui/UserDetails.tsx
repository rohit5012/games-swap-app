import React, { useState, useEffect } from "react";
import { UserDetailsType } from "../../types/UserDetails";
import { useAuth } from "@/hooks/useAuth";
import {
  addUserDetails,
  getUserDetails,
  updateUserDetails,
} from "@/services/userDetailsService";

const UserDetails: React.FC = () => {
  const [details, setDetails] = useState<UserDetailsType[]>([]);
  const [newUserTitle, setNewUserTitle] = useState("");
  const [updatedDetails, setUpdatedDetails] = useState({
    firstName: "",
    location: "",
  });

  const { user } = useAuth();
  console.log(user);
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
        lastName: "",
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

  const handleUpdateUserDetails = async (
    e: React.FormEvent,
    detail: UserDetailsType
  ) => {
    e.preventDefault();
    if (user) {
      const updatedUserDetails: Partial<UserDetailsType> = {
        firstName: updatedDetails.firstName,
        location: updatedDetails.location,
      };
      await updateUserDetails(detail.id!, updatedUserDetails);
      setUpdatedDetails({ firstName: "", location: "" });
      loadDetails();
    }
  };

  if (!user) {
    return <div>Please log in to view tasks.</div>;
  }

  return (
    <div className="flex justify-center border-2 gap-2 m-32">
      <h2>User Details:</h2>
      <form onSubmit={handleAddUserDetails}>
        <input
          type="text"
          value={newUserTitle}
          onChange={(e) => setNewUserTitle(e.target.value)}
          placeholder="First Name"
        />
        <button type="submit" className="border-2 bg-blue-300">
          Add Details
        </button>
      </form>
      <ul>
        {details.map((detail) => (
          <li key={detail.id}>
            <p>Name: {detail.firstName}</p>
            <p>Location: {detail.location}</p>
            <p>Games Owned: {detail.gamesOwned}</p>
            <p>Games Borrowed: {detail.gamesBorrowed}</p>
            <p>Games Lent: {detail.gamesLent}</p>
            <h2>Update Details</h2>
            <form onSubmit={(e) => handleUpdateUserDetails(e, detail)}>
              <input
                type="text"
                value={updatedDetails.firstName}
                onChange={(e) =>
                  setUpdatedDetails({
                    ...updatedDetails,
                    firstName: e.target.value,
                  })
                }
                placeholder="First Name"
              />
              <input
                type="text"
                value={updatedDetails.location}
                onChange={(e) =>
                  setUpdatedDetails({
                    ...updatedDetails,
                    location: e.target.value,
                  })
                }
                placeholder="Location"
              />
              <button type="submit" className="border-2 bg-blue-300">
                Update Details
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetails;
