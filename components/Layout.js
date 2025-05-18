import { Container, Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Link href="/" passHref legacyBehavior>
            <Navbar.Brand>LBAPOA Admin</Navbar.Brand>
          </Link>
          <Nav className="me-auto">
            <Link href="/teams/new" passHref legacyBehavior>
              <Nav.Link> Novo Time </Nav.Link>
            </Link>
            <Link href="/matches" passHref legacyBehavior>
              <Nav.Link> Partidas </Nav.Link>
            </Link>
            <Link href="/matches/new" passHref legacyBehavior>
              <Nav.Link> Nova Partida </Nav.Link>
            </Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="py-4">{children}</Container>
    </>
  );
}
