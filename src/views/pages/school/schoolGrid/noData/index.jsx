import Image from 'next/image'

import { Box, Typography, Button } from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint'

const NoData = ({ handleOpen }) => {
  return (
    <Box
      sx={{
        pt: '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Image alt='no school' height={450} width={450} src={'/images/no_school.png'} />
      <Typography sx={{ my: 5, fontSize: '18px', color: '#999999', fontWeight: 500 }}>No Schools</Typography>
      <Button variant='contained' color='primary' onClick={handleOpen}>
        <ControlPointIcon sx={{ marginRight: 2 }} />
        <Typography sx={{ fontSize: '18px' }} color={'white'} variant='button' display='inline' >
          Add School
        </Typography>
      </Button>
    </Box>
  )
}

export default NoData
