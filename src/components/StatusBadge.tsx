
import { AvailabilityStatus } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: AvailabilityStatus;
  className?: string;
}

const statusConfig = {
  available: {
    label: 'Available Now',
    className: 'bg-green-500 text-white'
  },
  looking: {
    label: 'Looking',
    className: 'bg-yellow-500 text-white'
  },
  occupied: {
    label: 'Occupied',
    className: 'bg-red-500 text-white'
  }
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        config.className,
        className
      )}
    >
      <span className="w-2 h-2 mr-1 rounded-full bg-white opacity-75"></span>
      {config.label}
    </span>
  );
};

export default StatusBadge;
