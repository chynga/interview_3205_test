import { ConverterParams } from './converterSlice';
import axios from "axios";

const API_URL = "https://api.apilayer.com/exchangerates_data/convert";

// Register user
const convert = async (params: ConverterParams) => {

    const { amount, to, from } = params

    const config = {
        headers: {
            apikey: 'giAGjHPBnJDFRTOY9XYnJbliBvPMA7op',
        },
    };
    const response = await axios.get(API_URL + `?to=${to}&from=${from}&amount=${amount}`, config);
    console.log(response.data);
    
    return response.data
};

const converterAPI = {
    convert
};

export default converterAPI;
