import React from 'react';
import { ReviewCard } from './ReviewCard';

export const ReviewCarousel = ({ reviews = [] }) => {
  if (!reviews || reviews.length === 0) {
    return <div className="text-center text-slate-500 py-6 font-mono text-xs">No reviews available yet.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {reviews.slice(0, 3).map((rev, index) => (
        <ReviewCard key={rev._id || index} reviewData={rev} />
      ))}
    </div>
  );
};
