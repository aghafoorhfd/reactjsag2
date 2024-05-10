import React from 'react'
import { Grid } from '@mui/material'

import SchoolCard from './schoolCard'

const GridList = ({ data, fetchSchools }) => {
  return (
    <Grid container spacing={2}>
      {data?.map((item, index) => {
        return (
          <Grid key={index} item sm={12} md={12} lg={6} xl={4} xxl={4}>
            <SchoolCard item={item} fetchSchools={fetchSchools} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default GridList
