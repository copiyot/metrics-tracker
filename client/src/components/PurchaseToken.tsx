import {FC, memo, ChangeEvent, useState} from 'react';
import styled from 'styled-components';
import { useCreateTokenMutation } from '../generated/graphql';

import DropDownMenu from './DropDownMenu';
import TokensTable from './TokenTable/TokensTable';

const PurchaseToken:FC = ()=> {

    const [tokenValue, setTokenValue] = useState('');
    const [tokenType, setTokenType] = useState('Select token tarrif');

    const [, createToken] = useCreateTokenMutation();

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {

        if(event.target.name === 'tokenValue'){
            setTokenValue(event.target.value);
        }
    }

    const submitHandler = async () =>{
        let value = parseFloat(tokenValue);
        await createToken({name:tokenType, value}).then(res => {
            if(res.error){
                alert("Ooops contact admin..")
            }
        });
    }

    return (   
     <>
        <TitleHeader>PURCHASE TOKEN</TitleHeader>
        <Form>
            <InputWrapper>
                <span>Token:</span>
                <DropDownMenu tokenType={tokenType} setTokenType={setTokenType}/>
            </InputWrapper>
            <InputWrapper>
                <span>Value:</span>
                <Input type="number" value={tokenValue} name="tokenValue" placeholder="Enter value.." onChange={onChangeHandler}/>
            </InputWrapper>
            <Button type="button" onClick={submitHandler}>Submit</Button>
        </Form>
        <TokensTable/>
     </>
   )
}

export default memo(PurchaseToken);

const TitleHeader = styled.div`
    font-size: 30px;
    margin: 10px auto;
    width: max-content;
`;

const Form = styled.form`
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    width: 350px;
`;

const Input = styled.input`
    width: 220px;
    padding: 12px 20px;
    display: inline-block;
    border: 1px solid #04AA6D;
    border-radius: 10px;
    box-sizing: border-box;
    margin: 10px 0px;
`;

const Button = styled.button`
    width: 220px;
    background-color: #04AA6D;
    color: white;
    padding: 14px 20px;
    margin: 8px 0px 8px 50px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 6px;

    span {
        margin-right: 7px;
    }
`;