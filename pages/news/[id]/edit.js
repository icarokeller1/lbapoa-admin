import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Spinner, Alert } from 'react-bootstrap';
import Layout from '@/components/Layout';
import NewsForm from '@/components/NewsForm';
import api from '@/lib/api';

export default function EditNews() {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    api.get(`/news/${id}`)
      .then(({ data }) => setItem(data))
      .catch(() => setError('Falha ao carregar notícia.'));
  }, [id]);

  const update = async (form) => {
    await api.put(`/news/${id}`, form);
    router.push('/news');
  };

  if (error) {
    return (
      <Layout>
        <Alert variant="danger">{error}</Alert>
      </Layout>
    );
  }
  if (!item) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  return (
    <Layout>
      <h3>Editar Notícia</h3>
      <NewsForm initial={item} onSubmit={update} />
    </Layout>
  );
}
