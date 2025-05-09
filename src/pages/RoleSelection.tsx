
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Users } from 'lucide-react';

const RoleSelection = () => {
  const { setUserRole, telegramUser } = useApp();
  const navigate = useNavigate();
  
  const handleRoleSelect = (role: 'employee' | 'employer') => {
    setUserRole(role);
    
    if (role === 'employee') {
      navigate('/employee-profile');
    } else {
      navigate('/employer-profile');
    }
  };
  
  return (
    <div className="container px-4 mx-auto max-w-md py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to EasyCrew</h1>
        <p className="text-muted-foreground">
          {telegramUser ? `Hello, ${telegramUser.first_name}! ` : ''}
          Please select your role to continue.
        </p>
      </div>
      
      <div className="grid gap-6">
        <Card className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => handleRoleSelect('employee')}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Crew Member
            </CardTitle>
            <CardDescription>
              Find jobs on yachts, create a profile visible to employers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              As a crew member, you can create a profile, set your availability status, 
              and view job postings from yacht owners and managers.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => handleRoleSelect('employee')}>
              Continue as Crew
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => handleRoleSelect('employer')}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Employer
            </CardTitle>
            <CardDescription>
              Post jobs and find qualified yacht crew members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              As an employer, you can create a company profile, post job openings,
              and browse profiles of available crew members.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => handleRoleSelect('employer')}>
              Continue as Employer
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RoleSelection;
