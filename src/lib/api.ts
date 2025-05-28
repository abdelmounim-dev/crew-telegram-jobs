import axios from 'axios';

const API_URL = 'http://localhost:1337/api';

// Recruiters
export const fetchRecruiters = async () => {
  const res = await axios.get(`${API_URL}/recruiters`);
  return res.data.data;
};

export const createRecruiter = async (recruiter: { name: string; surname: string; email: string }) => {
  const res = await axios.post(`${API_URL}/recruiters`, { data: recruiter });
  return res.data.data;
};


// Jobs
export const fetchJobs = async () => {
  const res = await axios.get(`${API_URL}/jobs`);
  return res.data.data;
};
export const createJob = async (job: {
    title: string;
    description: string;
    requiredPosition: string;
    stat: string; // <-- use 'stat' not 'status'
    // add other fields as needed
  }) => {
    const res = await axios.post(`${API_URL}/jobs`, { data: job });
    return res.data.data;
};
export const deleteJob = async (jobId: string | number) => {
  await axios.delete(`${API_URL}/jobs/${jobId}`);
};
export const fetchCrewMembers = async () => {
  const res = await axios.get(`${API_URL}/crew-members`);
  return res.data.data;
};