'use client';

import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function NewsForm({ initial = {}, onSubmit }) {
  const [form, setForm] = useState({
    titulo:        initial.titulo     || '',
    descricao:     initial.descricao  || '',
    linkinstagram: initial.linkinstagram || '',
    data:          initial.data
                   ? initial.data.slice(0,10)
                   : '',    // "YYYY-MM-DD"
    times:         initial.times      || '',
    torneios:      initial.torneios   || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      data: form.data  // string "YYYY-MM-DD"
    });
  };

  return (
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

      <Form.Group className="mb-3">
        <Form.Label>Times (separar por `;`)</Form.Label>
        <Form.Control
          name="times"
          value={form.times}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Torneios (separar por `;`)</Form.Label>
        <Form.Control
          name="torneios"
          value={form.torneios}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit">Salvar</Button>
    </Form>
  );
}
