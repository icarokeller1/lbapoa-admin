'use client';

import { useState } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';

export default function NewsForm({
  teams = [],
  tournaments = [],
  initial = {},
  onSubmit
}) {
  const [form, setForm] = useState({
    titulo:        initial.titulo        || '',
    descricao:     initial.descricao     || '',
    linkinstagram: initial.linkinstagram || '',
    data:          initial.data
                   ? initial.data.slice(0, 10)
                   : '',
    times:         initial.times         || '',
    torneios:      initial.torneios      || '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;

    if (type === 'select-multiple') {
      // monta string separada por ';'
      const vals = Array.from(selectedOptions).map(o => o.value);
      setForm(f => ({ ...f, [name]: vals.join(';') }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.data) {
      setError('A data é obrigatória.');
      return;
    }
    setError('');
    onSubmit(form);
  };

  // carregando combos?
  if (!teams.length || !tournaments.length) {
    return <Spinner animation="border" />;
  }

  // prepara valores para <Form.Select multiple>
  const timesSelected = form.times ? form.times.split(';') : [];
  const torneiosSelected = form.torneios ? form.torneios.split(';') : [];

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Link Instagram</Form.Label>
          <Form.Control
            name="linkinstagram"
            value={form.linkinstagram}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Data</Form.Label>
          <Form.Control
            type="date"
            name="data"
            value={form.data}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* COMBO MULTI DE TIMES */}
        <Form.Group className="mb-3">
          <Form.Label>Times</Form.Label>
          <Form.Select
            name="times"
            multiple
            value={timesSelected}
            onChange={handleChange}
          >
            {teams.map(t => (
              <option key={t.id} value={t.nome}>
                {t.nome}
              </option>
            ))}
          </Form.Select>
          <Form.Text className="text-muted">
            Segure Ctrl (ou Cmd) para múltipla seleção.
          </Form.Text>
        </Form.Group>

        {/* COMBO MULTI DE TORNEIOS */}
        <Form.Group className="mb-3">
          <Form.Label>Torneios</Form.Label>
          <Form.Select
            name="torneios"
            multiple
            value={torneiosSelected}
            onChange={handleChange}
          >
            {tournaments.map(t => (
              <option key={t.id} value={t.nome}>
                {t.nome}
              </option>
            ))}
          </Form.Select>
          <Form.Text className="text-muted">
            Segure Ctrl (ou Cmd) para múltipla seleção.
          </Form.Text>
        </Form.Group>

        <Button type="submit">Salvar</Button>
      </Form>
    </>
  );
}
