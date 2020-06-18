import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Sigma, RandomizeNodePositions, RelativeSize } from 'react-sigma';

const useStyles = makeStyles({
  root: {
    margin: "10px",
    width: "1000px"
  },
  media: {
    height: 140,
  },
});

let myGraph = {
  nodes: [
    {id: "n1", label: "Introduced"},
    {id: "n2", label: "In Committee"},
    {id: "n3", label: "On Floor Calendar"},
    {id: "n4", label: "Passed Senate"},
    {id: "n5", label: "Passed Assembly"},
    {id: "n6", label: "Delivered to Governor"},
    {id: "n7", label: "Signed by Governor"}
  ],
  edges: [
    {id: "e1", source: "n1", target: "n2", label: ""},
    {id: "e2", source: "n2", target: "n3", label: ""},
    {id: "e3", source: "n3", target: "n4", label: ""},
    {id: "e4", source: "n3", target: "n5", label: ""},
    {id: "e5", source: "n4", target: "n6", label: ""},
    {id: "e6", source: "n5", target: "n6", label: ""},
    {id: "e7", source: "n6", target: "n7", label: ""},
  ]};

export default function BillListItem(props) {
  const classes = useStyles();
  const [billData, setBillData] = useState(null);

  useEffect(() => {
    if (!billData) {
      let response = fetch(`/api/v1/bill/${props.year}/${props.bill}`)
        .then(res => res.json())
        .then(data => {
          setBillData(data.result);
        });
    }
  });

  // Don't render anything if there is no data
  if (billData === null) {
    return "";
  }

  let billCode;
  if (billData && billData.billType.chamber === 'SENATE') {
    billCode = `Senate Bill ${billData.printNo}`;
  } else {
    billCode = `Assembly Bill ${billData.printNo}`;
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Box display="flex">
            <Box>
              <Typography gutterBottom align="left" variant="h4">
                {billCode}
              </Typography>

              <Typography gutterBottom align="left" variant="h6">
                {billData.title}
              </Typography>
            </Box>
            <Box>
              <Typography gutterBottom align="right" variant="h6">
                {billData.status.statusDesc}
              </Typography>
              <Box border={1} m={4}>
                <Sigma style={{position: 'relative', width:"600px", height:"200px"}}
                  graph={myGraph}
                  settings={{drawEdges: true, clone: false}}>
                  <RelativeSize initialSize={15}/>
                  <RandomizeNodePositions/>
                </Sigma>
              </Box>
            </Box>
          </Box>

        </CardContent>
      </CardActionArea>

      {false &&
      <CardActions>
        <Button size="small" color="primary">
          See Votes
        </Button>
      </CardActions>
      }
    </Card>
  );
}
