
import React, { useState, useEffect } from 'react';
import { TARGET_DATE } from '../constants';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      // Fix: TARGET_DATE is exported as a function reference in constants.ts to ensure runtime safety. 
      // It must be called to retrieve the actual timestamp value.
      const distance = TARGET_DATE() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center p-4 min-w-[80px] md:min-w-[120px] glass-morphism rounded-xl border-[#39FF14]/20 border-t-2 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-b from-[#39FF14]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <span className="text-4xl md:text-6xl font-bold font-raj text-[#39FF14] neon-glow">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-xs md:text-sm uppercase tracking-widest text-gray-500 mt-2">{label}</span>
    </div>
  );

  return (
    <div className="flex space-x-4 md:space-x-8 py-8 animate-pulse-slow">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

export default Countdown;
