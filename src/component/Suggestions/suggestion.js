import React from 'react'
import { Box, Card, List, Typography } from '@mui/material'
import "./suggestion.css"
import { setSearchDispatch, suggestionAPIData } from '@/Store/searchSlice'
import { useDispatch } from 'react-redux'

const Suggestions = ({ suggestionAPI }) => {
  const dispatch = useDispatch()
  return (
    <Card className='mainContainerSuggestion'>
      <List>
        {suggestionAPI?.products?.map((item) => (
          <Box
            key={item.id}
            className="suggestionItem"
            onClick={() => {
              dispatch(setSearchDispatch(item.title))
              dispatch(suggestionAPIData([]))
            }}
          >
            <img src={item.thumbnail} alt={item.title} className="suggestionImg" />

            <Box className="suggestionContent">
              <Typography className="title">{item.title}</Typography>
              <Typography className="price">₹ {item.price}</Typography>
            </Box>
          </Box>
        ))}
      </List>
    </Card>
  )
}

export default Suggestions