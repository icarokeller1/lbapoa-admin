import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import TournamentForm from '@/components/TournamentForm';
import api from '@/lib/api';

export default function NewTournament() {
  const router = useRouter();

  const create = async (form) => {
    await api.post('/tournaments', form);
    router.push('/tournaments');
  };

  return (
    <Layout>
      <h3>Novo Torneio</h3>
      <TournamentForm onSubmit={create} />
    </Layout>
  );
}
