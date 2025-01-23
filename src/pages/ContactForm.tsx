import emailjs from "emailjs-com";
import { useState } from "react";
import Swal from "sweetalert2";
import Pic from "../assets/pic1.jpg";
import "../assets/FloatingText.css";

const SERVICE_ID = "service_3ofnpqv";
const TEMPLATE_ID = "template_jhl43s7";
const PUBLIC_KEY = "wQOQX-74BNeC45Wn9";

const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      setError("All fields are required.");
      return;
    }
    setError("");

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY).then(
      (result) => {
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        Swal.fire({
          icon: "success",
          title: "Message Sent Successfully",
        });
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Ooops, something went wrong",
          text: error.text,
        });
      }
    );
  };

  return 
    (
      <div className="flex flex-col items-center w-full p-6">
        
        <div className="w-full overflow-hidden">
          <div className="whitespace-nowrap animate-scroll">
            This text is running slowly!
          </div>
        </div>
        
        <h2 className="text-2xl font-bold my-6 text-center">Contact Us</h2>
        </div>
        <div className="w-full flex justify-center items-center p-8 md:p-0">
          <div
            className="h-96 w-96 bg-cover bg-center rounded-full border-4 border-white"
            style={{ backgroundImage: `url(${Pic})` }}
          ></div>
        </div>
        
        

      
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center w-full">
        <div className="flex-1 max-w-md">
          <img src="your-image-url.jpg" alt="Contact Us" className="w-full h-auto" />
        </div>
        <div className="flex-1 max-w-md">
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" id="name" type="text" placeholder="Your Name" />
            </div>
            <div>
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="email"
                type="email"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="message"
                rows="4"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ backgroundColor: "#48cae4" }}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
