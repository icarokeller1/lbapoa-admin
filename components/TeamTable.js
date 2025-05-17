import { Table, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function TeamTable({ teams, onDelete }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Logo</th>
          <th>Nome</th>
          <th>Instagram</th>
          <th>Mídia?</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((t) => (
          <tr key={t.id}>
            <td>
              {t.logo && (
                <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${t.logo}`} alt="" width={60} />
              )}
            </td>
            <td>{t.nome}</td>
            <td>{t.instagram}</td>
            <td>{t.indPodeUsarMidia ? '✔️' : '❌'}</td>
            <td>
              <Link href={`/teams/${t.id}/edit`} passHref legacyBehavior>
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
