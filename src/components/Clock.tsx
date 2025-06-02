import { useState, useEffect } from 'react';

interface ClockProps {
  timezone: string;
  label?: string;
  fullscreen?: boolean;
}

const Clock: React.FC<ClockProps> = ({ timezone, label, fullscreen = false }) => {
  const [time, setTime] = useState<string>('');
  
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      
      const options: Intl.DateTimeFormatOptions = {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      
      const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
      setTime(timeString);
    };
    
    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    
    return () => clearInterval(intervalId);
  }, [timezone]);
  
  const [hours, minutes, seconds] = time.split(':');
  
  const containerClasses = fullscreen 
    ? "min-h-screen flex items-center justify-center bg-neutral-950"
    : "flex items-center justify-center";

  const timeClasses = fullscreen
    ? "text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight"
    : "text-4xl md:text-5xl font-bold tracking-tight";
  
  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center">
        {label && (
          <h2 className="text-2xl md:text-3xl mb-8 text-primary-400 font-semibold">
            {label}
          </h2>
        )}
        <div className={timeClasses}>
          <span className="text-primary-300">{hours}</span>
          <span className="separator px-2 text-primary-500">:</span>
          <span className="text-primary-200">{minutes}</span>
          <span className="separator px-2 text-primary-500">:</span>
          <span className="text-primary-100">{seconds}</span>
        </div>
      </div>
    </div>
  );
};

export default Clock;