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

import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    margin: "10px",
    width: "1000px"
  },

  none: {},
  greenBG: {
    background: 'green',
    border: '10px solid white',
    borderRadius: '30px'
  },

  media: { height: 140, },

  billName: {
    fontSize: '1.2rem',
    width: '100px'
  }
});


function stepCompleted(billData, step) {
  const completedSteps = {
    'IN_SENATE_COMM': ['In Committee'],
    'SENATE_FLOOR': ['In Committee', 'On Floor Calendar'],
    'PASSED_SENATE': ['In Committee', 'On Floor Calendar', 'Passed Senate'],

    'IN_ASSEMBLY_COMM': ['In Committee'],
    'ASSEMBLY_FLOOR': ['In Committee', 'On Floor Calendar'],
    'PASSED_ASSEMBLY': ['In Committee', 'On Floor Calendar', 'Passed Assembly'],

    'DELIVERED_TO_GOV': ['In Committee', 'On Floor Calendar', 'Passed Senate', 'Passed Assembly', 'Delivered to Governor'],
    'SIGNED_BY_GOV': ['In Committee', 'On Floor Calendar', 'Passed Senate', 'Passed Assembly', 'Delivered to Governor', 'Signed by Governor'],
    'VETOED': ['In Committee', 'On Floor Calendar', 'Passed Senate', 'Passed Assembly', 'Delivered to Governor', 'Vetoed'],
  }[billData.status.statusType] || [];

  console.log('debug', completedSteps.includes(step));
  return completedSteps.includes(step);
}

export default function BillListItem(props) {
  const c = useStyles();
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

  // Prepare the full bill name
  let fullBillName;
  if (billData.billType.chamber === 'SENATE') {
    fullBillName = `Senate Bill ${billData.printNo}`;
  } else {
    fullBillName = `Assembly Bill ${billData.printNo}`;
  }

  let billURL = `https://www.nysenate.gov/legislation/bills/${billData.session}/${billData.printNo}`;

  return (
    <TableRow key={billData.printNo}>
      <TableCell component="th" scope="row" colspan={2} align="center" className={c.billName}>
        <Link target="_blank" href={billURL}>
          {fullBillName}
        </Link>
      </TableCell>
      <TableCell className={c.greenBG}></TableCell>
      <TableCell className={stepCompleted(billData, 'In Committee') ? c.greenBG : c.none}></TableCell>
      <TableCell className={stepCompleted(billData, 'On Floor Calendar') ? c.greenBG : c.none}></TableCell>
      <TableCell className={stepCompleted(billData, 'Passed Senate') ? c.greenBG : c.none}></TableCell>
      <TableCell className={stepCompleted(billData, 'Passed Assembly') ? c.greenBG : c.none}></TableCell>
      <TableCell className={stepCompleted(billData, 'Delivered to Governor') ? c.greenBG : c.none}></TableCell>
      <TableCell className={stepCompleted(billData, 'Signed by Governor') ? c.greenBG : c.none}></TableCell>
    </TableRow>
  );
}
