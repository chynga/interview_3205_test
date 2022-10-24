import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { Currency, getData, selectExchangeRates, selectSource, setSource } from "./currencyDataSlice";
import style from "./CurrencyData.module.css";
import { Link } from "react-router-dom";

export function CurrencyData() {

    const dispatch = useDispatch<any>()
    const exchangeRates = useAppSelector(selectExchangeRates);
    const source = useAppSelector(selectSource);

    useEffect(() => {
        dispatch(getData(source));
    }, [source])

    const onChange = (e: any) => {                
        dispatch(setSource(e.target.value))
    }

    return (
        <div className={style.container}>
            <select name="source" id="source" onChange={onChange} defaultValue={source}>
                <option value="RUB">RUB</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
            </select>

            <div><Link to='/'>Converter</Link></div>
            
            {source === Currency.RUB ? 
                <div>
                    <div>RUB to EUR: {exchangeRates?.quotes.RUBEUR}</div>
                    <div>RUB to USD: {exchangeRates?.quotes.RUBUSD}</div>
                </div> : source === Currency.USD ?
                <div>
                    <div>USD to RUB: {exchangeRates?.quotes.USDRUB}</div>
                    <div>USD to EUR: {exchangeRates?.quotes.USDEUR}</div>
                </div> :
                <div>
                    <div>EUR to RUB: {exchangeRates?.quotes.EURRUB}</div>
                    <div>EUR to USD: {exchangeRates?.quotes.EURUSD}</div>
                </div>
            }
        </div>
    );
}