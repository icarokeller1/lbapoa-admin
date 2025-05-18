import { useEffect, useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import Link from 'next/link';
import Layout from '@/components/Layout';
import NewsTable from '@/components/NewsTable';
import api from '@/lib/api';

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const { data } = await api.get('/news');
      setNews(data);
    } catch {
      setError('Falha ao carregar notícias.');
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza?')) return;
    try {
      await api.delete(`/news/${id}`);
      load();
    } catch {
      setError('Erro ao apagar notícia.');
    }
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Notícias</h3>
        <Link href="/news/new" passHref legacyBehavior>
          <Button variant="success">Nova Notícia</Button>
        </Link>
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      <NewsTable news={news} onDelete={handleDelete} />
    </Layout>
  );
}
