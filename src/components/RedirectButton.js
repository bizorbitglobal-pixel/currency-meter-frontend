"use client"; // Marking this component as a Client Component

import React from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa"; // Importing the right arrow icon

const RedirectButton = () => (
  <div className="flex justify-center mb-6 px-4">
    <div className="w-full max-w-3xl">
      <Link href="/" passHref>
        <button className="redirect-button">
          Check Currency Strength Meter&nbsp;
          <FaArrowRight className="arrow-icon" />
        </button>
      </Link>
    </div>

    {/* Responsive Styles */}
    <style jsx>{`
      .redirect-button {
        width: 100%;
        max-width: 800px;
        background-color: transparent;
        color: #2563eb; /* Blue text */
        font-size: 1.25rem;
        font-weight: bold;
        padding: 1.5rem 2rem;
        border: 2px solid #2563eb; /* Blue border */
        border-radius: 12px;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: transform 0.3s ease, background-color 0.3s ease,
          border 0.3s ease;
        position: relative;
        text-align: center;
      }

      /* Hover effects */
      .redirect-button:hover {
        background-color: #2563eb; /* Blue background */
        color: white; /* White text when hovered */
        border-color: #1e40af; /* Darker blue border */
        transform: scale(1.05);
      }

      /* Arrow animation */
      .arrow-icon {
        margin-left: 1rem;
        transition: transform 0.3s ease, margin-left 0.3s ease;
      }

      .redirect-button:hover .arrow-icon {
        transform: translateX(10px);
        margin-left: 1.5rem;
      }

      /* ----------------- Responsive Styling ----------------- */

      /* Medium screens (tablets) */
      @media (max-width: 768px) {
        .redirect-button {
          font-size: 1.1rem;
          padding: 1.25rem 1.75rem;
          border-radius: 10px;
        }

        .arrow-icon {
          margin-left: 0.75rem;
        }

        .redirect-button:hover .arrow-icon {
          transform: translateX(8px);
          margin-left: 1.25rem;
        }
      }

      /* Small screens (mobile phones) */
      @media (max-width: 480px) {
        .redirect-button {
          font-size: 1rem;
          padding: 1rem 1.25rem;
          border-radius: 8px;
          height: auto;
          line-height: 1.4;
        }

        .arrow-icon {
          margin-left: 0.5rem;
        }

        .redirect-button:hover .arrow-icon {
          transform: translateX(6px);
          margin-left: 1rem;
        }
      }
    `}</style>
  </div>
);

export default RedirectButton;
