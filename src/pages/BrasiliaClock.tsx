import Clock from '../components/Clock';

const BrasiliaClock = () => {
  return (
    <div className="relative">
      <Clock 
        timezone="America/Sao_Paulo" 
        fullscreen 
        cityName="Brasília"
        showDate
      />
    </div>
  );
};

export default BrasiliaClock;