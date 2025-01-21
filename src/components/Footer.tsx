import { BsGithub, BsLinkedin } from "react-icons/bs";
import { Button } from "./ui/Button";

const developers = [
  { name: "Nadim", github: "", linkedin: "" },
  { name: "Luke", github: "", linkedin: "" },
  { name: "Javier", github: "", linkedin: "" },
  { name: "Lillia", github: "", linkedin: "" },
  { name: "Rohit", github: "", linkedin: "" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8 px-4 mt-auto">
      <div className="container mx-auto">
        <p className="text-center text-lg font-medium mb-6">
          Thanks for viewing our project
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {developers.map((dev) => (
            <div
              key={dev.name}
              className="flex flex-row gap-2 justify-center items-center"
            >
              <p className="font-medium">{dev.name}</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={`https://github.com/${dev.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${dev.name}'s GitHub`}
                  >
                    <BsGithub className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={`https://linkedin.com/in/${dev.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${dev.name}'s LinkedIn`}
                  >
                    <BsLinkedin className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}