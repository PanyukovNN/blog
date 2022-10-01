import './App.css';
import 'animate.css/animate.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-notifications-component/dist/theme.css'
import 'tinymce/skins/ui/oxide/content.min.css';
import React from "react";
import {ArticleList} from "./pages/ArticleList";
import {NotFoundErrorPage} from "./pages/exception/NotFoundErrorPage";
import {AdminNavbarComponent} from "./components/AdminNavbarComponent";
import {NetworkErrorPage} from "./pages/exception/NetworkErrorPage";
import {BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";
import {Article} from "./pages/Article";
import {ArticleEditor} from "./pages/ArticleEditor";
import {FooterComponent} from "./components/FooterComponent";
import {ReactNotifications} from 'react-notifications-component';
import RequireAuth from './service/RequireAuth';
import RedirectAfterAuth from "./service/RedirectAfterAuth";
import { LoginPage } from './pages/auth/LoginPage';
import {UpdateAdminPage} from "./pages/auth/UpdateAdminPage";
import {ChangePasswordPage} from "./pages/auth/ChangePasswordPage";
import {isLoggedIn} from "./service/AuthService";
import {NavigationPanel} from "./components/NavigationPanel";
import {MainPhotoComponent} from "./components/MainPhotoComponent";

function App() {

    return (
        <div className="App">
            <ReactNotifications />

                <Router>
                    {isLoggedIn() && <AdminNavbarComponent/>}
                    <div className="content">
                        <MainPhotoComponent/>

                        <NavigationPanel/>

                        <Routes>
                            <Route path="/" element={<ArticleList/>}/>
                            <Route path="/article/:id" element={<Article/>}/>
                            <Route path="/editor" element={<RequireAuth><ArticleEditor key={"/editor"}/></RequireAuth>}/>
                            <Route path="/editor/:id" element={<RequireAuth><ArticleEditor key={"/editor/id"}/></RequireAuth>}/>

                            <Route path="/sign-in" element={<RedirectAfterAuth><LoginPage/></RedirectAfterAuth>}/>
                            <Route path="/update-admin" element={<RequireAuth><UpdateAdminPage /></RequireAuth>} />
                            <Route path="/change-password" element={<RequireAuth><ChangePasswordPage /></RequireAuth>} />

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
