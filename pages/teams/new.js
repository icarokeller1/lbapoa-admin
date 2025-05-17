import Layout from '@/components/Layout';
import TeamForm from '@/components/TeamForm';
import api from '@/lib/api';
import { useRouter } from 'next/router';

export default function NewTeam() {
  const router = useRouter();

  const createTeam = async (form) => {
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => v !== null && fd.append(k, v));
    await api.post('/teams', fd);
    router.push('/');
  };

  return (
    <Layout>
      <h3>Novo Time</h3>
      <TeamForm onSubmit={createTeam} />
    </Layout>
  );
}
