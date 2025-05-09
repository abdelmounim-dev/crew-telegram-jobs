
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, UserRole } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Search, Settings, FileText, User } from 'lucide-react';
import JobCard from '@/components/JobCard';
import ProfileCard from '@/components/ProfileCard';
import { showAlert, showConfirm } from '@/lib/telegram';

const Dashboard = () => {
  const { userRole, employeeProfile, employerProfile, jobs, employees, deleteJob } = useApp();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<string>('jobs');
  
  useEffect(() => {
    // Set default tab based on user role
    if (userRole === 'employer') {
      setActiveTab('jobs');
    } else {
      setActiveTab('browse');
    }
  }, [userRole]);
  
  const handleEditProfile = () => {
    if (userRole === 'employee') {
      navigate('/employee-profile');
    } else {
      navigate('/employer-profile');
    }
  };
  
  const handleCreateJob = () => {
    navigate('/create-job');
  };
  
  const handleContactProfile = (profileId: string) => {
    const profile = employees.find(emp => emp.id === profileId);
    if (profile) {
      showAlert(`Contact ${profile.firstName} ${profile.lastName} via Telegram`);
    }
  };
  
  const handleApplyForJob = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      showAlert(`You'll be directed to contact the employer for the job: ${job.title}`);
    }
  };
  
  const handleEditJob = (jobId: string) => {
    navigate(`/edit-job/${jobId}`);
  };
  
  const handleDeleteJob = (jobId: string) => {
    showConfirm('Are you sure you want to delete this job posting?', (confirmed) => {
      if (confirmed) {
        deleteJob(jobId);
        showAlert('Job posting deleted successfully');
      }
    });
  };
  
  const getDisplayName = (): string => {
    if (userRole === 'employee' && employeeProfile) {
      return `${employeeProfile.firstName} ${employeeProfile.lastName}`;
    } else if (userRole === 'employer' && employerProfile) {
      return employerProfile.companyName;
    }
    return '';
  };
  
  const getRoleName = (): string => {
    if (userRole === 'employee') {
      return employeeProfile?.profession || 'Crew Member';
    } else {
      return 'Employer';
    }
  };
  
  // Filter jobs based on user role
  const displayJobs = userRole === 'employer' 
    ? jobs.filter(job => employerProfile && job.createdBy === employerProfile.id)
    : jobs;
  
  return (
    <div className="container mx-auto px-4 py-4 pb-16">
      {/* Header with user info */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{getDisplayName()}</h1>
          <p className="text-muted-foreground">{getRoleName()}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={handleEditProfile}>
          <Settings className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Tabs for different sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="jobs" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            {userRole === 'employer' ? 'My Jobs' : 'Job Listings'}
          </TabsTrigger>
          <TabsTrigger value="browse" className="flex items-center">
            {userRole === 'employer' ? (
              <>
                <User className="h-4 w-4 mr-2" />
                Browse Crew
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Find Jobs
              </>
            )}
          </TabsTrigger>
        </TabsList>
        
        {/* Jobs Tab */}
        <TabsContent value="jobs" className="pt-4">
          {userRole === 'employer' && (
            <div className="mb-4">
              <Button onClick={handleCreateJob} className="w-full flex items-center justify-center">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create New Job
              </Button>
            </div>
          )}
          
          <div className="space-y-4">
            {displayJobs.length > 0 ? (
              displayJobs.map(job => (
                <JobCard 
                  key={job.id} 
                  job={job}
                  isEmployer={userRole === 'employer'}
                  onApply={() => handleApplyForJob(job.id)}
                  onEdit={() => handleEditJob(job.id)}
                  onDelete={() => handleDeleteJob(job.id)}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No job listings available.</p>
                {userRole === 'employer' && (
                  <Button onClick={handleCreateJob} variant="outline" className="mt-4">
                    Create Your First Job
                  </Button>
                )}
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Browse Tab */}
        <TabsContent value="browse" className="pt-4">
          {userRole === 'employer' ? (
            // For employers: show crew profiles
            <div className="space-y-4">
              {employees.filter(emp => emp.searchable).length > 0 ? (
                employees
                  .filter(emp => emp.searchable)
                  .map(employee => (
                    <ProfileCard 
                      key={employee.id} 
                      profile={employee}
                      onContact={() => handleContactProfile(employee.id)}
                    />
                  ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No crew profiles available at the moment.</p>
                </div>
              )}
            </div>
          ) : (
            // For crew: show job listings (same as jobs tab for now)
            <div className="space-y-4">
              {jobs.length > 0 ? (
                jobs.map(job => (
                  <JobCard 
                    key={job.id} 
                    job={job}
                    onApply={() => handleApplyForJob(job.id)}
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No job listings available at the moment.</p>
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
