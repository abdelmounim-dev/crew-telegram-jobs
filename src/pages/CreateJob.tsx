import { createJob } from '@/lib/api';
import { showAlert } from '@/lib/telegram';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, Job } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { enableBackButton, setMainButton } from '@/lib/telegram';

const positions = [
  'Captain',
  'Chief Officer',
  'Second Officer',
  'Chief Engineer',
  'Second Engineer',
  'ETO',
  'Bosun',
  'Deckhand',
  'Chief Steward/ess',
  'Steward/ess',
  'Chef',
  'Sous Chef'
];

const CreateJob = () => {
  const { employerProfile, addJob } = useApp();
  const navigate = useNavigate();
  
  type JobForm = {
    title: string;
    description: string;
    requiredPosition: string;
    stat: string; // <-- allow 'stat'
  };

  const [job, setJob] = useState<JobForm>({
    title: '',
    description: '',
    requiredPosition: '',
    stat: 'open'
  });
  
  useEffect(() => {
    // Handle back button
    const cleanupBackButton = enableBackButton(() => {
      navigate('/dashboard');
    });
    
    // Handle main button
    const cleanupMainButton = setMainButton('Post Job', handleSubmit, {
      color: '#1c77c3',
      textColor: '#ffffff'
    });
    
    return () => {
      if (cleanupBackButton) cleanupBackButton();
      if (cleanupMainButton) cleanupMainButton();
    };
  }, [job]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJob(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setJob(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async () => {
    if (!job.title || !job.description || !job.requiredPosition) {
      showAlert('Please fill in all required fields');
      return;
    }

    if (!employerProfile) {
      showAlert('You must be logged in as an employer to post jobs');
      navigate('/');
      return;
    }

    try {
      await createJob({
        title: job.title,
        description: job.description,
        requiredPosition: job.requiredPosition,
        stat: 'open', // <-- change 'status' to 'stat'
        // add other fields if needed
      });
      navigate('/dashboard');
    } catch (error) {
      showAlert('Failed to create job. Please try again.');
      console.error(error);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Create Job Posting</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Job Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                name="title"
                value={job.title}
                onChange={handleInputChange}
                placeholder="e.g. Captain for 50m Motor Yacht"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="requiredPosition">Required Position *</Label>
              <Select 
                value={job.requiredPosition} 
                onValueChange={(value) => handleSelectChange('requiredPosition', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map(position => (
                    <SelectItem key={position} value={position}>
                      {position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={job.description}
                onChange={handleInputChange}
                placeholder="Describe the job, requirements, location, etc."
                className="min-h-[150px]"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="pb-20">
        <Button 
          onClick={handleSubmit}
          className="w-full"
        >
          Post Job
        </Button>
      </div>
    </div>
  );
};

export default CreateJob;
