import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Link } from "react-router";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom"; 
import { auth } from "@/firebase/firebase";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate(); 
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName });
      navigate("/user-profile-setup"); 
      
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <Card className="mx-auto max-w-sm mt-32">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
        <CardDescription>
          Enter your email and password to register
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Username</Label>
              <Input
                id="username"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <Link className={buttonVariants({ variant: "outline" })} to='/home'>
                      Forgot your password?
                    </Link> */}
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
            {/* <Button variant="outline" className="w-full">
                  Login with Google
                </Button> */}
          </div>
          <div className="mt-4 text-center text-sm">
            <p className="mb-2">Already have an account?</p>
            <Link
              className={buttonVariants({ variant: "outline" })}
              to="/login"
            >
              Login
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
