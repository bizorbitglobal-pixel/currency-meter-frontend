"use client";

import React, { useState, useEffect } from "react";

const TagsList = ({ tags }) => {
    const [isClient, setIsClient] = useState(false);
    const [activeTag, setActiveTag] = useState(null); // Track which tag is clicked

    useEffect(() => {
        setIsClient(true); // Only run on client-side
    }, []);

    // Scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Smooth scrolling effect
        });
    };

    // Handle tag click: highlight the tag and scroll to top
    const handleTagClick = (tag) => {
        setActiveTag(tag); // Set the clicked tag as active
        scrollToTop(); // Scroll to top
    };

    if (!tags || tags.length === 0) {
        return <div className="text-center p-4 text-lg">No tags available.</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Currency Strength Meter Tags</h2>
            {tags.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className={`px-3 py-1 text-sm rounded-full border ${
                                activeTag === tag
                                    ? "bg-blue-500 text-white border-blue-500"
                                    : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                            } cursor-pointer transition-all duration-300 ease-in-out`}
                            onClick={() => handleTagClick(tag)} // Handle click event
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TagsList;
