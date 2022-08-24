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

function App() {

    return (
        <div className="App">
            <ReactNotifications />

                <Router>
                    <NavbarComponent/>
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<ArticleList/>}/>
                            <Route path="/article/:id" element={<Article/>}/>
                            <Route path="/editor" element={<ArticleEditor key={"/editor"}/>}/>
                            <Route path="/editor/:id" element={<ArticleEditor key={"/editor/id"}/>}/>

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
