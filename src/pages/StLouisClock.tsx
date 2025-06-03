import Clock from '../components/Clock';

const StLouisClock = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-white dark:bg-[#191919]">
      <Clock 
        timezone="America/Chicago" 
        fullscreen 
        cityName="St. Louis"
        showDate
      />
    </div>
  );
};

export default StLouisClock;