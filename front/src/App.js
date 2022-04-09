import './App.css';
import React from "react";
import {ArticleList} from "./pages/ArticleList";
import 'bootstrap/dist/css/bootstrap.css';
import {NotFoundPage} from "./pages/exception/NotFoundPage";
import {NavbarComponent} from "./components/NavbarComponent";
import {NetworkErrorPage} from "./pages/exception/NetworkErrorPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Article} from "./pages/Article";
import {ArticleEditor} from "./pages/ArticleEditor";
import {FooterComponent} from "./components/FooterComponent";
import * as AlertService from "./service/AlertService";
import {useAlert} from "react-alert";

function App() {

    AlertService.setAlert(useAlert())

    return (
        <div className="App">
            <NavbarComponent/>

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

            <FooterComponent/>
        </div>
    );
}

export default App;
