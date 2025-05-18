import { useEffect, useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import Link from 'next/link';
import Layout from '@/components/Layout';
import TournamentTable from '@/components/TournamentTable';
import api from '@/lib/api';

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState([]);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const { data } = await api.get('/tournaments');
      setTournaments(data);
    } catch {
      setError('Falha ao carregar torneios.');
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja apagar?')) return;
    try {
      await api.delete(`/tournaments/${id}`);
      load();
    } catch {
      setError('Erro ao apagar torneio.');
    }
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Torneios</h3>
        <Link href="/tournaments/new" passHref legacyBehavior>
          <Button variant="success">Novo Torneio</Button>
        </Link>
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      <TournamentTable tournaments={tournaments} onDelete={handleDelete} />
    </Layout>
  );
}
