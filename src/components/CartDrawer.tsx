import React, { useState } from "react";
import { X, ShoppingBag, Plus, Minus, Trash2, Ticket, Percent } from "lucide-react";
import { CartItem } from "../types";
import { COUPONS } from "../data";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: (discountAmt: number, couponCode: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");

  if (!isOpen) return null;

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  
  // Coupon logic
  const handleApplyCoupon = () => {
    setCouponError("");
    const normalizedCode = couponCode.trim().toUpperCase();
    if (COUPONS[normalizedCode] !== undefined) {
      setAppliedCoupon(normalizedCode);
      setDiscountPercent(COUPONS[normalizedCode]);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code.");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscountPercent(0);
    setCouponCode("");
  };

  const discountAmount = appliedCoupon ? (subtotal * discountPercent) : 0;
  const deliveryFee = subtotal > 0 ? 3.99 : 0;
  
  // BC Taxes: Combined GST 5% & PST 7% = 12% on food and delivery
  const taxRate = 0.12; 
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxes = taxableAmount * taxRate;
  
  const total = taxableAmount + taxes + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      {/* Click Outside Overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md h-full bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right-16 duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-zinc-150 dark:border-zinc-850 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-zinc-900 dark:text-white">
            <ShoppingBag size={20} className="text-emerald-700 dark:text-emerald-400" />
            <h3 className="text-lg font-bold">Your Order Bag</h3>
            <span className="text-xs font-mono text-zinc-400">({cartItems.length} items)</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.menuItem.id}
                  className="flex items-center justify-between space-x-3 p-3 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-150 dark:border-zinc-850 rounded-2xl"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    referrerPolicy="no-referrer"
                    className="h-14 w-14 rounded-xl object-cover border border-zinc-100 dark:border-zinc-800 shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-100 truncate">
                      {item.menuItem.name}
                    </h4>
                    <span className="text-[10px] font-mono tracking-widest text-zinc-400 block mt-0.5">
                      ${item.menuItem.price.toFixed(2)} each
                    </span>
                    <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 mt-1 block">
                      ${(item.menuItem.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end space-y-1.5">
                    {/* Delete button */}
                    <button
                      onClick={() => onRemoveItem(item.menuItem.id)}
                      className="text-zinc-400 hover:text-rose-600 p-1 transition-colors rounded"
                      title="Remove item"
                    >
                      <Trash2 size={13} />
                    </button>

                    {/* Qty pickers */}
                    <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-950 p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity - 1)}
                        className="p-1 rounded text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={11} />
                      </button>
                      <span className="w-5 text-center text-[11px] font-bold text-zinc-800 dark:text-zinc-200">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity + 1)}
                        className="p-1 rounded text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer"
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4 border border-emerald-100 dark:border-emerald-900/50">
                <ShoppingBag size={24} />
              </div>
              <h4 className="font-extrabold text-zinc-900 dark:text-white text-sm">Your order bag is empty</h4>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-2 max-w-xs mx-auto">
                Head over to our Menu page to select fresh meals from Dakshin Foods!
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-semibold hover:bg-emerald-600 transition-all cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer Calculations */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-zinc-150 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-950/80 space-y-5">
            {/* Promo code field */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-bold block">
                HAVE A PROMO CODE?
              </span>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs font-medium text-emerald-800 dark:text-emerald-400">
                  <div className="flex items-center space-x-1.5">
                    <Percent size={14} />
                    <span>Coupon <strong>{appliedCoupon}</strong> Applied ({discountPercent * 100}% Off)</span>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-zinc-500 hover:text-rose-600 font-bold px-1.5 py-0.5 rounded transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
                    <input
                      type="text"
                      placeholder="e.g. DAKSHIN10, BCEATS"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-zinc-800 dark:text-zinc-100 uppercase"
                    />
                  </div>
                  <button
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              )}
              {couponError && <p className="text-[10px] text-rose-500 font-semibold">{couponError}</p>}
            </div>

            {/* Calculations lines */}
            <div className="space-y-2 text-xs border-y border-zinc-200/50 dark:border-zinc-800/50 py-3.5">
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>Coupon Discount ({discountPercent * 100}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span className="flex items-center space-x-1" title="Combined BC GST 5% + PST 7%">
                  <span>BC Tax (12%)</span>
                  <span className="text-[9px] font-mono bg-zinc-100 dark:bg-zinc-900 px-1 py-0.5 rounded text-zinc-400">GST+PST</span>
                </span>
                <span>${taxes.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-zinc-900 dark:text-white font-black text-sm pt-2">
                <span>Total Amount</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <div className="space-y-2">
              <button
                onClick={() => onCheckout(discountAmount, appliedCoupon || "")}
                className="w-full py-3 bg-gradient-to-tr from-emerald-800 to-emerald-600 text-white font-extrabold uppercase tracking-wider rounded-xl text-xs shadow-md shadow-emerald-800/10 hover:shadow-lg hover:shadow-emerald-800/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <span>${total.toFixed(2)}</span>
              </button>
              
              <div className="text-center">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">
                  EST. DELIVERY TIME: 30 - 45 MINS IN BC
                </span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
