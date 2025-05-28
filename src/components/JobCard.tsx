import { Job } from '@/contexts/AppContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users } from 'lucide-react';
import { showAlert } from '@/lib/telegram';
interface JobCardProps {
  job: Job;
  onApply?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isEmployer?: boolean;
}

const JobCard = ({ job, onApply, onEdit, onDelete, isEmployer = false }: JobCardProps) => {
  const date = new Date(job.createdAt);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  
  return (
    <Card className="w-full shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{job.title}</CardTitle>
          <span className="text-xs px-2 py-1 bg-secondary rounded-full">
            {job.requiredPosition}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <p className="text-sm text-gray-600 mb-3">{job.description}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <Users className="h-3 w-3 mr-1" />
          <span className="mr-3">{job.requiredPosition}</span>
          <Calendar className="h-3 w-3 mr-1" />
          <span>Posted: {formattedDate}</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 pt-2">
        <div className="flex justify-between w-full">
          {isEmployer ? (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onEdit}
                className="text-xs"
              >
                Edit
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={onDelete}
                className="text-xs"
              >
                Delete
              </Button>
            </>
          ) : (
            <Button 
              onClick={onApply} 
              className="w-full text-sm"
            >
              Contact Employer
            </Button>
          )}
        </div>
        {isEmployer && (
          <div className="flex justify-center w-full mt-2">
            <Button
              variant="default" // Use the primary color for emphasis
              size="sm"
              className="w-2/3 font-semibold"
              onClick={() => showAlert('Candidats\' applications tracking will be implemented soon!')}
            >
              Track
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
