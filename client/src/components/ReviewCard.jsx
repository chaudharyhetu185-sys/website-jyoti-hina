import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';

export const ReviewCard = ({ reviewData }) => {
  const { clientName, company, role, avatar, review, rating = 5, isDemo } = reviewData;

  return (
    <div className="group relative rounded-2xl glass-panel p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:border-indigo-200 hover:shadow-md h-full bg-white border border-slate-200">
      
      <Quote className="absolute top-5 right-5 w-8 h-8 text-slate-200 group-hover:text-indigo-100 transition-colors" />

      <div>
        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
              }`}
            />
          ))}
          <span className="ml-1 font-mono text-xs text-slate-500 font-semibold">{rating}.0</span>
        </div>

        {/* Review Text */}
        <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-4 font-sans italic">
          "{review}"
        </p>
      </div>

      {/* Footer Client Profile */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(clientName)}`}
            alt={clientName}
            className="w-10 h-10 rounded-full object-cover bg-slate-100 ring-2 ring-slate-200"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200";
            }}
          />
          <div>
            <h4 className="text-xs font-bold font-display text-slate-900 group-hover:text-indigo-600 transition-colors">
              {clientName}
            </h4>
            <p className="text-[11px] text-slate-500">
              {role} @ <span className="text-indigo-600 font-medium">{company}</span>
            </p>
          </div>
        </div>

        {/* Demo Tag vs Verified */}
        {isDemo ? (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-500 bg-slate-100 border border-slate-200">
            Sample
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            Verified
          </span>
        )}
      </div>
    </div>
  );
};
