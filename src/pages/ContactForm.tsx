import emailjs from "emailjs-com";
import { useState } from "react";
import Swal from "sweetalert2";
import Pic from "../assets/pic1.jpg";

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
      className="min-h-screen flex flex-col md:flex-row p-4 md:ml-4 md:mr-4"
      style={{ backgroundColor: "#342543" }}
    >
      <div className="container mx-auto flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex justify-center items-center p-8 md:p-0">
          <div
            className="h-96 w-96 bg-cover bg-center"
            style={{ backgroundImage: `url(${Pic})` }}
          ></div>
        </div>

        <div className="w-full md:w-3/4 flex justify-center items-center p-4 md:p-0'">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800 p-8 md:p-16 rounded-lg w-full max-w-lg mx-auto"
            style={{ backgroundImage: `url(${Pic})` }}
          >
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-3 py-2 text-gray-900 rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-3 py-2 text-gray-900 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="subject"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                className="w-full px-3 py-2 text-gray-900 rounded-md"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                className="w-full px-3 py-2 text-gray-900 rounded-md"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black-500  text-white font-bold py-2 px-4 rounded-md"
              style={{ backgroundColor: "#48cae4" }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ContactForm;
