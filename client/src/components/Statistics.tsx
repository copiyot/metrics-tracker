import {FC, memo} from 'react';
import styled from 'styled-components';
import { useTokensStatisticsQuery } from '../generated/graphql';


const Statistics:FC = ()=> {
    const [result] = useTokensStatisticsQuery();

    if(result?.data?.tokensStatistics === undefined) return <p>Loading.....</p>;

    return (   
     <>
        <TitleHeader>STATISTICS</TitleHeader>
        <TableWrapper>
            <TableContainer>
                <Table>
                <thead>
                    <HeaderTr>
                        <Th>Token Type</Th>
                        <Th>Value Per Min</Th>
                        <Th>Value Per Hour</Th>
                        <Th>Value Per Day</Th>
                    </HeaderTr>
                </thead>
                <tbody>
                    {result?.data?.tokensStatistics.map((stat) => {
                        return (
                            <Tr key={stat.name}>
                                <Td>{stat.name}</Td>
                                <Td>{stat.tokenPerMin}</Td>
                                <Td>{stat.tokenPerHour}</Td>
                                <Td>{stat.tokenPerDay}</Td>
                            </Tr>
                            )
                    })}
                </tbody>
                </Table>
            </TableContainer>
        </TableWrapper>
     </>
   )
}

export default memo(Statistics);

const TitleHeader = styled.div`
    font-size: 30px;
    margin: 90px auto;
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