// pages/matches/new.js
import { useState, useEffect } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import MatchForm from '@/components/MatchForm';
import api from '@/lib/api';

export default function NewMatch() {
  const router = useRouter();
  const [teams, setTeams] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/teams').then(r => setTeams(r.data)).catch(() => setError('Erro ao carregar times.'));
    api.get('/tournaments').then(r => setTournaments(r.data)).catch(() => setError('Erro ao carregar torneios.'));
  }, []);

  const createMatch = async (form) => {
    try {
      await api.post('/matches', form);
      router.push('/matches');
    } catch {
      setError('Erro ao criar partida.');
    }
  };

  if (!teams.length || !tournaments.length) return <Spinner />;

  return (
    <Layout>
      <h3>Nova Partida</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <MatchForm
        teams={teams}
        tournaments={tournaments}
        onSubmit={createMatch}
      />
    </Layout>
  );
}