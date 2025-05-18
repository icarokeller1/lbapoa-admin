import { useState, useEffect } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import NewsForm from '@/components/NewsForm';
import api from '@/lib/api';

export default function EditNews() {
  const router = useRouter();
  const { id } = router.query;

  const [teams, setTeams] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [newsItem, setNewsItem] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/teams')
      .then(({ data }) => setTeams(data))
      .catch(() => setError('Falha ao carregar times.'));
    api.get('/tournaments')
      .then(({ data }) => setTournaments(data))
      .catch(() => setError('Falha ao carregar torneios.'));
  }, []);

  useEffect(() => {
    if (!id) return;
    api.get(`/news/${id}`)
      .then(({ data }) => setNewsItem(data))
      .catch(() => setError('Falha ao carregar notícia.'));
  }, [id]);

  const update = async (form) => {
    try {
      await api.put(`/news/${id}`, form);
      router.push('/news');
    } catch {
      setError('Erro ao atualizar notícia.');
    }
  };

  if (error) {
    return (
      <Layout>
        <Alert variant="danger">{error}</Alert>
      </Layout>
    );
  }
  if (!teams.length || !tournaments.length || !newsItem) {
    return (
      <Layout>
        <Spinner animation="border" />
      </Layout>
    );
  }

  return (
    <Layout>
      <h3>Editar Notícia</h3>
      <NewsForm
        teams={teams}
        tournaments={tournaments}
        initial={{
          ...newsItem,
          data: newsItem.data.slice(0, 10)
        }}
        onSubmit={update}
      />
    </Layout>
  );
}
