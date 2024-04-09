import React, { useState } from "react";
import "./tailwind.css";

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border w-full">
      <div
        className="flex justify-between p-4 cursor-pointer bg-slate-200 hover:bg-gray-300 transition duration-[0.5s] ease-in-out"
        onClick={toggleAccordion}
      >
        <div className="font-semibold">{title}</div>
        <div>{isOpen ? "-" : "+"}</div>
      </div>
      {isOpen && <div className="p-4 bg-white overflow-hidden">{children}</div>}
    </div>
  );
};

export default Accordion;
