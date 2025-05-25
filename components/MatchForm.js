// components/MatchForm.js
'use client';

import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function MatchForm({ teams = [], tournaments = [], initial = {}, onSubmit }) {
  const [form, setForm] = useState({
    teamAId:     initial.teamAId ?? '',
    teamBId:     initial.teamBId ?? '',
    pontuacaoA:  initial.pontuacaoA ?? '',
    pontuacaoB:  initial.pontuacaoB ?? '',
    dataHora:    initial.dataHora || '',
    torneio:     initial.torneio || '',
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'number'
        ? (value === '' ? '' : parseInt(value, 10))
        : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      teamAId:    parseInt(form.teamAId, 10),
      teamBId:    parseInt(form.teamBId, 10),
      pontuacaoA: form.pontuacaoA === '' ? null : form.pontuacaoA,
      pontuacaoB: form.pontuacaoB === '' ? null : form.pontuacaoB,
      dataHora:   form.dataHora,
      torneio:    form.torneio,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Time A</Form.Label>
        <Form.Select
          name="teamAId"
          value={form.teamAId}
          onChange={handleChange}
          required
        >
          <option value="">-- selecione --</option>
          {teams.map(t => (
            <option key={t.id} value={t.id}>{t.nome}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Time B</Form.Label>
        <Form.Select
          name="teamBId"
          value={form.teamBId}
          onChange={handleChange}
          required
        >
          <option value="">-- selecione --</option>
          {teams.map(t => (
            <option key={t.id} value={t.id}>{t.nome}</option>
          ))}
        </Form.Select>
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
        <Form.Select
          name="torneio"
          value={form.torneio}
          onChange={handleChange}
          required
        >
          <option value="">-- selecione --</option>
          {tournaments.map(t => (
            <option key={t.id} value={t.nome}>{t.nome}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button type="submit">Salvar</Button>
    </Form>
  );
}
