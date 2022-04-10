import '../App.css';
import React, {CSSProperties, FC} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";

/**
 * Navigation panel component
 *
 * @returns navigation panel component
 */
export const NavbarComponent: FC = () => {

    const pathname = window.location.pathname.split('?')[0];

    const bold: CSSProperties = {fontWeight: "bold"};

    return (
        <Navbar expand="lg">
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="article-width my-2 my-lg-0" navbarScroll>
                        <Nav.Link href="/" style={pathname === "/" ? bold : {}}>Главная</Nav.Link>
                        <Nav.Link href="/editor" style={pathname === "/editor" ? bold : {}}>Создать статью</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
