import { Table, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function NewsTable({ news, onDelete }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Título</th>
          <th>Data</th>
          <th>Times</th>
          <th>Torneios</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {news.map((n) => (
          <tr key={n.id}>
            <td>{n.id}</td>
            <td>{n.titulo}</td>
            <td>{new Date(n.data).toLocaleDateString()}</td>
            <td>{n.times}</td>
            <td>{n.torneios}</td>
            <td>
              <Link href={`/news/${n.id}/edit`} passHref legacyBehavior>
                <Button size="sm" variant="primary" className="me-2">
                  Editar
                </Button>
              </Link>
              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete(n.id)}
              >
                Apagar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
