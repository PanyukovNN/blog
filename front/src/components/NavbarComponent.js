import '../App.css';
import {React} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";

/**
 * Navigation panel component
 *
 * @returns navigation panel component
 */
export const NavbarComponent = () => {

    const pathname = window.location.pathname.split('?')[0];

    return (
        <Navbar expand="lg">
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="my-2 my-lg-0" navbarScroll>
                        <Nav.Link href="/" style={pathname === "/" ? {"font-weight": "bold"} : {}}>Главная</Nav.Link>
                        <Nav.Link href="/editor" style={pathname === "/editor" ? {"font-weight": "bold"} : {}}>Создать статью</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
