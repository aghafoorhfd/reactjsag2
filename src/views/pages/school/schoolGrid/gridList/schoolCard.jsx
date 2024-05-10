import React from 'react'

import Typography from '@mui/material/Typography'
import { Card, Avatar, Box } from '@mui/material'

import { formatDate } from 'src/@core/utils/format'
import SchoolAction from './schoolAction'

const SchoolCard = ({ item, fetchSchools }) => {
  return (
    <Card
      sx={{
        backgroundColor: theme => theme.palette.background.default,
        borderRadius: '8px',
        px: '15px',
        py: '15px',
        boxShadow: 'none',
        height: '100%'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Avatar
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgRhVikacLUUU6VMsAllqGqrgkfziWP0PN8Fde6kpPuQ&s'
          sx={{
            width: '80px',
            height: '80px',
            borderRadius: '10px',
            border: '1px solid #B9BBBD',
            background: '#F8F8F8'
          }}
          variant='square'
        />
        <SchoolAction data={item} fetchSchools={fetchSchools} />
      </Box>
      <Box sx={{ mt: '10px' }}>
        <Typography
          variant='p'
          sx={{ mb: 2, fontSize: '26px', fontWeight: '600', color: theme => theme.palette.color.default }}
        >
          {item?.name}
        </Typography>
        <Typography>{item?.address}</Typography>
        <Typography>{item?.phoneNo}</Typography>
      </Box>

      <Box sx={{ mt: '8px', display: 'flex', gap: '10px' }}>
        <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>{'Academic Year'}</Typography>
        <Box sx={{ display: 'flex', gap: '8px' }}>
          <Typography sx={{ color: theme => theme.palette.color.default, fontSize: '16px', fontWeight: '500' }}>
            {formatDate(item?.acadamicYear[0]?.start)}
          </Typography>
          <Typography sx={{ color: theme => theme.palette.color.default, fontSize: '16px', fontWeight: '500' }}>
            {'To'}
          </Typography>
          <Typography sx={{ color: theme => theme.palette.color.default, fontSize: '16px', fontWeight: '500' }}>
            {formatDate(item?.acadamicYear[0]?.end)}
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default SchoolCard
