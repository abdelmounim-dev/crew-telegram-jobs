import { fetchJobs } from '@/lib/api';
import { fetchCrewMembers } from '@/lib/api';
import { deleteJob as deleteJobApi } from '@/lib/api';
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
  const { userRole, employeeProfile, employerProfile, setUserRole } = useApp();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>('jobs');
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    if (userRole === 'employer') {
      fetchCrewMembers().then(setEmployees);
    }
  }, [userRole]);
  useEffect(() => {
    // Set default tab based on user role
    if (userRole === 'employer') {
      setActiveTab('jobs');
    } else {
      setActiveTab('browse');
    }
  }, [userRole]);

  useEffect(() => {
    fetchJobs().then(setJobs);
  }, []);
  const mappedJobs = jobs.map(job => ({
    id: job.id,
    ...job.attributes,
  }));
  console.log('mappedJobsss:', jobs);
  /*const displayJobs = userRole === 'employer'
    ? mappedJobs.filter(job => employerProfile && job.createdBy === employerProfile.id)
    : mappedJobs;*/
  const displayJobs = jobs;
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
  


  const handleApplyForJob = (jobId: string) => {
    const job = displayJobs.find(j => j.id === jobId);
    if (job) {
      showAlert(`Contacting the employer directly via Telegram will be implemented soon`);
    }
  };
  
  const handleEditJob = (jobId: string) => {
    navigate(`/edit-job/${jobId}`);
  };
  
  const handleContactProfile = (profileId: string) => {
    const profile = employees.find(emp => emp.id === profileId);
    if (profile) {
      showAlert(`Contact ${profile.firstName} will be supported soon with telegram account.`);
    }
  };
  const handleDeleteJob = async (jobId: string) => {
    showConfirm('Are you sure you want to delete this job posting?', async (confirmed) => {
      if (confirmed) {
        try {
          await deleteJobApi(jobId);
          setJobs(jobs => jobs.filter(job => job.id !== jobId)); // Remove from local state
          showAlert('Job posting deleted successfully');
        } catch (error) {
          showAlert('Failed to delete job');
          console.error(error);
        }
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
  console.log('employees:', employees);
  // --- Refactored: Crew Filtering Logic ---
  const validCrew = employees.filter(
    emp =>
      emp &&
      typeof emp.firstName === 'string' &&
      emp.firstName.trim() !== '' 
  );
  console.log('validCrew:', validCrew);
  return (
    <div className="container mx-auto px-4 py-4 pb-16">
      {/* Header with user info */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{getDisplayName()}</h1>
          <p className="text-muted-foreground">{getRoleName()}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={handleEditProfile}>
            <Settings className="h-5 w-5" />
          </Button>
          <Button
            onClick={() => {
              localStorage.removeItem('userRole');
              setUserRole(null); // <-- Reset context state
              navigate('/');     // Go to role selection
            }}
          >
            Sign Out
          </Button>
        </div>
      </div>
      
      {/* Tabs for different sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="jobs" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            {userRole === 'employer' ? 'My Jobs' : 'Job Listings'}
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
            <div className="space-y-4">
              {validCrew.length > 0 ? (
                validCrew.map(employee => (
                  <ProfileCard
                    key={employee.id}
                    profile={employee}
                    onContact={() => handleContactProfile(employee.id)}
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No crew profiles available at the moment.
                  </p>
                </div>
              )}
            </div>
          ) : (
            // For crew: show job listings (same as jobs tab for now)
            <div className="space-y-4">
              {displayJobs.length > 0 ? (
                displayJobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={() => handleApplyForJob(job.id)}
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No job listings available at the moment.
                  </p>
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
