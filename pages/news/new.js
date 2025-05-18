import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import NewsForm from '@/components/NewsForm';
import api from '@/lib/api';

export default function NewNews() {
  const router = useRouter();

  const create = async (form) => {
    await api.post('/news', form);
    router.push('/news');
  };

  return (
    <Layout>
      <h3>Nova Notícia</h3>
      <NewsForm onSubmit={create} />
    </Layout>
  );
}
