import Lottie from "lottie-react";
import LoadingAnimation from "../assets/lottie/LoadingAnimation.json";

export default function LoadingAnimationComponent() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Lottie className="h" animationData={LoadingAnimation} />
      <p className="text-2xl font-medium text-gray-700 text-center dark:text-white">
        Loading games...
      </p>
    </div>
  );
}
