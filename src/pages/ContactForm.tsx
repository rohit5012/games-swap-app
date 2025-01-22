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
        console.log(result.text);
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
        console.log(error.text);
        Swal.fire({
          icon: "error",
          title: "Ooops, something went wrong",
          text: error.text,
        });
      }
    );
  };

  return (
    <div
      className="flex flex-col items-center w-full pb-16 md:pb-20 "
      style={{ backgroundColor: "#342543" }}
    >
      <div className="w-full my-4 md:mb-28">
        <h2 className="text-3xl md:text-4xl font-bold my-10 md:mt-10 text-center text-white">
          Contact Us
        </h2>
        <i
          className="whitespace-nowrap marquee text-lg md:text-2xl"
          style={{ color: "#48cae4" }}
        >
          Your feedback matters, Drop Us a line and we will get back to you!
        </i>
      </div>

      <div className="flex flex-col md:flex-row gap-2 md:gap-20 justify-center items-center w-full">
        <div className="flex-1 max-w-md">
          <img src={Pic} className="h-96 w-96 bg-cover bg-center"></img>
        </div>
        <div className="flex-1 max-w-md w-3/4">
          <form onClick={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="name"
                type="text"
                placeholder="Your Name"
              />
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
