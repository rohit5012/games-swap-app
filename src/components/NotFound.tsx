import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { Button } from "./ui/Button";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center dark:text-white">
            404 - Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 dark:text-gray-400">
            Oops! The page you're looking for doesn't exist.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link className="mt-3" to="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
