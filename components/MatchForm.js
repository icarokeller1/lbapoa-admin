'use client';

import { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

export default function MatchForm({ teams = [], initial = {}, onSubmit }) {
  const [form, setForm] = useState({
    timeA: initial.timeA || '',
    timeB: initial.timeB || '',
    pontuacaoA: initial.pontuacaoA ?? '',
    pontuacaoB: initial.pontuacaoB ?? '',
    dataHora: initial.dataHora || '',
    torneio: initial.torneio || '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'number'
        ? (value === '' ? '' : parseInt(value, 10))
        : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.timeA || !form.timeB) {
      setError('Selecione ambos os times.');
      return;
    }
    setError('');
    onSubmit({
      ...form,
      pontuacaoA: form.pontuacaoA === '' ? null : form.pontuacaoA,
      pontuacaoB: form.pontuacaoB === '' ? null : form.pontuacaoB,
      // dataHora já vem no formato correto (YYYY-MM-DDTHH:mm)
    });
  };

  // Se a lista de times chegar vazia, pode sinalizar loading
  if (!teams.length) {
    return <Spinner animation="border" />;
  }

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3">
          <Form.Label>Time A</Form.Label>
          <Form.Select
            name="timeA"
            value={form.timeA}
            onChange={handleChange}
            required
          >
            <option value="">-- selecione --</option>
            {teams.map(t => (
              <option key={t.id} value={t.nome}>
                {t.nome}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Time B</Form.Label>
          <Form.Select
            name="timeB"
            value={form.timeB}
            onChange={handleChange}
            required
          >
            <option value="">-- selecione --</option>
            {teams.map(t => (
              <option key={t.id} value={t.nome}>
                {t.nome}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Pontuações e resto do formulário seguem iguais */}
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
          <Form.Select
            name="torneio"
            value={form.torneio}
            onChange={handleChange}
            required
          >
            <option value="">-- selecione --</option>
            {tournaments.map(t => (
              <option key={t.id} value={t.nome}>
                {t.nome}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button type="submit">Salvar</Button>
      </Form>
    </>
  );
}
