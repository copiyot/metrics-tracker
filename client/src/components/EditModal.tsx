import {ChangeEvent, FC, memo, useState, useEffect} from 'react';
import styled, {keyframes} from 'styled-components';
import { useUpdateTokenMutation } from '../generated/graphql';
import DropDownMenu from './DropDownMenu';

interface EditModalProps {
    setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isModelOpen: boolean;
    editToken: any;
}

const EditModal:FC<EditModalProps> = (props) => {
    const [tokenValue, setTokenValue] = useState('');
    const [tokenType, setTokenType] = useState('Select token tarrif');
    const [tokenId, setTokenId] = useState('');
    
    const { setIsModelOpen, isModelOpen, editToken } = props;

    const [, updateToken] = useUpdateTokenMutation();

    useEffect(()=>{
        if(editToken?.value){
            setTokenValue(editToken?.value);
            setTokenType(editToken?.name);
            setTokenId(editToken?.id);
        }
    }, [editToken]);


    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {

        if(event.target.name === 'tokenValue'){
            setTokenValue(event.target.value);
        }
    };

    const submitHandler = async () =>{
        setIsModelOpen(false);
        let value = parseFloat(tokenValue);
        let id = parseFloat(tokenId);
        
        await updateToken({id , name: tokenType , value}).then(res => {
            if(res.error){
                alert("Ooops contact admin..")
            }
        });
    };

    return (
    <ModalWrapper isModelOpen={isModelOpen}>
        <ModalContent>
            <ModalHeader>
                <Close onClick={() => setIsModelOpen(false)}>&times;</Close>
                <TitleHeader>EDIT TOKEN</TitleHeader>
            </ModalHeader>
            <ModalBody>
                <InputWrapper>
                    <span>Token:</span>
                    <DropDownMenu tokenType={tokenType} setTokenType={setTokenType}/>
                </InputWrapper>
                <InputWrapper>
                    <span>Value:</span>
                    <Input type="number" value={tokenValue} name="tokenValue" placeholder="Enter value.." onChange={onChangeHandler}/>
                </InputWrapper>
            </ModalBody>
            <ModalFooter>
                <Button type="button" onClick={submitHandler}>Submit</Button>
            </ModalFooter>
        </ModalContent>
    </ModalWrapper>
    );
}

export default memo(EditModal);

const ModalWrapper = styled.div <Pick<EditModalProps, 'isModelOpen'>>`
    display: ${props => props.isModelOpen ? 'block' : 'none'};
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
`;

const animatetop = keyframes`
    from {top:-300px; opacity:0}
    to {top:0; opacity:1}
`;

const ModalContent = styled.div`
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 0;
    border: 1px solid #888;
    width: 400px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    -webkit-animation-name: ${animatetop};
    -webkit-animation-duration: 0.4s;
    animation-name: ${animatetop};
    animation-duration: 0.4s;
    border-radius: 15px;
    overflow: hidden;
`;

const ModalHeader = styled.div`
    padding: 2px 16px;
    background-color: #f1f1f1;
    height: 40px;
`;

const Close = styled.span`
    color: white;
    float: right;
    font-size: 23px;
    font-weight: bold;
    color: black;
    font-weight: 300;
    cursor: pointer;
`;

const ModalBody = styled.div`
    padding: 2px 16px;
    display: flex;
    flex-direction: column;
    margin: 20px auto;
    width: 350px;
`;

const ModalFooter = styled.div`
    background-color: #f1f1f1;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
`;

const TitleHeader = styled.div`
    font-size: 30px;
    margin: 0px auto;
    width: max-content;
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;

    span {
        margin-right: 7px;
    }
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
    margin: 12px 0px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
`;
