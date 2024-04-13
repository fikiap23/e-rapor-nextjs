import React, { useState } from "react";
import "./tailwind.css";

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-collapse w-full transition duration-[0.5s]">
      <div
        className="flex justify-between p-4 cursor-pointer bg-kedua/50 backdrop-blur-2xl transition duration-[0.5s] ease-in-out"
        onClick={toggleAccordion}
      >
        <div className="font-semibold">{title}</div>
        <div>{isOpen ? "-" : "+"}</div>
      </div>
      {isOpen && (
        <div className="p-4 bg-white transition duration-[0.5s] overflow-hidden">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
