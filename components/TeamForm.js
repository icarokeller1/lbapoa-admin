'use client';

import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

export default function TeamForm({ initial = {}, onSubmit }) {
  const [form, setForm] = useState({
    nome: initial.nome || '',
    instagram: initial.instagram || '',
    indPodeUsarMidia: initial.indPodeUsarMidia ? true : false,
    logo: null,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file') {
      const file = files[0];
      if (file) {
        // validação de tipo MIME para imagens
        if (!file.type.startsWith('image/')) {
          setError('Por favor, selecione apenas arquivos de imagem.');
          // limpa o input de arquivo
          e.target.value = null;
          setForm((f) => ({ ...f, logo: null }));
          return;
        }
        setError('');
        setForm((f) => ({ ...f, logo: file }));
      }
      return;
    }

    setError('');
    setForm((f) => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // checa se um arquivo de logo foi selecionado e sem erro
    if (form.logo === null && !initial.logo) {
      setError('É obrigatório selecionar um logo de imagem.');
      return;
    }
    if (error) return;

    onSubmit(form);
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Instagram</Form.Label>
          <Form.Control
            name="instagram"
            value={form.instagram}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            name="indPodeUsarMidia"
            label="Pode usar em mídia?"
            checked={form.indPodeUsarMidia}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Logo</Form.Label>
          <Form.Control
            type="file"
            name="logo"
            accept="image/*"
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit">Salvar</Button>
      </Form>
    </>
  );
}
