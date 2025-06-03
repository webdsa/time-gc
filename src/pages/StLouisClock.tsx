import Clock from '../components/Clock';

const StLouisClock = () => {
  return (
    <div className="relative">
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