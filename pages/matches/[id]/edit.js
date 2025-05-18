import { useState, useEffect } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import MatchForm from '@/components/MatchForm';
import api from '@/lib/api';

export default function EditMatch() {
  const router = useRouter();
  const { id } = router.query;
  const [teams, setTeams] = useState([]);
  const [match, setMatch] = useState(null);
  const [error, setError] = useState('');

  // carrega lista de times
  useEffect(() => {
    api.get('/teams')
      .then(({ data }) => setTeams(data))
      .catch(() => setError('Falha ao carregar times.'));
  }, []);

  // carrega dados da partida
  useEffect(() => {
    if (!id) return;
    api.get(`/matches/${id}`)
      .then(({ data }) => setMatch(data))
      .catch(() => setError('Falha ao carregar partida.'));
  }, [id]);

  const updateMatch = async (form) => {
    try {
      await api.put(`/matches/${id}`, form);
      router.push('/matches');
    } catch {
      setError('Erro ao atualizar partida.');
    }
  };

  if (error) {
    return (
      <Layout>
        <Alert variant="danger">{error}</Alert>
      </Layout>
    );
  }
  if (!teams.length || !match) {
    return (
      <Layout>
        <Spinner animation="border" />
      </Layout>
    );
  }

  return (
    <Layout>
      <h3>Editar Partida</h3>
      <MatchForm
        teams={teams}
        initial={{
          ...match,
          dataHora: match.dataHora.slice(0, 16),
        }}
        onSubmit={updateMatch}
      />
    </Layout>
  );
}
