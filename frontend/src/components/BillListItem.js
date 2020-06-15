import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    margin: "10px",
    width: "600px"
  },
  media: {
    height: 140,
  },
});

export default function BillListItem() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>

      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Assembly Bill A10611
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            Relates to the disclosure of law enforcement disciplinary records;
            and to repeal section 50-a of the civil rights law relating thereto
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Button size="small" color="primary">
          See Votes
        </Button>
      </CardActions>

    </Card>
  );
}
