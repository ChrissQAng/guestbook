import { useEffect, useState } from "react";
import "./Homepage.css";

const Homepage = () => {
  // usestates for inputs
  const [firstName, setFirstName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [completeGB, setCompleteGB] = useState([]);

  //   fetch complete guestbook
  useEffect(() => {
    fetch("http://localhost:3004/api/v1/guestbook", { method: "GET" })
      .then((res) => res.json())
      .then((data) => setCompleteGB(data))
      .catch((err) => console.log(err));
  }, []);

  const addEntry = (event) => {
    event.preventDefault();
    if (name.length <= 0 || firstName.length <= 0 || email.length <= 0) {
      alert("Please fill in valid informations!");
    }
    const newEntry = {
      firstName: firstName,
      name: name,
      email: email,
      message: message,
    };
    fetch("http://localhost:3004/api/v1/guestbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEntry),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data !== Array) {
          console.log("No array - it´s an object!");
          return;
        }
        setCompleteGB(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <h1>GUESTBOOK</h1>
      <form>
        <input
          type="text"
          placeholder="First-name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last-name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={addEntry}>SUBMIT</button>
      </form>
      <section>
        {completeGB.map((item, index) => (
          <article key={index}>
            <p>
              <span>{item.firstName}</span> {item.email}
            </p>
            <p>writes:</p>

            <p>{item.message}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Homepage;
