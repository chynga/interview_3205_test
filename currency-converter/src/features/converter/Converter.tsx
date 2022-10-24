import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Input, InputGroup } from "reactstrap";
import { useAppSelector } from "../../app/hooks";
import { convert, ConverterParams, selectConvertedData } from "./converterSlice";
import style from "./Converter.module.css";
import { Link } from "react-router-dom";

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
        <div className={style.container}>
            <Form  onSubmit={onSubmit}>
                <InputGroup>
                    <Input 
                        type="text"
                        placeholder="15 usd in rub"
                        value={input}
                        onChange={onChange}
                        required
                        />
                    <Button>Convert</Button>
                </InputGroup>
            </Form>
            <Link to='/exchange-rates'>Exchange Rates</Link>
            <div>
                {convertedData ? 
                    "Result: " + convertedData.result : 
                    ""}
            </div>
        </div>
    );
}