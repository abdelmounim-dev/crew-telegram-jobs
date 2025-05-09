
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { initTelegram } from '@/lib/telegram';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    initTelegram();
    navigate('/');
  }, [navigate]);
  
  const handleStart = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-secondary to-background p-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <span className="text-5xl animate-wave inline-block">⚓</span>
          <h1 className="text-4xl font-bold mb-2 text-yacht-navy">EasyCrew</h1>
          <p className="text-lg text-primary">Connecting Yacht Owners with Professional Crew</p>
        </div>
        
        <p className="mb-8 text-muted-foreground">
          Find your perfect crew or your next yachting position quickly and easily.
        </p>
        
        <Button onClick={handleStart} size="lg" className="w-full">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Index;
