import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function MyNavbar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">CSV to XLSX Converter</Navbar.Brand>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default MyNavbar;