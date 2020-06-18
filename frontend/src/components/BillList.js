import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { palette } from '@material-ui/system';
import Typography from '@material-ui/core/Typography';

import BillListItem from './BillListItem';

const useStyles = makeStyles({
  header: { color: 'white' },
  list: {
    background: "transparent",
  },
});

export default function BillList(props) {
  const classes = useStyles();

  return (
    <Box display="flex"
      flexDirection="column"
      flexWrap="nowrap"
      alignItems="center"
      p={1}
      bgcolor="background.paper"
      className={classes.list}
    >
      <Box color="text.primary">
        <Typography gutterBottom className={classes.header} variant="h4">
          List of all the bills.
        </Typography>
      </Box>
      {props.bills.map((value, index) => {
        return <BillListItem key={index} year={value[0]} bill={value[1]} />;
      })}
    </Box>
  );
}
