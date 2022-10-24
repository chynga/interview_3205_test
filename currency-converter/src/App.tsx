import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { Converter } from './features/converter/Converter';
import { CurrencyData } from './features/currencyData/CurrencyData';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Converter />} />
                    <Route path="/exchange-rates" element={<CurrencyData />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
