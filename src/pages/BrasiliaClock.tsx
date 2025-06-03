import Clock from '../components/Clock';

const BrasiliaClock = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-white dark:bg-[#191919]">
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