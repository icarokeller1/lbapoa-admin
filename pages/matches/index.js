import { useEffect, useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import Link from 'next/link';
import Layout from '@/components/Layout';
import MatchTable from '@/components/MatchTable';
import api from '@/lib/api';

export default function MatchesPage() {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const { data } = await api.get('/matches');
      setMatches(data);
    } catch {
      setError('Falha ao carregar partidas.');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza?')) return;
    try {
      await api.delete(`/matches/${id}`);
      load();
    } catch {
      setError('Erro ao apagar partida.');
    }
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Partidas</h3>
        <Link href="/matches/new" passHref legacyBehavior>
          <Button variant="success">Nova Partida</Button>
        </Link>
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      <MatchTable matches={matches} onDelete={handleDelete} />
    </Layout>
  );
}
