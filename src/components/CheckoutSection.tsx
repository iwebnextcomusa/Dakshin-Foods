import React, { useState } from "react";
import { CreditCard, MapPin, Phone, Mail, User, ShieldCheck, ChevronLeft, CalendarClock, ShoppingBag } from "lucide-react";
import { CartItem, OrderDetails } from "../types";

interface CheckoutSectionProps {
  cartItems: CartItem[];
  discountAmount: number;
  couponCode: string;
  onPlaceOrder: (details: OrderDetails) => void;
  onBackToCart: () => void;
  savedProfile?: { name: string; email: string; phone: string; address?: string };
}

export default function CheckoutSection({
  cartItems,
  discountAmount,
  couponCode,
  onPlaceOrder,
  onBackToCart,
  savedProfile
}: CheckoutSectionProps) {
  // Recipient form state
  const [name, setName] = useState(savedProfile?.name || "");
  const [email, setEmail] = useState(savedProfile?.email || "");
  const [phone, setPhone] = useState(savedProfile?.phone || "");
  const [address, setAddress] = useState(savedProfile?.address || "");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "gpay" | "cod">("card");

  // Credit card inputs if paymentMethod is card
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [field: string]: string }>({});

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 3.99 : 0;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxes = taxableAmount * 0.12; // BC tax GST (5%) + PST (7%)
  const total = taxableAmount + taxes + deliveryFee;

  const validateForm = () => {
    const errors: { [field: string]: string } = {};
    if (!name.trim()) errors.name = "Full name is required.";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errors.email = "A valid email is required.";
    if (!phone.trim() || phone.length < 8) errors.phone = "A valid contact number is required.";
    if (!address.trim()) errors.address = "Delivery address is required.";

    if (paymentMethod === "card") {
      if (!cardNumber.trim() || cardNumber.length < 12) errors.cardNumber = "Valid card number required.";
      if (!cardExpiry.trim()) errors.cardExpiry = "Expiry date required.";
      if (!cardCVC.trim() || cardCVC.length < 3) errors.cardCVC = "CVC required.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate authentic API cooking delay
    setTimeout(() => {
      const orderDetails: OrderDetails = {
        id: `DKS-${Math.floor(100000 + Math.random() * 900000)}`,
        items: cartItems,
        subtotal,
        discount: discountAmount,
        tax: taxes,
        deliveryFee,
        total,
        status: "Preparing",
        deliveryAddress: address,
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        eta: "30-40 mins",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setIsSubmitting(false);
      onPlaceOrder(orderDetails);
    }, 2000);
  };

  return (
    <section className="py-12 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={onBackToCart}
          className="flex items-center space-x-1.5 text-zinc-500 hover:text-zinc-850 dark:hover:text-zinc-200 text-xs font-semibold mb-6 transition-colors cursor-pointer"
        >
          <ChevronLeft size={16} />
          <span>Back to Menu</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form Side */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mb-6">
              Delivery & Payment Details
            </h2>

            <form onSubmit={handlePlaceOrderSubmit} className="space-y-6">
              
              {/* Contact Info Group */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono tracking-widest text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                  1. Recipient Details
                </h3>

                {/* Recipient Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                      <input
                        type="text"
                        placeholder="Aman Preet"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full pl-10 pr-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-950 border rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-zinc-800 dark:text-zinc-100 ${
                          formErrors.name ? "border-rose-500" : "border-zinc-200 dark:border-zinc-800"
                        }`}
                      />
                    </div>
                    {formErrors.name && <p className="text-[10px] text-rose-500 font-semibold">{formErrors.name}</p>}
                  </div>

                  {/* Recipient Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                      <input
                        type="tel"
                        placeholder="+1 (778) 288-8261"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`w-full pl-10 pr-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-950 border rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-zinc-800 dark:text-zinc-100 ${
                          formErrors.phone ? "border-rose-500" : "border-zinc-200 dark:border-zinc-800"
                        }`}
                      />
                    </div>
                    {formErrors.phone && <p className="text-[10px] text-rose-500 font-semibold">{formErrors.phone}</p>}
                  </div>
                </div>

                {/* Recipient Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                    <input
                      type="email"
                      placeholder="aman@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-10 pr-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-950 border rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-zinc-800 dark:text-zinc-100 ${
                        formErrors.email ? "border-rose-500" : "border-zinc-200 dark:border-zinc-800"
                      }`}
                    />
                  </div>
                  {formErrors.email && <p className="text-[10px] text-rose-500 font-semibold">{formErrors.email}</p>}
                </div>
              </div>

              {/* Delivery Address Group */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-mono tracking-widest text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                  2. BC Delivery Address
                </h3>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Street Address & City</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                    <input
                      type="text"
                      placeholder="e.g. 1024 Robson St, Vancouver, BC"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={`w-full pl-10 pr-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-950 border rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-zinc-800 dark:text-zinc-100 ${
                        formErrors.address ? "border-rose-500" : "border-zinc-200 dark:border-zinc-800"
                      }`}
                    />
                  </div>
                  {formErrors.address && <p className="text-[10px] text-rose-500 font-semibold">{formErrors.address}</p>}
                </div>

                {/* Drop-off Instructions */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Drop-off / Buzzer Instructions (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="Buzzer 402, please leave on the porch"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-zinc-800 dark:text-zinc-100"
                  />
                </div>
              </div>

              {/* Payment Methods Group */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-mono tracking-widest text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                  3. Secure Payment Method
                </h3>

                {/* Method selector buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`py-3 px-2 text-center rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                      paymentMethod === "card"
                        ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-700 dark:text-emerald-400"
                        : "bg-zinc-50 dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100"
                    }`}
                  >
                    <CreditCard size={16} />
                    <span>Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("gpay")}
                    className={`py-3 px-2 text-center rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                      paymentMethod === "gpay"
                        ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-700 dark:text-emerald-400"
                        : "bg-zinc-50 dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100"
                    }`}
                  >
                    <ShoppingBag size={16} />
                    <span>Mobile Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`py-3 px-2 text-center rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                      paymentMethod === "cod"
                        ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-700 dark:text-emerald-400"
                        : "bg-zinc-50 dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100"
                    }`}
                  >
                    <CalendarClock size={16} />
                    <span>Cash / Debit</span>
                  </button>
                </div>

                {/* Card Inputs */}
                {paymentMethod === "card" && (
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-3 animate-in fade-in duration-300">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-zinc-400">CARD NUMBER</label>
                      <input
                        type="text"
                        placeholder="4500 1234 5678 9012"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        maxLength={16}
                        className={`w-full px-3 py-2 text-xs bg-white dark:bg-zinc-900 border rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-zinc-850 dark:text-zinc-150 ${
                          formErrors.cardNumber ? "border-rose-500" : "border-zinc-200 dark:border-zinc-800"
                        }`}
                      />
                      {formErrors.cardNumber && <p className="text-[10px] text-rose-500 font-semibold">{formErrors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-zinc-400">EXPIRY DATE</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          maxLength={5}
                          className={`w-full px-3 py-2 text-xs bg-white dark:bg-zinc-900 border rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-zinc-850 dark:text-zinc-150 ${
                            formErrors.cardExpiry ? "border-rose-500" : "border-zinc-200 dark:border-zinc-800"
                          }`}
                        />
                        {formErrors.cardExpiry && <p className="text-[10px] text-rose-500 font-semibold">{formErrors.cardExpiry}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-zinc-400">CVC</label>
                        <input
                          type="password"
                          placeholder="***"
                          value={cardCVC}
                          onChange={(e) => setCardCVC(e.target.value)}
                          maxLength={3}
                          className={`w-full px-3 py-2 text-xs bg-white dark:bg-zinc-900 border rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-zinc-850 dark:text-zinc-150 ${
                            formErrors.cardCVC ? "border-rose-500" : "border-zinc-200 dark:border-zinc-800"
                          }`}
                        />
                        {formErrors.cardCVC && <p className="text-[10px] text-rose-500 font-semibold">{formErrors.cardCVC}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Google Pay simulation details */}
                {paymentMethod === "gpay" && (
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-center space-y-2 animate-in fade-in duration-300">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">MOBILE WALLET INTEGRATION</span>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Secure verification will prompt when you click "Place Order". Fully compliant with Google Pay & Apple Pay standard sandboxes.
                    </p>
                  </div>
                )}

                {/* Cash on delivery simulation */}
                {paymentMethod === "cod" && (
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-center space-y-2 animate-in fade-in duration-300">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold">CASH / CARD ON ARRIVAL</span>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Pay the delivery rider via cash, mobile Tap, or debit machine when they arrive at your door.
                    </p>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-tr from-emerald-800 to-emerald-600 text-white font-extrabold uppercase tracking-wider rounded-xl text-xs shadow-md shadow-emerald-800/10 hover:shadow-lg hover:shadow-emerald-800/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Transacting Securely...</span>
                    </div>
                  ) : (
                    <>
                      <ShieldCheck size={16} />
                      <span>Place Delivery Order (${total.toFixed(2)})</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* Cart Summary Side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
              <h3 className="font-extrabold text-zinc-900 dark:text-white text-base mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                Order Summary
              </h3>

              {/* Itemized List */}
              <div className="space-y-3 max-h-60 overflow-y-auto mb-5 pr-2">
                {cartItems.map((item) => (
                  <div key={item.menuItem.id} className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2 min-w-0">
                      <span className="text-xs font-mono font-bold bg-zinc-100 dark:bg-zinc-950 px-2 py-1 rounded text-zinc-600 dark:text-zinc-400">
                        {item.quantity}x
                      </span>
                      <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                        {item.menuItem.name}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                      ${(item.menuItem.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculations breakdown */}
              <div className="space-y-2 text-xs border-t border-zinc-100 dark:border-zinc-800 pt-4">
                <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Coupon Discount {couponCode && `(${couponCode})`}</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                  <span>British Columbia Tax (12%)</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-zinc-900 dark:text-white font-black text-sm pt-3 border-t border-zinc-100 dark:border-zinc-800 mt-2">
                  <span>Total Amount</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Safety badge */}
            <div className="bg-emerald-50 dark:bg-zinc-900 border border-emerald-100 dark:border-zinc-800 p-4 rounded-2xl flex items-start space-x-3">
              <ShieldCheck className="text-emerald-600 shrink-0 mt-0.5" size={18} />
              <div className="text-xs">
                <h4 className="font-bold text-emerald-800 dark:text-emerald-400">Guaranteed Hygiene & Security</h4>
                <p className="text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                  Dakshin Foods INC is certified under BC health regulations. All food is delivered in heat-insulated, tamper-proof security packages.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
