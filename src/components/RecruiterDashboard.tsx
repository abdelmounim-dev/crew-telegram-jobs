import { useEffect, useState } from 'react';
import { fetchRecruiters, createRecruiter } from '@/lib/api';

const RecruiterDashboard = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [newRecruiter, setNewRecruiter] = useState({ name: '', surname: '', email: '' });

  useEffect(() => {
    const loadRecruiters = async () => {
      const data = await fetchRecruiters();
      setRecruiters(data.data); // Strapi returns data in a `data` key
    };

    loadRecruiters();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRecruiter({ ...newRecruiter, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const createdRecruiter = await createRecruiter(newRecruiter);
    setRecruiters([...recruiters, createdRecruiter.data]);
    setNewRecruiter({ name: '', surname: '', email: '' });
  };

  return (
    <div>
      <h1>Recruiter Dashboard</h1>
      <ul>
        {recruiters.map((recruiter: any) => (
          <li key={recruiter.id}>
            {recruiter.attributes.name} {recruiter.attributes.surname} - {recruiter.attributes.email}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newRecruiter.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="surname"
          placeholder="Surname"
          value={newRecruiter.surname}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newRecruiter.email}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Recruiter</button>
      </form>
    </div>
  );
};

export default RecruiterDashboard;