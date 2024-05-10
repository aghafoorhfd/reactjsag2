// External Imports
import * as React from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import Badge from '@mui/material/Badge'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const ConductCard = ({ data, index }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        backgroundColor: '#F2F4F7',
        px: '10px',
        py: '15px',
        alignItems: 'center',
        borderRadius: '8px',
        marginBottom: '5px',
        boxShadow: 'none'
      }}
      key={index}
    >
      <Badge className='w-[8.85px] h-[8.85px] bg-[#F04438] rounded-[100%] mr-1' badgeContent=' ' />
      <CardMedia
        component='img'
        sx={{ width: 44, borderRadius: '100%', height: 44, mr: '10px' }}
        image={data?.image}
        alt='Live from space album cover'
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <CardContent className='flex justify-between w-full !p-0 '>
          <div>
            <Typography sx={{ fontSize: '14px', fontWeight: 600, lineHeight: '20px', color: '#242424' }}>
              {data?.name}
            </Typography>
            <Typography
              sx={{ fontSize: '12px', fontWeight: 400, lineHeight: '20px', color: '#666666' }}
              className='w-[90%] 2xl:w-full'
            >
              {data?.descrypt}
            </Typography>
            {data?.number && (
              <Typography sx={{ fontSize: '12px', fontWeight: 400, lineHeight: '20px', color: '#666666' }}>
                Cell #: {data?.number}
              </Typography>
            )}
            <div className='flex gap-2 items-start xl:items-start 2xl:items-center  flex-col md:flex-col lg:flex-col xl:flex-col 2xl:flex-row '>
              <Chip
                label={data?.status}
                className={`!text-[#666666] ${data?.status === 'Positive' ? '!bg-[#D1FADF]' : '!bg-[#FECDCA]'
                  } text-[12px] font-normal leading-5 !h-[20px]`}
              />
              <Typography
                sx={{ fontSize: '12px', fontWeight: 400, lineHeight: '20px', color: '#666666' }}
                className='!ml-1 2xl:!ml-0'
              >
                {data?.date}
              </Typography>
            </div>
          </div>
          <div className=''>
            <Typography
              sx={{ fontSize: '12px', fontWeight: 400, lineHeight: '20px', color: '#666666', textAlign: 'right' }}
            >
              {data?.time}
            </Typography>
          </div>
        </CardContent>
      </Box>
    </Card>
  )
}

export default ConductCard
