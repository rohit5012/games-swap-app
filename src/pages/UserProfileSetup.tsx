import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { addUserDetails } from "@/services/userDetailsService";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { useNavigate } from "react-router-dom";
import { createWishlist } from "@/services/wishlistServices";
import { createOwnedGamesList } from "@/services/ownedListService";
import { getCoordinates } from "@/services/geocodeCoordinates";

const UserProfileSetup: React.FC = () => {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [nickname, setNickname] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const coords = await getCoordinates(location);
    if (coords) {
      setCoordinates(coords);

      if (user) {
        const newUserDetails = {
          userId: user.uid,
          firstName,
          lastName,
          avatarUrl,
          platforms,
          nickname,
          gamesOwned: 0,
          gamesLent: 0,
          gamesBorrowed: 0,
          location,
          latitude: coords[0],
          longitude: coords[1],
        };

        try {
          await addUserDetails(newUserDetails);
          await createWishlist(user.uid);
          await createOwnedGamesList(user.uid);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } catch (error) {
          console.error("Error creating profile:", error);
        }
      }
    } else {
      console.error("Invalid location or unable to geocode");
    }
  };

  const handlePlatformChange = (platform: string) => {
    setPlatforms((prevPlatforms) =>
      prevPlatforms.includes(platform)
        ? prevPlatforms.filter((p) => p !== platform)
        : [...prevPlatforms, platform]
    );
  };
  // flex items-center justify-center 
  return (
    <Card className="mx-auto max-w-lg mt-26 mb-16">
      <CardHeader className="items-center justify-center space-y-1">
        <CardTitle className="text-2xl font-bold">
          Complete Your Profile
        </CardTitle>
        <CardDescription>
          Enter your details below to complete your profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="items-center justify-center">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name:</Label>
              <Input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                required
              />
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name:</Label>
              <Input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                required
              />
            </div>

            {/* Nickname */}
            <div className="space-y-2">
              <Label htmlFor="nickname">Nickname:</Label>
              <Input
                type="text"
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="janesmith"
                required
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location:</Label>
              <Input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Your postcode"
                required
              />
            </div>

            {/* Avatar URL */}
            <div className="space-y-2">
              <Label htmlFor="avatarUrl">Avatar URL:</Label>
              <Input
                type="url"
                id="avatarUrl"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            {/* Platforms */}
            <div className="space-y-0.8">
              <Label htmlFor="platforms">Select Platforms:</Label>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => handlePlatformChange("PlayStation 5")}
                  className={`bg-gray-200 hover:bg-gray-300 px-4 py-2 mr-4 rounded ${
                    platforms.includes("PlayStation 5") ? "bg-gray-400" : ""
                  }`}
                >
                  PlayStation 5
                </button>
                <button
                  type="button"
                  onClick={() => handlePlatformChange("Xbox Series X/S")}
                  className={`bg-gray-200 hover:bg-gray-300 px-4 py-2 mr-4 rounded ${
                    platforms.includes("Xbox Series X/S") ? "bg-gray-400" : ""
                  }`}
                >
                  Xbox Series X/S
                </button>
                <button
                  type="button"
                  onClick={() => handlePlatformChange("Switch")}
                  className={`bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded ${
                    platforms.includes("Switch") ? "bg-gray-400" : ""
                  }`}
                >
                  Switch
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 mb-14 flex items-center justify-end gap-x-6">
            <Button
              type="submit"
              className="black-btn w-full text-white shadow-sm focus:outline-none hover:bg-gray-700"
            >
              Save Profile
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserProfileSetup;
