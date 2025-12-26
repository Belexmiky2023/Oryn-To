
import React, { useState, useEffect } from 'react';
import { User, Rating } from '../types';
import { db } from '../db';

interface RateProps {
  user: User | null;
}

const Rate: React.FC<RateProps> = ({ user }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [existingRating, setExistingRating] = useState<Rating | null>(null);

  useEffect(() => {
    if (user) {
      const allRatings = db.getRatings();
      const found = allRatings.find(r => r.userId === user.id);
      if (found) {
        setExistingRating(found);
        setRating(found.score);
        setSubmitted(true);
      }
    }
  }, [user]);

  const handleSubmit = () => {
    if (!user || rating === 0) return;

    const newRating: Rating = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      userEmail: user.email,
      score: rating,
      timestamp: Date.now(),
    };

    const allRatings = db.getRatings();
    db.saveRatings([...allRatings, newRating]);
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-6 pt-32 pb-20">
      <div className="max-w-2xl mx-auto glass-morphism p-12 rounded-3xl border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#39FF14] to-transparent"></div>
        
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-raj font-bold uppercase tracking-tighter">
            Rate the <span className="text-[#39FF14]">Experience</span>
          </h1>
          <p className="text-gray-400">
            How was your tournament experience? Your feedback helps us build the ultimate stage for editors.
          </p>

          <div className="flex justify-center space-x-3 py-10">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                disabled={submitted}
                onClick={() => setRating(star)}
                onMouseEnter={() => !submitted && setHover(star)}
                onMouseLeave={() => !submitted && setHover(0)}
                className="transition-all duration-200 transform hover:scale-125"
              >
                <svg
                  className={`w-16 h-16 ${
                    (hover || rating) >= star ? 'text-[#39FF14] drop-shadow-[0_0_10px_#39FF14]' : 'text-gray-800'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>

          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={!user || rating === 0}
              className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest ${
                !user || rating === 0 ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'neon-button'
              }`}
            >
              {user ? 'Submit Rating' : 'Login to Rate'}
            </button>
          ) : (
            <div className="animate-fade-in text-[#39FF14] font-bold text-xl uppercase tracking-widest italic">
              Thank you for your feedback!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rate;
