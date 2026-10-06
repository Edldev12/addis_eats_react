import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartStore } from "../../Store/cartStore";
import { formatCurrency } from "../../utils/formatCurrency";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const savedCustomer = JSON.parse(
    sessionStorage.getItem("addisEats_customer") || "null"
  );

  /* ========================================
     FORM
  ======================================== */

  const [form, setForm] = useState({
    name: savedCustomer?.name || "",
    phone: savedCustomer?.phone || "",
    address: "",
    area: "",
    instructions: "",
  });

  const [errors, setErrors] = useState({});

  /* ========================================
     REDIRECT IF NOT SIGNED IN
  ======================================== */

  useEffect(() => {
    if (!savedCustomer) {
      navigate("/signin");
    }
  }, [navigate, savedCustomer]);

  /* ========================================
     SUBTOTAL
  ======================================== */

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ========================================
     DELIVERY FEE
  ======================================== */

  const deliveryFee =
    form.area === "Addis Ababa" ? 50 : 100;

  /* ========================================
     ESTIMATED DELIVERY
  ======================================== */

  const estimatedDelivery =
    form.area === "Addis Ababa"
      ? "30–45 minutes"
      : "45–60 minutes";

  /* ========================================
     GRAND TOTAL
  ======================================== */

  const grandTotal = subtotal + deliveryFee;

  /* ========================================
     HANDLE INPUT
  ======================================== */

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  }

  /* ========================================
     VALIDATION
  ======================================== */

  function validateForm() {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    /*
      Ethiopian phone numbers:
      0912345678
      +251912345678
    */

    const phoneRegex = /^(?:\+251|0)9\d{8}$/;

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(form.phone.trim())) {
      newErrors.phone =
        "Enter a valid Ethiopian phone number.";
    }

    if (!form.area) {
      newErrors.area = "Delivery area is required.";
    }

    if (!form.address.trim()) {
      newErrors.address =
        "Delivery address is required.";
    }

    return newErrors;
  }

  /* ========================================
     PLACE ORDER
  ======================================== */

  function handleSubmit(event) {
    event.preventDefault();

    if (cart.length === 0) {
      navigate("/menu");
      return;
    }

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const order = {
      id: Date.now(),

      customer: {
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        area: form.area,
        instructions: form.instructions.trim(),
      },

      items: cart,

      subtotal,

      deliveryFee,

      estimatedDelivery,

      total: grandTotal,

      status: "Pending",

      createdAt: new Date().toISOString(),
    };

    /* ========================================
       SAVE ORDER
    ======================================== */

    const existingOrders = JSON.parse(
      localStorage.getItem("addisEats_orders") || "[]"
    );

    localStorage.setItem(
      "addisEats_orders",
      JSON.stringify([
        ...existingOrders,
        order,
      ])
    );

    /* ========================================
       CLEAR CART
    ======================================== */

    clearCart();

    /* ========================================
       GO TO CONFIRMATION
    ======================================== */

    navigate("/order-confirmation");
  }

  /* ========================================
     EMPTY CART
  ======================================== */

  if (cart.length === 0) {
    return (
      <section className="checkout-page">
        <div className="checkout-empty">
          <h2>Your cart is empty</h2>

          <p>
            Add some dishes before checking out.
          </p>

          <Link
            to="/menu"
            className="checkout-menu-btn"
          >
            Browse Menu
          </Link>
        </div>
      </section>
    );
  }

  /* ========================================
     CHECKOUT PAGE
  ======================================== */

  return (
    <section className="checkout-page">
      <div className="checkout-container">

        {/* HEADER */}

        <div className="checkout-header">
          <span>CHECKOUT</span>

          <h1>Complete Your Order</h1>

          <p>
            Enter your delivery information below.
          </p>
        </div>

        {/* CONTENT */}

        <div className="checkout-content">

          {/* FORM */}

          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >
            <h2>Delivery Information</h2>

            {/* NAME */}

            <label>
              Full Name

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />

              {errors.name && (
                <small className="checkout-error">
                  {errors.name}
                </small>
              )}
            </label>

            {/* PHONE */}

            <label>
              Phone Number

              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="09xxxxxxxx"
              />

              {errors.phone && (
                <small className="checkout-error">
                  {errors.phone}
                </small>
              )}
            </label>

            {/* AREA */}

            <label>
              Delivery Area

              <select
                name="area"
                value={form.area}
                onChange={handleChange}
              >
                <option value="">
                  Select delivery area
                </option>

                <option value="Addis Ababa">
                  Addis Ababa
                </option>

                <option value="Other">
                  Other Area
                </option>
              </select>

              {errors.area && (
                <small className="checkout-error">
                  {errors.area}
                </small>
              )}
            </label>

            {/* ADDRESS */}

            <label>
              Delivery Address

              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter your delivery address"
                rows="4"
              />

              {errors.address && (
                <small className="checkout-error">
                  {errors.address}
                </small>
              )}
            </label>

            {/* SPECIAL INSTRUCTIONS */}

            <label>
              Special Instructions

              <textarea
                name="instructions"
                value={form.instructions}
                onChange={handleChange}
                placeholder="Any special instructions for your order..."
                rows="4"
              />
            </label>

            {/* BUTTON */}

            <button
              type="submit"
              className="place-order-btn"
            >
              Place Order
            </button>
          </form>

          {/* ORDER SUMMARY */}

          <aside className="checkout-summary">
            <h2>Order Summary</h2>

            {/* ITEMS */}

            {cart.map((item) => (
              <div
                className="checkout-item"
                key={item.id}
              >
                <span>
                  {item.name} × {item.quantity}
                </span>

                <strong>
                  {formatCurrency(
                    item.price * item.quantity
                  )}
                </strong>
              </div>
            ))}

            <div className="checkout-divider" />

            {/* SUBTOTAL */}

            <div className="checkout-summary-row">
              <span>Subtotal</span>

              <strong>
                {formatCurrency(subtotal)}
              </strong>
            </div>

            {/* DELIVERY FEE */}

            <div className="checkout-summary-row">
              <span>Delivery Fee</span>

              <strong>
                {formatCurrency(deliveryFee)}
              </strong>
            </div>

            {/* ESTIMATED DELIVERY */}

            <div className="checkout-summary-row">
              <span>Estimated Delivery</span>

              <strong>
                {estimatedDelivery}
              </strong>
            </div>

            <div className="checkout-divider" />

            {/* GRAND TOTAL */}

            <div className="checkout-total">
              <span>Total</span>

              <strong>
                {formatCurrency(grandTotal)}
              </strong>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}

export default Checkout;
