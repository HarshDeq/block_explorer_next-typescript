import { RootState } from "@/redux/store";
import { Tab, Tabs } from "@mui/material";
import { useSelector } from "react-redux";

interface ITab{
    label:string,
    value:string, index:number
}

interface Props{
    handleChange:(e: React.SyntheticEvent, newValue:  number)=>void,
    tabs:ITab[], value:number
}

const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const CustomTabs = (props:Props) => {
    const {handleChange,tabs,value} = props
   
  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        {tabs.map((item)=>(
            <Tab key={item.label}  label={item.label} {...a11yProps(item.index)} />
        ))}
      </Tabs>
    </>
  );
};



export default CustomTabs;
