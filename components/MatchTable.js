import { Table, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function MatchTable({ matches, onDelete }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Time A</th>
          <th>Time B</th>
          <th>Pontuação A</th>
          <th>Pontuação B</th>
          <th>Data e Hora</th>
          <th>Torneio</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {matches.map((m) => (
          <tr key={m.id}>
            <td>{m.id}</td>
            <td>{m.timeA}</td>
            <td>{m.timeB}</td>
            <td>{m.pontuacaoA}</td>
            <td>{m.pontuacaoB}</td>
            <td>{new Date(m.dataHora).toLocaleString()}</td>
            <td>{m.torneio}</td>
            <td>
              <Link href={`/matches/${m.id}/edit`} passHref legacyBehavior>
                <Button size="sm" variant="primary" className="me-2">
                  Editar
                </Button>
              </Link>
              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete(m.id)}
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
