import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import MatchForm from '@/components/MatchForm';
import api from '@/lib/api';

export default function NewMatch() {
  const router = useRouter();

  const createMatch = async (form) => {
    await api.post('/matches', form);
    router.push('/matches');
  };

  return (
    <Layout>
      <h3>Nova Partida</h3>
      <MatchForm onSubmit={createMatch} />
    </Layout>
  );
}
