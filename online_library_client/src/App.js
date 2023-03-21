import './App.css';
import {Header} from "./components/Header";
import {Main} from "./components/Main";
import {Footer} from "./components/Footer";
import {TokenContext} from "./contexts/TokenContext";
import React from "react";

function App() {
    const [token, setToken] = React.useState(localStorage.getItem('token'));

    return (
        <div className="App">
            <TokenContext.Provider value={[token, setToken]}>
                <Header/>
                <Main/>
                <Footer/>
            </TokenContext.Provider>
        </div>);
}

export default App;
