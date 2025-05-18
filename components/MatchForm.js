'use client';

import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function MatchForm({ initial = {}, onSubmit }) {
  const [form, setForm] = useState({
    timeA: initial.timeA || '',
    timeB: initial.timeB || '',
    pontuacaoA: initial.pontuacaoA != null ? initial.pontuacaoA : '',
    pontuacaoB: initial.pontuacaoB != null ? initial.pontuacaoB : '',
    // para <input type="datetime-local">
    dataHora: initial.dataHora
      ? initial.dataHora.slice(0, 16)
      : '',
    torneio: initial.torneio || '',
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((f) => ({
      ...f,
      [name]:
        type === 'number'
          ? // se vazia, deixa string vazia
            value === '' ? '' : parseInt(value, 10)
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // converte '' em null para enviar
    const payload = {
      ...form,
      pontuacaoA: form.pontuacaoA === '' ? null : form.pontuacaoA,
      pontuacaoB: form.pontuacaoB === '' ? null : form.pontuacaoB,
      dataHora: form.dataHora,
    };
    onSubmit(payload);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Time A</Form.Label>
        <Form.Control
          name="timeA"
          value={form.timeA}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Time B</Form.Label>
        <Form.Control
          name="timeB"
          value={form.timeB}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Pontuação A</Form.Label>
        <Form.Control
          type="number"
          name="pontuacaoA"
          value={form.pontuacaoA}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Pontuação B</Form.Label>
        <Form.Control
          type="number"
          name="pontuacaoB"
          value={form.pontuacaoB}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Data e Hora</Form.Label>
        <Form.Control
          type="datetime-local"
          name="dataHora"
          value={form.dataHora}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Torneio</Form.Label>
        <Form.Control
          name="torneio"
          value={form.torneio}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit">Salvar</Button>
    </Form>
  );
}
