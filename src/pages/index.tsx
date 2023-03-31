import BlockDetailTableBody from "@/components/BlockDetailTableBody"
import CustomCard from "@/components/CustomCard"
import TableHeader from "@/components/TableHeader"
import { getLatestBlocks } from "@/redux/blocks/action"
import { RootState } from "@/redux/store"
import { Table } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const HEADERS = ['Block No.', 'Age', 'Miner', 'Transaction Count']

export default function Home() {

  const {arrOfBlockNumber} = useSelector((state:RootState)=>state.blocksDetails)
  const dispatch = useDispatch()

  useEffect(()=>{

    if(!arrOfBlockNumber.length){
      dispatch<any>(getLatestBlocks(5))
    }

  },[arrOfBlockNumber])

  return (
    <>
        <CustomCard>
          <h3>Latest Blocks</h3>
          <div>
            <Table>
              <TableHeader headers = {HEADERS} />
              <BlockDetailTableBody/>
            </Table>
          </div>
        </CustomCard>
    </>
  )
}
