import { Table, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function TournamentTable({ tournaments, onDelete }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {tournaments.map((t) => (
          <tr key={t.id}>
            <td>{t.id}</td>
            <td>{t.nome}</td>
            <td>
              <Link href={`/tournaments/${t.id}/edit`} passHref legacyBehavior>
                <Button size="sm" variant="primary" className="me-2">
                  Editar
                </Button>
              </Link>
              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete(t.id)}
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
