import { ITransaction } from '@/utils/interfaces'
import { TableCell, TableRow, styled } from '@mui/material'
import React from 'react'
import CustomLink from './CustomLink'
import { createLinkForBlock } from '@/utils/utilFuction'


interface Props{
    transaction:ITransaction
}

const StyledDiv = styled('div')(()=>({
    maxWidth: '15rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
}))

const TransactionRow = (props:Props) => {
    const {transaction} = props
  return (
    <TableRow>
    <TableCell>
        <StyledDiv >
            <CustomLink href={`/txs/${transaction.hash}`}>
            {transaction?.hash}
            </CustomLink>
        </StyledDiv>
    </TableCell>
    <TableCell>
        <StyledDiv >
            <CustomLink href={createLinkForBlock(String(transaction.blockNumber))}>
            {transaction?.blockNumber}
            </CustomLink>
        </StyledDiv>
    </TableCell>
    <TableCell>
        age
    </TableCell>
    <TableCell>
        <StyledDiv >
            {transaction?.from}
        </StyledDiv>
    </TableCell>
    <TableCell>
        <StyledDiv >
            {transaction?.to}
        </StyledDiv>
    </TableCell>
    <TableCell>
        <StyledDiv >
            {transaction?.value}
        </StyledDiv>
    </TableCell>
    <TableCell>
        <StyledDiv >
            fee
        </StyledDiv>
    </TableCell>
</TableRow>
  )
}

export default TransactionRow