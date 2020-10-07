import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Reasons from './Reasons';
import Membership from './Membership';
import Organiser from './Organiser';
import Locate from './Locate';
import Events from './Events';
import Animation from './Animation';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}	
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,	
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',	
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} variant="scrollable"	
          scrollButtons="auto" aria-label="simple tabs example">
          <Tab label="Reasons" {...a11yProps(0)} />
          <Tab label="Membership" {...a11yProps(1)} />
          <Tab label="Organisers" {...a11yProps(2)} />
          <Tab label="Events" {...a11yProps(3)} />
          <Tab label="Branch" {...a11yProps(4)} />
          <Tab label="Test" {...a11yProps(5)} />


        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Reasons/>
      </TabPanel>
      <TabPanel value={value} index={1}>
       <Membership/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Organiser/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Events/>
      </TabPanel>
      <TabPanel value={value} index={4}>
      <h2>Visit your nearest branch for a live bitching session!</h2>
        <Locate/>
      </TabPanel>
      <TabPanel value={value} index={5}>
      <div id="r">
        <Animation/>
        </div>
      </TabPanel>
    </div>
  );
}