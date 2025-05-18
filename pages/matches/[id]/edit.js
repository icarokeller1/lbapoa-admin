import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Spinner, Alert } from 'react-bootstrap';
import Layout from '@/components/Layout';
import MatchForm from '@/components/MatchForm';
import api from '@/lib/api';

export default function EditMatch() {
  const router = useRouter();
  const { id } = router.query;
  const [match, setMatch] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    api.get(`/matches/${id}`)
      .then(({ data }) => setMatch(data))
      .catch(() => setError('Falha ao carregar partida.'));
  }, [id]);

  const updateMatch = async (form) => {
    await api.put(`/matches/${id}`, form);
    router.push('/matches');
  };

  if (error) {
    return (
      <Layout>
        <Alert variant="danger">{error}</Alert>
      </Layout>
    );
  }

  if (!match) {
    return (
      <Layout>
        <Spinner animation="border" />
      </Layout>
    );
  }

  return (
    <Layout>
      <h3>Editar Partida</h3>
      <MatchForm initial={match} onSubmit={updateMatch} />
    </Layout>
  );
}
