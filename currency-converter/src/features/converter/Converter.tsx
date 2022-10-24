import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { convert, ConverterParams, selectConvertedData } from "./converterSlice";

export function Converter() {

    const convertedData = useAppSelector(selectConvertedData)
    const dispatch = useDispatch<any>()

    const [input, setInput] = useState("");

    useEffect(() => {

    }, [convertedData])

    const onChange = (e: any) => {
        setInput(e.target.value)
    };

    const onSubmit = (e: any) => {
        e.preventDefault();        
        const params = trimInput(input)
        if (params) {
            console.log(params);
            
            dispatch(convert(params));
        }
    };

    const trimInput = (input: string): ConverterParams | null => {

        const params = input.toUpperCase().split(' ').filter(text => text !== '');

        const [amount, from, preposition, to] = params        

        if (params.length !== 4) {            
            return null
        }        

        if (!Number(amount)) {            
            return null
        }
        
        if (preposition !== "IN") {
            return null
        }

        return {
            amount: Number(amount),
            to: to,
            from: from,
        }
    }
    
    return (
        <div>
            <form  onSubmit={onSubmit}>
                <input 
                    type="text"
                    placeholder="Confirm Password"
                    value={input}
                    onChange={onChange}
                    required
                    />
                <button>Convert</button>
            </form>
            {convertedData?.result}
        </div>
    );
}