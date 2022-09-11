import './App.css';
import 'animate.css/animate.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-notifications-component/dist/theme.css'
import 'tinymce/skins/ui/oxide/content.min.css';
import React from "react";
import {ArticleList} from "./pages/ArticleList";
import {NotFoundErrorPage} from "./pages/exception/NotFoundErrorPage";
import {NavbarComponent} from "./components/NavbarComponent";
import {NetworkErrorPage} from "./pages/exception/NetworkErrorPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Article} from "./pages/Article";
import {ArticleEditor} from "./pages/ArticleEditor";
import {FooterComponent} from "./components/FooterComponent";
import {ReactNotifications} from 'react-notifications-component';
import RequireAuth from './service/RequireAuth';
import RedirectAfterAuth from "./service/RedirectAfterAuth";
import { LoginPage } from './pages/auth/LoginPage';
import {RegistrationPage} from "./pages/auth/RegistratioinPage";
import {isLoggedIn} from "./service/AuthService";

function App() {

    return (
        <div className="App">
            <ReactNotifications />

                <Router>
                    {isLoggedIn() && <NavbarComponent/>}
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<ArticleList/>}/>
                            <Route path="/article/:id" element={<Article/>}/>
                            <Route path="/editor" element={<RequireAuth><ArticleEditor key={"/editor"}/></RequireAuth>}/>
                            <Route path="/editor/:id" element={<RequireAuth><ArticleEditor key={"/editor/id"}/></RequireAuth>}/>

                            <Route path="/sign-in" element={<RedirectAfterAuth><LoginPage /></RedirectAfterAuth>} />
                            <Route path="/sign-up" element={<RedirectAfterAuth><RegistrationPage /></RedirectAfterAuth>} />

                            <Route path="*" element={<NotFoundErrorPage/>}/>
                            <Route path="/network-error" element={<NetworkErrorPage/>}/>
                        </Routes>
                    </div>

                </Router>

            <FooterComponent/>
        </div>
    );
}

export default App;
