import React from 'react';
import { Star } from 'lucide-react'; // Assuming you're using lucide-react for icons

interface StarRatingProps {
  rating: number; // The rating out of 5
}

const Stars: React.FC<StarRatingProps> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {/* Render 5 stars */}
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-6 h-6 ${
            index < rating ? 'text-yellow-500' : 'text-gray-300'
          }`}
          fill={index < rating ? '#F59E0B' : 'none'} // Fill the stars if they are active
        />
      ))}
      {/* Display the rating number */}
      <span className="ml-2 text-lg text-gray-700">{rating}/5</span>
    </div>
  );
};

export default Stars;