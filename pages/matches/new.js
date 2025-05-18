import { useState, useEffect } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import MatchForm from '@/components/MatchForm';
import api from '@/lib/api';

export default function NewMatch() {
  const router = useRouter();
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/teams')
      .then(({ data }) => setTeams(data))
      .catch(() => setError('Não foi possível carregar times.'));
  }, []);

  const createMatch = async (form) => {
    try {
      await api.post('/matches', form);
      router.push('/matches');
    } catch {
      setError('Erro ao criar partida.');
    }
  };

  return (
    <Layout>
      <h3>Nova Partida</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <MatchForm teams={teams} onSubmit={createMatch} />
    </Layout>
  );
}
