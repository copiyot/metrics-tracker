import {FC, memo} from 'react';
import styled from 'styled-components';

interface PaginationProps {
    tokensPerPage: number; 
    totalTokens: number;
    paginate: (pageNumber: number) => void;
}

const Pagination:FC<PaginationProps> = (props)=> {

    const {tokensPerPage, totalTokens, paginate} = props;
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalTokens / tokensPerPage); i++){
        pageNumbers.push(i);
    };

    return (   
     <TableFooterWrapper>
        {pageNumbers.map(number => (
            <Button onClick={()=> paginate(number)} key={number}>
                {number}
            </Button>
        ))}
     </TableFooterWrapper>
   )
}

export default memo(Pagination);

const TableFooterWrapper = styled.div`
    background-color: #f1f1f1;
    padding: 8px 0px;
    width: 100%;
    font-weight: 500;
    text-align: left;
    font-size: 16px;
    color: #2c3e50;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Button = styled.button`
    border: none;
    padding: 7px 14px;
    border-radius: 10px;
    cursor: pointer;
    margin-right: 4px;
    margin-left: 4px;
`;