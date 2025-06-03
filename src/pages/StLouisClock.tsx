import Clock from '../components/Clock';

const StLouisClock = () => {
  return <Clock 
    timezone="America/Chicago" 
    fullscreen 
    cityName="St. Louis"
    showDate
  />;
};

export default StLouisClock;