import React from "react";
import PropTypes from 'prop-types';
import Flow from "./Flow/Flow";
import Box from '@mui/material/Box';
import { Tabs, Tab, Typography,  } from '@mui/material';
import ListPage from './ListPage/ListPage';
import "./App.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, padding: 0}}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function App() {
  const [value, setValue] = React.useState(0);
  const [outData, setOutData] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div className="App">
      <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Course List" {...a11yProps(0)} />
          <Tab label="Flowchart" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ListPage outData = {outData} setOutData = {setOutData}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
          <div className="Nope">
            <Flow/>
          </div>
      </TabPanel>
    </div>
  );
}