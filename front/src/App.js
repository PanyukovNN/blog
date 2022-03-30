import './App.css';
import React from "react";
import {Main} from "./pages/Main";
import 'bootstrap/dist/css/bootstrap.css';
import {NotFoundPage} from "./pages/exception/NotFoundPage";
import {NavbarComponent} from "./components/NavbarComponent";
import {NetworkErrorPage} from "./pages/exception/NetworkErrorPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <NavbarComponent/>

            <Router>
                <Routes>
                    <Route path='/' element={<Main/>}/>

                    <Route path="*" element={<NotFoundPage/>}/>
                    <Route path="/network-error" element={<NetworkErrorPage/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
