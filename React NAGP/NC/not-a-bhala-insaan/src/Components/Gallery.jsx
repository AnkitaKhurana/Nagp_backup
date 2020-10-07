import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "48%",
    margin: "1%",
    display: "inline-grid",
  },
  media: {
    // width: '388px',
    paddingTop: "135.25%",
    display: "flex",
    backgroundSize:'contain'
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  content: {
    display: "inline",
  },
  outer: {
    // margin:'1%'
  },
}));

export default function Gallery() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <React.Fragment className={classes.outer}>
        <hr/>
        <hr/>
        <h1>Wall of Shame !</h1>
        <hr/>
      <Card className={classes.root}>
        <div className={classes.content}>
          <CardMedia
            className={classes.media}
            image="/images/1.jpg"
            title="Paella dish"
          />
        </div>
      </Card>
      
      <Card className={classes.root}>
        <div className={classes.content}>
          <CardMedia
            className={classes.media}
            image="/images/3.jpg"
            title="Paella dish"
          />
        </div>
      </Card>
      <Card className={classes.root}>
        <div className={classes.content}>
          <CardMedia
            className={classes.media}
            image="/images/4.jpg"
            title="Paella dish"
          />
        </div>
      </Card>
      <Card className={classes.root}>
        <div className={classes.content}>
          <CardMedia
            className={classes.media}
            image="/images/5.jpg"
            title="Paella dish"
          />
        </div>
      </Card>
      <Card className={classes.root}>
        <div className={classes.content}>
          <CardMedia
            className={classes.media}
            image="/images/12.jpg"
            title="Paella dish"
          />
        </div>
      </Card>
      <Card className={classes.root}>
        <div className={classes.content}>
          <CardMedia
            className={classes.media}
            image="/images/2.jpg"
            title="Paella dish"
          />
        </div>
      </Card>
      <Card className={classes.root}>
        <div className={classes.content}>
          <CardMedia
            className={classes.media}
            image="/images/6.jpg"
            title="Paella dish"
          />
        </div>
      </Card>
      <Card className={classes.root}>
        <div className={classes.content}>
          <CardMedia
            className={classes.media}
            image="/images/17.jpg"
            title="Paella dish"
          />
        </div>
      </Card>
     
      <Card className={classes.root}>
        <div className={classes.content}>
          <CardMedia
            className={classes.media}
            image="/images/14.jpg"
            title="Paella dish"
          />
        </div>
      </Card>
      <Card className={classes.root}>
        <div className={classes.content}>
          <CardMedia
            className={classes.media}
            image="/images/9.jpg"
            title="Paella dish"
          />
        </div>
      </Card>
     
      <Card className={classes.root}>
        <div className={classes.content}>
          <CardMedia
            className={classes.media}
            image="/images/16.jpg"
            title="Paella dish"
          />
        </div>
      </Card>
      <Card className={classes.root}>
        <div className={classes.content}>
          <CardMedia
            className={classes.media}
            image="/images/18.jpg"
            title="Paella dish"
          />
        </div>
      </Card>
      <Card className={classes.root}>
        <div className={classes.content}>
          <CardMedia
            className={classes.media}
            image="/images/11.jpg"
            title="Paella dish"
          />
        </div>
      </Card>
      <Card className={classes.root}>
        <div className={classes.content}>
          <CardMedia
            className={classes.media}
            image="/images/24.jpg"
            title="Paella dish"
          />
        </div>
      </Card>
     
      <Card className={classes.root}>
        <div className={classes.content}>
          <CardMedia
            className={classes.media}
            image="/images/13.jpg"
            title="Paella dish"
          />
        </div>
      </Card>
      
      <Card className={classes.root}>
        <div className={classes.content}>
          <CardMedia
            className={classes.media}
            image="/images/8.jpg"
            title="Paella dish"
          />
        </div>
      </Card>
     
      <Card className={classes.root}>
        <div className={classes.content}>
          <CardMedia
            className={classes.media}
            image="/images/15.jpg"
            title="Paella dish"
          />
        </div>
      </Card>
     
      
    
      <Card className={classes.root}>
        <div className={classes.content}>
          <CardMedia
            className={classes.media}
            image="/images/19.png"
            title="Paella dish"
          />
        </div>
      </Card>
      <Card className={classes.root}>
        <div className={classes.content}>
          <CardMedia
            className={classes.media}
            image="/images/25.jpg"
            title="Paella dish"
          />
        </div>
      </Card>
      <Card className={classes.root}>
        <div className={classes.content}>
          <CardMedia
            className={classes.media}
            image="/images/20.png"
            title="Paella dish"
          />
        </div>
      </Card>
      <Card className={classes.root}>
        <div className={classes.content}>
          <CardMedia
            className={classes.media}
            image="/images/21.jpg"
            title="Paella dish"
          />
        </div>
      </Card>
      <Card className={classes.root}>
        <div className={classes.content}>
          <CardMedia
            className={classes.media}
            image="/images/10.jpg"
            title="Paella dish"
          />
        </div>
      </Card>
      <Card className={classes.root}>
        <div className={classes.content}>
          <CardMedia
            className={classes.media}
            image="/images/22.jpg"
            title="Paella dish"
          />
        </div>
      </Card>
      
    </React.Fragment>
    
  );
}
