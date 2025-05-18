import { useState, useEffect } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import NewsForm from '@/components/NewsForm';
import api from '@/lib/api';

export default function NewNews() {
  const router = useRouter();
  const [teams, setTeams] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/teams')
      .then(({ data }) => setTeams(data))
      .catch(() => setError('Erro ao carregar times.'));
    api.get('/tournaments')
      .then(({ data }) => setTournaments(data))
      .catch(() => setError('Erro ao carregar torneios.'));
  }, []);

  const create = async (form) => {
    try {
      await api.post('/news', form);
      router.push('/news');
    } catch {
      setError('Erro ao criar notícia.');
    }
  };

  return (
    <Layout>
      <h3>Nova Notícia</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <NewsForm
        teams={teams}
        tournaments={tournaments}
        onSubmit={create}
      />
    </Layout>
  );
}
