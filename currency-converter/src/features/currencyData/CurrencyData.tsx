import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { Currency, getData, selectExchangeRates, selectSource, setSource } from "./currencyDataSlice";

export function CurrencyData() {

    const dispatch = useDispatch<any>()
    const exchangeRates = useAppSelector(selectExchangeRates);
    const source = useAppSelector(selectSource);

    useEffect(() => {
        dispatch(getData(source));
    }, [source])

    const onChange = (e: any) => {       
        console.log(e.target.value);
         
        dispatch(setSource(e.target.value))
    }

    return (
        <div>
            <select name="source" id="source" onChange={onChange}>
                <option value="RUB">RUB</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
            </select>
            {source === Currency.RUB ? 
                <div>
                    RUB to EUR: {exchangeRates?.quotes.RUBEUR}
                    RUB to USD: {exchangeRates?.quotes.RUBUSD}
                </div> : source === Currency.USD ?
                <div>
                    USD to RUB: {exchangeRates?.quotes.USDRUB}
                    USD to EUR: {exchangeRates?.quotes.USDEUR}
                </div> :
                <div>
                    EUR to RUB: {exchangeRates?.quotes.EURRUB}
                    EUR to USD: {exchangeRates?.quotes.EURUSD}
                </div>
            }
        </div>
    );
}