import axios from "axios";
import { currencies, Currency } from "./currencyDataSlice";

const API_URL = "https://api.apilayer.com/currency_data/live";

const getData = async (source: Currency) => {

    const config = {
        headers: {
            apikey: 'giAGjHPBnJDFRTOY9XYnJbliBvPMA7op',
        },
    };
    const currenciesParam = currencies.filter(currency => currency !== source).map(currency => currency + ',');
    const response = await axios.get(API_URL + `?source=${source}&currencies=${currenciesParam}`, config);

    return response.data
};

const currencyDataAPI = {
    getData
};

export default currencyDataAPI;
