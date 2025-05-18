'use client';

import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function TournamentForm({ initial = {}, onSubmit }) {
  const [nome, setNome] = useState(initial.nome || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nome });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nome do Torneio</Form.Label>
        <Form.Control
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit">Salvar</Button>
    </Form>
  );
}
