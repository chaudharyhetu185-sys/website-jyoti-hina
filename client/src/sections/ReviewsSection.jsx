import React, { useState, useEffect } from 'react';
import { ReviewCarousel } from '../components/ReviewCarousel';
import { fetchReviews } from '../services/api';
import { Loader2 } from 'lucide-react';

export const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true);
      const res = await fetchReviews();
      setReviews(res.data || []);
      setLoading(false);
    };
    loadReviews();
  }, []);

  return (
    <section className="h-full w-full p-6 md:p-10 flex flex-col justify-center overflow-hidden bg-[#f8fafc] relative">
      <div className="max-w-5xl mx-auto w-full my-auto z-10 space-y-5">
        
        {/* Simple Header */}
        <div className="text-center space-y-1">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Client <span className="text-gradient">Reviews</span>
          </h2>
        </div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-slate-500 space-y-2">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
            <span className="font-mono text-xs">Loading testimonials...</span>
          </div>
        ) : (
          <ReviewCarousel reviews={reviews} />
        )}
      </div>
    </section>
  );
};
