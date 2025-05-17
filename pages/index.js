import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Layout from '@/components/Layout';
import TeamTable from '@/components/TeamTable';
import { Alert } from 'react-bootstrap';

export default function Home() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const { data } = await api.get('/teams');
      setTeams(data);
    } catch (err) {
      setError('Falha ao carregar lista.');
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza?')) return;
    await api.delete(`/teams/${id}`);
    load();
  };

  return (
    <Layout>
      {error && <Alert variant="danger">{error}</Alert>}
      <TeamTable teams={teams} onDelete={handleDelete} />
    </Layout>
  );
}
