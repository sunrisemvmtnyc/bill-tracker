import React, {useState} from 'react';

import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const Search = (props) => {
  const [search, setSearch] = useState('');

  const submit = (e) => {
    e.preventDefault()
    props.setSearchText(search)
  }

  return (
    <Box bgcolor="white">
      <form onSubmit={submit}>
        <TextField label="Search" variant="outlined" value={search} onChange={(e) => setSearch(e.target.value)}/>
        <Button type="submit" color="Primary">Search</Button>
      </form>
    </Box>
  )
}

export default Search;