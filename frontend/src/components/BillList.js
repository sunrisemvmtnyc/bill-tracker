import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import BillListItem from './BillListItem';

const useStyles = makeStyles({
  list: {
    background: "transparent",
  },
});

export default function BillList() {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      flexWrap="nowrap"
      alignItems="center"
      p={1}
      bgcolor="background.paper"
      className={classes.list}
    >
      <BillListItem />
      <BillListItem />
      <BillListItem />
      <BillListItem />
      <BillListItem />
      <BillListItem />
      <BillListItem />
      <BillListItem />
    </Box>
  );
}
