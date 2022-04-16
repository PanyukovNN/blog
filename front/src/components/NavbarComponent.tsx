import '../App.css';
import React, {CSSProperties, FC} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';

/**
 * Navigation panel component.
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
                        <LinkContainer to="/">
                            <Nav.Link style={pathname === "/" ? bold : {}}>Главная</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/editor">
                            <Nav.Link style={pathname === "/editor" ? bold : {}}>Создать статью</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
