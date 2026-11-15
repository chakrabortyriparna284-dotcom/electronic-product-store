import React from 'react';
import { Star } from 'lucide-react';

const Rating = ({ value = 0, text = '' }) => {
  return (
    <div className="card-rating">
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            fill={value >= star ? '#f59e0b' : value >= star - 0.5 ? 'currentColor' : 'none'}
            color="#f59e0b"
          />
        ))}
      </div>
      <span className="rating-count">{value.toFixed(1)} {text && `(${text})`}</span>
    </div>
  );
};

export default Rating;
