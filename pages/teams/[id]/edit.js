import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import TeamForm from '@/components/TeamForm';
import api from '@/lib/api';
import { Spinner } from 'react-bootstrap';

export default function EditTeam() {
  const router = useRouter();
  const { id } = router.query;
  const [team, setTeam] = useState(null);

  useEffect(() => {
    if (!id) return;
    api.get(`/teams/${id}`).then(({ data }) => setTeam(data));
  }, [id]);

  const updateTeam = async (form) => {
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => v !== null && fd.append(k, v));
    await api.put(`/teams/${id}`, fd);
    router.push('/');
  };

  if (!team) return <Spinner />;

  return (
    <Layout>
      <h3>Editar Time</h3>
      <TeamForm initial={team} onSubmit={updateTeam} />
    </Layout>
  );
}
