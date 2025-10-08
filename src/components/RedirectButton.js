"use client";  // Marking this component as a Client Component

import React from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa"; // Importing the right arrow icon from react-icons

const RedirectButton = () => (
  <div className="flex justify-center mb-6">
    <div className="w-full max-w-3xl">
      <Link href="/" passHref>
        <button className="redirect-button">
          Check Currency Strength Meter &nbsp;
          <FaArrowRight className="arrow-icon" />
        </button>
      </Link>
    </div>
    <style jsx>{`
      .redirect-button {
        width: 100%;
        height: 30px;
        max-width: 800px; /* Reduce the width */
        background-color: transparent; /* Set background to transparent */
        color: #38a169; /* Text color green */
        font-size: 1.25rem;
        font-weight: bold;
        padding: 1.5rem 2rem; /* Padding */
        border: 2px solid #38a169; /* Green border */
        border-radius: 12px; /* Rounded corners */
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: transform 0.3s ease, background-color 0.3s ease, border 0.3s ease;
        position: relative;
      }

      /* Hover effects */
      .redirect-button:hover {
        background-color: #38a169; /* Green background on hover */
        color: white; /* White text when hovered */
        border-color: #2f855a; /* Darker green border on hover */
        transform: scale(1.05); /* Slight scale effect */
      }

      /* Arrow animation */
      .arrow-icon {
        margin-left: 1rem; /* Space between the text and the arrow */
        transition: transform 0.3s ease, margin-left 0.3s ease;
      }

      /* Hover state for the arrow */
      .redirect-button:hover .arrow-icon {
        transform: translateX(10px); /* Moves the arrow to the right on hover */
        margin-left: 1.5rem; /* Adjust margin to keep the arrow aligned */
      }
    `}</style>
  </div>
);

export default RedirectButton;
