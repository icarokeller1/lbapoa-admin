import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import Layout from '@/components/Layout';
import TournamentForm from '@/components/TournamentForm';
import api from '@/lib/api';

export default function EditTournament() {
  const router = useRouter();
  const { id } = router.query;
  const [tournament, setTournament] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    api.get(`/tournaments/${id}`)
      .then(({ data }) => setTournament(data))
      .catch(() => setError('Falha ao carregar torneio.'));
  }, [id]);

  const update = async (form) => {
    await api.put(`/tournaments/${id}`, form);
    router.push('/tournaments');
  };

  if (error) {
    return (
      <Layout>
        <Alert variant="danger">{error}</Alert>
      </Layout>
    );
  }
  if (!tournament) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  return (
    <Layout>
      <h3>Editar Torneio</h3>
      <TournamentForm initial={tournament} onSubmit={update} />
    </Layout>
  );
}
