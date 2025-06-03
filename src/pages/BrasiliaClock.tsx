import Clock from '../components/Clock';

const BrasiliaClock = () => {
  return <Clock 
    timezone="America/Sao_Paulo" 
    fullscreen 
    cityName="Brasília"
    showDate
  />;
};

export default BrasiliaClock;