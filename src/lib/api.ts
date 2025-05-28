import axios from 'axios';

const API_URL = 'http://localhost:1337/api';
const API_KEY = 'da4b6009a54c3fd5a519d3835f1a473c8e6811bf9c2d683b5be4978376749a6a12577563491ce6dc71c4a32a971047a380e4d7b65210168c4977df73d841f65c336549cebda56475dc210a4af840959671790ebca1972b4043b0bfafa4544f22494c44de3bcfa24c9fa0e6bb2721b2dff7f707efdde47e2dcc5df56557d405f7';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

// Recruiters
export const fetchRecruiters = async () => {
  const res = await axiosInstance.get('/recruiters');
  return res.data.data;
};

export const createRecruiter = async (recruiter: { name: string; surname: string; email: string }) => {
  const res = await axiosInstance.post('/recruiters', { data: recruiter });
  return res.data.data;
};


// Jobs
export const fetchJobs = async () => {
  const res = await axios.get(`${API_URL}/jobs`, {
    headers: { Authorization: `Bearer ${API_KEY}` }
  });
  return res.data.data;
};
export const createJob = async (job: {
    title: string;
    description: string;
    requiredPosition: string;
    stat: string; // <-- use 'stat' not 'status'
    // add other fields as needed
  }) => {
    const res = await axiosInstance.post('/jobs', { data: job });
    return res.data.data;
};
export const deleteJob = async (jobId: string | number) => {
  await axiosInstance.delete(`/jobs/${jobId}`);
};
export const fetchCrewMembers = async () => {
  const res = await axiosInstance.get('/crew-members');
  return res.data.data;
};