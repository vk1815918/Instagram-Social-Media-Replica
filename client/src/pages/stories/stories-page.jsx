// src/StoriesList.js
import React, { useState } from "react";

const dummyStories = [
  {
    id: 1,
    mediaUrl: "https://via.placeholder.com/300",
    caption: "Story 1",
  },
  {
    id: 2,
    mediaUrl: "https://via.placeholder.com/300",
    caption: "Story 2",
  },
  {
    id: 3,
    mediaUrl: "https://via.placeholder.com/300",
    caption: "Story 3",
  },
];

const StoriesList = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const handleNextStory = () => {
    if (currentStoryIndex < dummyStories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    }
  };

  const handlePreviousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen relative overflow-hidden bg-black text-white bg-red">
      {dummyStories.map((story, index) => (
        <div
          key={story.id}
          className={`absolute w-full h-full flex justify-center items-center transition-opacity duration-500 ${
            index === currentStoryIndex
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={(e) => {
            if (e.clientX > window.innerWidth / 2) {
              handleNextStory();
            } else {
              handlePreviousStory();
            }
          }}
          onTouchStart={(e) => {
            if (e.touches[0].clientX > window.innerWidth / 2) {
              handleNextStory();
            } else {
              handlePreviousStory();
            }
          }}
        >
          <div className="max-w-md bg-white rounded-lg overflow-hidden shadow-lg">
            <img src={story.mediaUrl} alt={story.caption} className="w-full" />
            <div className="p-4">
              <p className="text-black">{story.caption}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoriesList;
