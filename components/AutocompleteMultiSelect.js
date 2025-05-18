'use client';

import { useState, useRef, useEffect } from 'react';
import { Form, ListGroup, Badge, Button } from 'react-bootstrap';

export default function AutocompleteMultiSelect({
  label,
  options = [],       // array of objects with { id, nome }
  selected = [],      // array of string values
  onChange            // fn(newSelected: string[])
}) {
  const [input, setInput] = useState('');
  const [showList, setShowList] = useState(false);
  const ref = useRef(null);

  // Fecha a lista ao clicar fora
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowList(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtra opções excluindo já selecionadas
  const filtered = options.filter(
    (opt) =>
      opt.nome.toLowerCase().includes(input.toLowerCase()) &&
      !selected.includes(opt.nome)
  );

  return (
    <Form.Group className="mb-3 position-relative" ref={ref}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setShowList(true);
        }}
        onFocus={() => setShowList(true)}
        placeholder={`Digite para buscar ${label.toLowerCase()}`}
      />

      {showList && filtered.length > 0 && (
        <ListGroup className="position-absolute w-100 z-3">
          {filtered.map((opt) => (
            <ListGroup.Item
              key={opt.id}
              action
              onClick={() => {
                onChange([...selected, opt.nome]);
                setInput('');
                setShowList(false);
              }}
            >
              {opt.nome}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {/* Chips de itens selecionados */}
      <div className="mt-2">
        {selected.map((item) => (
          <Badge bg="primary" key={item} className="me-1">
            {item}{' '}
            <Button
              variant="link"
              size="sm"
              className="p-0 text-white"
              onClick={() => onChange(selected.filter((s) => s !== item))}
            >
              ×
            </Button>
          </Badge>
        ))}
      </div>
    </Form.Group>
  );
}
