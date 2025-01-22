import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { Button } from "@/components/ui/Button";

export default function Logout() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}
