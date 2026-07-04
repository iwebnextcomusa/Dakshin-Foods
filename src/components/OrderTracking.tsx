import React, { useEffect, useState } from "react";
import { Check, Clock, MapPin, Phone, MessageSquare, Sparkles, AlertCircle } from "lucide-react";
import { OrderDetails } from "../types";

interface OrderTrackingProps {
  order: OrderDetails;
  onOrderCompleted?: () => void;
}

export default function OrderTracking({ order, onOrderCompleted }: OrderTrackingProps) {
  const [currentStep, setCurrentStep] = useState(1); // 0: Placed, 1: Preparing, 2: In Transit, 3: Delivered
  const [truckOffset, setTruckOffset] = useState(20); // CSS left percentage for driver icon on vector road

  const steps = [
    { label: "Order Received", desc: "Dakshin kitchen accepted your order", time: "12:22 PM" },
    { label: "Preparing Fresh", desc: "Chef is baking authentic nan and curry", time: "12:25 PM" },
    { label: "Out for Delivery", desc: "Driver Raman is enroute to your location", time: "12:40 PM" },
    { label: "Delivered", desc: "Enjoy your authentic Indian meal!", time: "12:50 PM" }
  ];

  // Auto-advance delivery status steps in intervals for an immersive live experience!
  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < 3) {
          const next = prev + 1;
          // adjust truck on visual map depending on state
          if (next === 2) setTruckOffset(55);
          if (next === 3) {
            setTruckOffset(90);
            if (onOrderCompleted) onOrderCompleted();
          }
          return next;
        }
        clearInterval(stepTimer);
        return prev;
      });
    }, 15000); // Advance every 15 seconds

    return () => clearInterval(stepTimer);
  }, [onOrderCompleted]);

  // Truck micro-vibrations simulation on map
  const [jitter, setJitter] = useState(0);
  useEffect(() => {
    const jitterTimer = setInterval(() => {
      setJitter((prev) => (prev === 0 ? 1 : 0));
    }, 500);
    return () => clearInterval(jitterTimer);
  }, []);

  return (
    <section className="py-12 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner header */}
        <div className="bg-gradient-to-tr from-emerald-800 to-emerald-600 dark:from-zinc-900 dark:to-zinc-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono tracking-widest text-emerald-200 uppercase font-extrabold bg-emerald-500/10 px-2.5 py-1 rounded-md">
              Order Confirmed & Placed!
            </span>
            <h2 className="text-2xl font-black tracking-tight mt-1">Order #{order.id}</h2>
            <p className="text-zinc-100 text-xs sm:text-sm">
              Thanks for choosing Dakshin Foods INC. Preparing with love!
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-white/10 p-3.5 rounded-2xl backdrop-blur-sm border border-white/10 w-full md:w-auto">
            <Clock size={20} className="text-amber-400 shrink-0 animate-pulse" />
            <div>
              <span className="text-[10px] text-emerald-200 block uppercase font-mono">ESTIMATED ARRIVAL</span>
              <span className="text-lg font-black">{currentStep === 3 ? "Arrived!" : order.eta}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Vector Map Visual */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 rounded-3xl p-6 shadow-sm mb-8 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold text-zinc-400 uppercase">Live Rider Route Tracker</span>
            <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-100 dark:border-emerald-900">
              {currentStep === 1 && "Cooking in Progress"}
              {currentStep === 2 && "Rider Enroute (Metro BC)"}
              {currentStep === 3 && "Arrived at destination!"}
            </span>
          </div>

          {/* Road Visual Box */}
          <div className="h-44 bg-slate-100 dark:bg-zinc-950 rounded-2xl relative overflow-hidden border border-zinc-150 dark:border-zinc-850 flex items-center shadow-inner">
            
            {/* Grid Coordinates markings to make it look premium */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-3 opacity-10 pointer-events-none">
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} className="border-r border-b border-zinc-900 dark:border-white" />
              ))}
            </div>

            {/* Simulated streets lines (BC Grid Layout) */}
            <div className="absolute left-0 right-0 h-10 bg-slate-200 dark:bg-zinc-900" />
            <div className="absolute left-1/4 w-6 top-0 bottom-0 bg-slate-200 dark:bg-zinc-900" />
            <div className="absolute left-2/3 w-6 top-0 bottom-0 bg-slate-200 dark:bg-zinc-900" />

            {/* Dotted center lines for roads */}
            <div className="absolute left-0 right-0 h-0.5 border-t border-dashed border-zinc-400/50 dark:border-zinc-700/50" />

            {/* Kitchen Landmark (left end) */}
            <div className="absolute left-6 flex flex-col items-center z-10">
              <div className="p-2.5 bg-emerald-700 text-white rounded-xl shadow-lg ring-4 ring-emerald-700/10 flex items-center justify-center">
                <span className="font-bold text-xs">Dakshin</span>
              </div>
              <span className="text-[9px] font-mono text-zinc-500 mt-1">Kitchen</span>
            </div>

            {/* Customer Destination Landmark (right end) */}
            <div className="absolute right-6 flex flex-col items-center z-10">
              <div className={`p-2.5 rounded-xl shadow-lg flex items-center justify-center transition-all ${
                currentStep === 3 ? "bg-amber-500 text-white animate-bounce" : "bg-zinc-800 text-zinc-300"
              }`}>
                <MapPin size={15} />
              </div>
              <span className="text-[9px] font-mono text-zinc-500 mt-1">Your Door</span>
            </div>

            {/* Driving Rider Icon (moving) */}
            {currentStep < 3 && (
              <div 
                className="absolute z-20 flex flex-col items-center transition-all duration-1000 ease-out"
                style={{ 
                  left: `${truckOffset}%`, 
                  transform: `translateY(${jitter * 2 - 1}px)` 
                }}
              >
                <div className="px-3 py-1.5 bg-emerald-700 text-white text-xs font-extrabold rounded-lg shadow-md flex items-center space-x-1">
                  <span>🚗</span>
                  <span className="text-[9px] font-mono">RAMAN</span>
                </div>
                <div className="w-2 h-2 bg-emerald-700 rotate-45 -mt-1 shadow" />
              </div>
            )}
          </div>
        </div>

        {/* Step List & Details Block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Progress Steps */}
          <div className="md:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 rounded-3xl p-6 shadow-sm">
            <h3 className="font-extrabold text-zinc-900 dark:text-white text-base mb-6">
              Status Timeline
            </h3>

            <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-3.5 space-y-8">
              {steps.map((step, idx) => {
                const isPassed = idx < currentStep;
                const isCurrent = idx === currentStep;

                return (
                  <div key={idx} className="relative pl-6">
                    {/* Circle Node */}
                    <span className={`absolute -left-2.5 top-1 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      isPassed 
                        ? "bg-emerald-700 border-emerald-700 text-white" 
                        : isCurrent 
                          ? "bg-white dark:bg-zinc-900 border-amber-500 text-amber-500 animate-pulse" 
                          : "bg-white dark:bg-zinc-900 border-zinc-300 text-zinc-400"
                    }`}>
                      {isPassed ? (
                        <Check size={11} strokeWidth={3} />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                      )}
                    </span>

                    {/* Step copy */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-sm font-bold ${
                          isPassed || isCurrent ? "text-zinc-900 dark:text-white" : "text-zinc-400"
                        }`}>
                          {step.label}
                        </h4>
                        <span className="text-[10px] font-mono text-zinc-400">{step.time}</span>
                      </div>
                      <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Driver Details & Support */}
          <div className="md:col-span-5 space-y-6">
            
            {/* Driver Profile */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center">
              <div className="relative">
                <div className="h-16 w-16 bg-gradient-to-tr from-emerald-100 to-emerald-50 rounded-full flex items-center justify-center text-2xl border border-emerald-200">
                  👨‍✈️
                </div>
                <span className="absolute bottom-0 right-0 h-4 w-4 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center" title="Online">
                  <Check size={8} className="text-white" />
                </span>
              </div>

              <h4 className="font-extrabold text-zinc-900 dark:text-white text-base mt-3">Ramanpreet Singh</h4>
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Dakshin Delivery Rider</span>
              
              <div className="flex items-center space-x-1 text-amber-500 font-bold text-xs mt-1 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded border border-amber-500/10">
                <span>⭐ 4.9 Rating</span>
              </div>

              {/* Action grid */}
              <div className="grid grid-cols-2 gap-3 w-full mt-6">
                <a 
                  href="tel:+17782888261"
                  className="py-2 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Phone size={13} />
                  <span>Call Rider</span>
                </a>

                <button 
                  onClick={() => alert("Simulated Live Chat with Ramanpreet: 'I am currently driving down Robson St, estimated arrival is 15 minutes.'")}
                  className="py-2 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <MessageSquare size={13} />
                  <span>Message</span>
                </button>
              </div>
            </div>

            {/* Need Help contact */}
            <div className="bg-amber-500/5 dark:bg-zinc-900 border border-amber-500/10 dark:border-zinc-800 p-5 rounded-3xl">
              <div className="flex items-start space-x-3">
                <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={18} />
                <div className="text-xs">
                  <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Need Immediate Assistance?</h4>
                  <p className="text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                    Have any questions or instructions regarding this delivery order? Call our BC central dispatcher desk immediately:
                  </p>
                  <a href="tel:+17782888261" className="text-emerald-700 dark:text-emerald-400 font-bold block mt-2 hover:underline">
                    +1 (778) 288-8261
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
