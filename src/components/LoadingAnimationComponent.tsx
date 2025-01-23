import Lottie from "lottie-react";
import LoadingAnimation from "../assets/lottie/LoadingAnimation.json"


export default function LoadingAnimationComponent() {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg">
      <div className="flex flex-col items-center bg-slate-100 w-[60vh] h-[60vh] p-6 rounded-xl shadow-lg">
        <Lottie className="h-[90%]" animationData={LoadingAnimation} />
        <p className="mt-4 text-2xl font-medium text-gray-700 text-center">Loading games...</p>
      </div>
    </div>
  );
}