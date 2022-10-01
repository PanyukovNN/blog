import '../App.css';
import React, {CSSProperties, FC} from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import {getUser, signOut} from "../service/AuthService";

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
                        <LinkContainer to="/editor">
                            <Nav.Link style={pathname === "/editor" ? bold : {}}>Создать статью</Nav.Link>
                        </LinkContainer>

                        <div className="navbar-right-side">
                            <NavDropdown title={getUser()} id="basic-nav-dropdown">
                                <NavDropdown.Item href="/update-admin">
                                    Change email
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/change-password">
                                    Change password
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <LinkContainer to="/" onClick={signOut}>
                                    <NavDropdown.Item>Logout</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
