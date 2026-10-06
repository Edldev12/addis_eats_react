import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerSignIn.css";

function CustomerSignIn() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    // Validate name
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    // Validate Ethiopian phone number
    const phoneRegex = /^(?:\+251|0)9\d{8}$/;

    if (!phoneRegex.test(phone.trim())) {
      setError("Enter a valid Ethiopian phone number.");
      return;
    }

    // Create customer
    const customer = {
      name: name.trim(),
      phone: phone.trim(),
    };

    // Save customer
    sessionStorage.setItem(
      "addisEats_customer",
      JSON.stringify(customer)
    );

    setError("");

    // Go to checkout
    navigate("/checkout");
  }

  return (
    <section className="customer-signin-page">
      <div className="customer-signin">

        <h1>Welcome to Addis Eats</h1>

        <p>
          Sign in to continue with your order.
        </p>

        <form onSubmit={handleSubmit}>

          {error && (
            <p className="customer-signin-error">
              {error}
            </p>
          )}

          <label>
            Name

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Enter your name"
            />
          </label>

          <label>
            Phone Number

            <input
              type="tel"
              value={phone}
              onChange={(event) =>
                setPhone(event.target.value)
              }
              placeholder="09xxxxxxxx"
            />
          </label>

          <button type="submit">
            Sign In
          </button>

        </form>
      </div>
    </section>
  );
}

export default CustomerSignIn;
