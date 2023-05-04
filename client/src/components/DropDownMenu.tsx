import React,{FC, memo} from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSortDesc} from '@fortawesome/free-solid-svg-icons';

enum Tarrif {
    PrePaid = "Pre Paid",
    PostPaid = "Post Paid",
    LargePower = "Large Power"
}

interface DropDownMenuProps {
    setTokenType: React.Dispatch<React.SetStateAction<string>>;
    tokenType: string;
}

const DropDownMenu:FC<DropDownMenuProps> = ({setTokenType, tokenType})=> {

    const handleClick = (selectedTarrif: Tarrif) => {
        setTokenType(selectedTarrif);
    }

    return (   
     <Wrapper>
         <TitleWrapper>{tokenType}<FontAwesomeIcon icon={faSortDesc}/> </TitleWrapper>
        <DropDownMenuWrapper>
            <DropDownMenuItem onClick={()=> handleClick(Tarrif.PrePaid)}>Pre Paid</DropDownMenuItem>
            <DropDownMenuItem onClick={()=> handleClick(Tarrif.PostPaid)}>Post Paid</DropDownMenuItem>
            <DropDownMenuItem onClick={()=> handleClick(Tarrif.LargePower)}>Large power</DropDownMenuItem>
        </DropDownMenuWrapper>
     </Wrapper>
   )
}

export default memo(DropDownMenu);

const Wrapper = styled.div`
    display: inline-block;
    position: relative;
    width: 220px;

    &:hover ul {
        display: block;
    }
`;

const TitleWrapper = styled.div`
    cursor: pointer;
    border: 1px solid #04AA6D;
    padding: 0.7rem 1.3rem;
    border-radius: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const DropDownMenuWrapper = styled.ul`
    display: none;
    margin: 0px;
    padding: 0px;
    overflow: hidden;
    visibility: visible;
    width: fit-content;
    border-radius: 10px;
    position: absolute;
    right: 0;
    z-index: 1;
    background: #ffff;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const DropDownMenuItem = styled.li`
    text-align: center;
    background-color: #04AA6D;
    cursor: pointer;
    min-width: max-content;
    border-bottom: 1px solid #f5f4f6;
    padding: 0.7rem 1.3rem;

    &:last-child:not(first-child){
        border-bottom: none;
    }
    
    &:hover {
        display: block;
    }
`;