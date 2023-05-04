import {FC, memo, useState} from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faPencil} from '@fortawesome/free-solid-svg-icons';

import Pagination from './Pagination';
import { useDeleteTokenMutation, useTokensQuery } from '../../generated/graphql';
import EditModal from '../EditModal';

interface TokenType {
        __typename?: "Token" | undefined;
        id: number;
        name: string;
        value: number;
        createdAt: string;
        updatedAt: string;
}

const TokensTable:FC = ()=> {
    const [currentPage, setCurrentPage] = useState(1);
    const [tokensPerPage] = useState(3);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [editToken, setEditToken] = useState({})


    const [result] = useTokensQuery();
    
    const [, deleteToken] = useDeleteTokenMutation();


    if(result?.data?.tokens === undefined) return <p>Loading.....</p>;

    /**
     * Get current posts 
     */
    const indexOfLastToken = currentPage * tokensPerPage;
    const indexOfFirstToken = indexOfLastToken - tokensPerPage;
    const currentTokens = result?.data?.tokens.slice(indexOfFirstToken, indexOfLastToken);
    
    /**
     * 
     * @param pageNumber 
     * @returns void
     * Change page
     */
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const deleteTokenHandler = async (id: number) =>{
        await deleteToken({id});
        window.location.reload();
    }

    return (   
     <>
        <EditModal isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen} editToken={editToken}/>
        <TitleHeader>TOKENS DATA</TitleHeader>
        <TableWrapper>
            <TableContainer>
                <Table>
                <thead>
                    <HeaderTr>
                        <Th>Token Type</Th>
                        <Th>Value</Th>
                        <Th>Date Created</Th>
                        <Th>Edit</Th>
                        <Th>Delete</Th>
                    </HeaderTr>
                </thead>
                <tbody>
                    {currentTokens?.map((token: TokenType) => {
                        return (
                            <Tr key={token.id}>
                                <Td>{token.name}</Td>
                                <Td>{token.value}</Td>
                                <Td>{token.createdAt.split('T')[0]}</Td>
                                <Td onClick={() =>{ setIsModelOpen(true); setEditToken(token)}}><FontAwesomeIcon icon={faPencil} /></Td>
                                <Td onClick={()=>deleteTokenHandler(token.id)}><FontAwesomeIcon icon={faTrash}/></Td>
                            </Tr>
                            )
                    })}
                </tbody>
                </Table>
            </TableContainer>
        <Pagination tokensPerPage={tokensPerPage} totalTokens={result?.data?.tokens?.length} paginate={paginate}/>
        </TableWrapper>
     </>
   )
}

export default memo(TokensTable);

const TitleHeader = styled.div`
    font-size: 30px;
    margin: 10px auto;
    width: max-content;
`;

const TableContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const TableWrapper = styled.div`
    border: 1px solid #04AA6D;
    width: 800px;
    border-radius: 15px;
    margin: 0px auto;
`;

const Table = styled.table`
    width: 100%;
`;

const HeaderTr = styled.tr`
    height: 40px;
    background-color: #f1f1f1;
`;

const Tr = styled.tr`
    height: 40px;
`;

const Th = styled.th`
    border-bottom: 1px solid black;
`;

const Td = styled.td`
    text-align: center;
    cursor: pointer;
`;

