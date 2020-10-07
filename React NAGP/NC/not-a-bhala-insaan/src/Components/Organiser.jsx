import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    width:'48%',
    margin:'1%',
    display:'inline-grid'
  },
  media: {
    // width: '388px',
    paddingTop: '135.25%',
    display:'flex'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  content :{
    display:'inline'
  },
  outer:{
    // margin:'1%'
  }
}));

export default function Organiser() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <React.Fragment  className={classes.outer}>
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            GA
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            {/* <MoreVertIcon /> */}
          </IconButton>
        }
        title="The Great Ankita Khurana "
        subheader=" 25 Nov 1996  "

      />
      <div  className={classes.content}>
      <CardMedia
        className={classes.media}
        image="/images/24.jpeg"
        title="Paella dish"
      />
      
      <CardContent >
        <Typography variant="body2" color="textSecondary" component="p">
         Pure hosho hawaz me this incredible woman started this Club. To help the poor people, jinko Nihal Chauhan namak zalim ne kayi janmo tak parehsan kiya.
        </Typography>
      </CardContent>
      </div>
    </Card>
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            JJ
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            {/* <MoreVertIcon /> */}
          </IconButton>
        }
        title="Junior Junior Ankita Khurana "
        subheader=" 25 Nov 2000  "

      />
      <div  className={classes.content}>
      <CardMedia
        className={classes.media}
        image="/images/25.jpeg"
        title="Paella dish"
      />
      
      <CardContent >
        <Typography variant="body2" color="textSecondary" component="p">
          Duniya se lad jhagad ke, sabke khilaf jaake ye club chalaya Junior Junior AK ne, iss organiser ka kaafi bada hath raha in taking this club on sky touching heights.
        </Typography>
      </CardContent>
      </div>
    </Card>
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            JA
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            {/* <MoreVertIcon /> */}
          </IconButton>
        }
        title="Junior Ankita Khurana "
        subheader=" 25 Nov 2010  "

      />
      <div  className={classes.content}>
      <CardMedia
        className={classes.media}
        image="/images/26.jpeg"
        title="Paella dish"
      />
      
      <CardContent >
        <Typography variant="body2" color="textSecondary" component="p">
          Bhot Saarii excitement and zeal ke sath , khushi khushi ye manushye ne aage badaya ye club, taaki hamesha hamesha ke liye ye itihas ke panno me "Club No. 1" ban jaye.
        </Typography>
      </CardContent>
      </div>
    </Card>
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            AK
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            {/* <MoreVertIcon /> */}
          </IconButton>
        }
        title="Ankita Khurana "
        subheader=" 25 Nov 2020 "

      />
      <div  className={classes.content}>
      <CardMedia
        className={classes.media}
        image="/images/28.jpeg"
        title="Paella dish"
      />
      
      <CardContent >
        <Typography variant="body2" color="textSecondary" component="p">
          Aur aise he finally, apne pure Dimag ka istamal karte hue, aaj bhi ye club chal raha hai, under the super intelligent, multitalented Ankita Khurana!!!!!
        </Typography>
      </CardContent>
      </div>
    </Card>
    </React.Fragment>
  );
}