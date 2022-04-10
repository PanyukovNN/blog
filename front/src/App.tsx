import './App.css';
import 'animate.css/animate.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-notifications-component/dist/theme.css'
import 'tinymce/skins/ui/oxide/content.min.css';
import React from "react";
import {ArticleList} from "./pages/ArticleList";
import {NotFoundPage} from "./pages/exception/NotFoundPage";
import {NavbarComponent} from "./components/NavbarComponent";
import {NetworkErrorPage} from "./pages/exception/NetworkErrorPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Article} from "./pages/Article";
import {ArticleEditor} from "./pages/ArticleEditor";
import {FooterComponent} from "./components/FooterComponent";
import { ReactNotifications } from 'react-notifications-component';

function App() {

    return (
        <div className="App">
            <ReactNotifications />
            <NavbarComponent/>

            <div className="content">
                <Router>
                    <Routes>
                        <Route path='/' element={<ArticleList/>}/>
                        <Route path='/article/:id' element={<Article/>}/>
                        <Route path='/editor' element={<ArticleEditor/>}/>
                        <Route path='/editor/:id' element={<ArticleEditor/>}/>

                        <Route path="*" element={<NotFoundPage/>}/>
                        <Route path="/network-error" element={<NetworkErrorPage/>}/>
                    </Routes>
                </Router>
            </div>

            <FooterComponent/>
        </div>
    );
}

export default App;
