
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getTelegramUser, initTelegram } from '@/lib/telegram';

// Define user types
export type UserRole = 'employee' | 'employer' | null;

export type AvailabilityStatus = 'available' | 'looking' | 'occupied';

export interface Employee {
  id: string;
  telegramId: number;
  firstName: string;
  lastName: string;
  username?: string;
  profession: string;
  availability: AvailabilityStatus;
  photo?: string;
  cvUrl?: string;
  description?: string;
  languages?: string[];
  searchable: boolean;
}

export interface Employer {
  id: string;
  telegramId: number;
  companyName: string;
  logo?: string;
  description?: string;
  contactName: string;
  contactInfo?: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  requiredPosition: string;
  status: 'open' | 'closed';
  createdBy: string; // employer ID
  createdAt: Date;
}

interface AppContextType {
  isInitialized: boolean;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  telegramUser: any;
  employeeProfile: Employee | null;
  setEmployeeProfile: (profile: Employee | null) => void;
  employerProfile: Employer | null;
  setEmployerProfile: (profile: Employer | null) => void;
  jobs: Job[];
  setJobs: (jobs: Job[]) => void;
  addJob: (job: Job) => void;
  updateJob: (job: Job) => void;
  deleteJob: (jobId: string) => void;
  employees: Employee[];
  setEmployees: (employees: Employee[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [telegramUser, setTelegramUser] = useState<any>(null);
  const [employeeProfile, setEmployeeProfile] = useState<Employee | null>(null);
  const [employerProfile, setEmployerProfile] = useState<Employer | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  // Initialize Telegram WebApp and user data
  useEffect(() => {
    initTelegram();
    const user = getTelegramUser();
    setTelegramUser(user);
    
    // For demo purposes, we'll check local storage for existing profiles
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole as UserRole);
      
      if (storedRole === 'employee') {
        const storedProfile = localStorage.getItem('employeeProfile');
        if (storedProfile) {
          setEmployeeProfile(JSON.parse(storedProfile));
        }
      } else if (storedRole === 'employer') {
        const storedProfile = localStorage.getItem('employerProfile');
        if (storedProfile) {
          setEmployerProfile(JSON.parse(storedProfile));
        }
      }
    }
    
    // Load sample data
    const storedJobs = localStorage.getItem('jobs');
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    } else {
      // Sample jobs for demo purposes
      setJobs([
        {
          id: '1',
          title: 'Captain for 40m Motor Yacht',
          description: 'Looking for an experienced captain for a 40m motor yacht based in Monaco. Year-round position.',
          requiredPosition: 'Captain',
          status: 'open',
          createdBy: 'employer1',
          createdAt: new Date()
        },
        {
          id: '2',
          title: 'Stewardess Needed ASAP',
          description: 'Immediate position available for an experienced stewardess on a 35m sailing yacht cruising the Mediterranean.',
          requiredPosition: 'Stewardess',
          status: 'open',
          createdBy: 'employer2',
          createdAt: new Date()
        }
      ]);
    }
    
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    } else {
      // Sample employees for demo purposes
      setEmployees([
        {
          id: '1',
          telegramId: 123456789,
          firstName: 'John',
          lastName: 'Smith',
          profession: 'Captain',
          availability: 'available',
          description: '15 years experience, 3000GT license',
          languages: ['English', 'French'],
          searchable: true
        },
        {
          id: '2',
          telegramId: 987654321,
          firstName: 'Emma',
          lastName: 'Johnson',
          profession: 'Chief Stewardess',
          availability: 'looking',
          description: '8 years on luxury yachts, silver service trained',
          languages: ['English', 'Italian', 'Spanish'],
          searchable: true
        }
      ]);
    }
    
    setIsInitialized(true);
  }, []);

  // Save profiles to local storage when they change
  useEffect(() => {
    if (userRole === 'employee' && employeeProfile) {
      localStorage.setItem('employeeProfile', JSON.stringify(employeeProfile));
    } else if (userRole === 'employer' && employerProfile) {
      localStorage.setItem('employerProfile', JSON.stringify(employerProfile));
    }
    
    if (userRole) {
      localStorage.setItem('userRole', userRole);
    } else {
      localStorage.removeItem('userRole');
    }
  }, [userRole, employeeProfile, employerProfile]);

  // Save jobs to local storage when they change
  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  // Save employees to local storage when they change
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const addJob = (job: Job) => {
    setJobs(prevJobs => [...prevJobs, job]);
  };

  const updateJob = (updatedJob: Job) => {
    setJobs(prevJobs => prevJobs.map(job => job.id === updatedJob.id ? updatedJob : job));
  };

  const deleteJob = (jobId: string) => {
    setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
  };

  return (
    <AppContext.Provider
      value={{
        isInitialized,
        userRole,
        setUserRole,
        telegramUser,
        employeeProfile,
        setEmployeeProfile,
        employerProfile,
        setEmployerProfile,
        jobs,
        setJobs,
        addJob,
        updateJob,
        deleteJob,
        employees,
        setEmployees
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
