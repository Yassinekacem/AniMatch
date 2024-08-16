"use client"
import React, { useState } from 'react';
import { Star } from 'lucide-react'; // Assuming you're using lucide-react for icons

interface StarRatingProps {
  initialRating?: number; // Optional initial rating
  onRatingChange?: (rating: number) => void; // Optional callback function for rating change
}

const StarRating = ({ initialRating = 0, onRatingChange }: StarRatingProps) => {
  const [rating, setRating] = useState(initialRating);

  const handleRating = (newRating: number) => {
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div className="flex items-center">
      {/* Render 5 stars */}
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-6 h-6 cursor-pointer ${
            index < rating ? 'text-yellow-500' : 'text-gray-300'
          }`}
          fill={index < rating ? '#F59E0B' : 'none'}
          onClick={() => handleRating(index + 1)} // Handle click to set the rating
        />
      ))}
      {/* Display the rating number */}
      <span className="ml-2 text-lg text-gray-700">{rating}/5</span>
    </div>
  );
};

export default StarRating;
