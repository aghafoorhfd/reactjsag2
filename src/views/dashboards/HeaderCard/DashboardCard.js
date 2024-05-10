// External Imports
import { Box, Card, Typography } from '@mui/material'

// Internal Imports
import InfoIcon from '@mui/icons-material/Info'
import MovingIcon from '@mui/icons-material/Moving'

const DashboardCard = ({ item, index }) => {
  const getRandomColor = index => {
    const colors = ['#FFCDD2', '#e8fdf3', '#f5f5dc', '#e8fdf8', '#f4ebf9']
    return colors[index % colors.length]
  }
  const getRandomColorText = index => {
    const colors = ['#F04438', '#12B76A', '#FBBE4D', '#2AE8BB', '#B794F3']
    return colors[index % colors.length]
  }
  return (
    <>
      <Card
        sx={{
          backgroundColor: 'white',
          height: 'auto',
          borderRadius: '16px',
          padding: '24px',
          maxHeight: '161px',
          boxShadow: 'none',
          width: '100%'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className='text-black text-[14px] font-semibold gap-[8px]'>
            <Typography sx={{ width: '154px', fontWeight: '600' }}>{item?.name}</Typography>
          </div>
          <div>
            <span>
              <InfoIcon sx={{ height: '20px', width: '20px' }} />
            </span>
          </div>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: '5px' }}>
          <Typography
            sx={{
              fontSize: '20px',
              color: getRandomColorText(index),
              fontWeight: '600',
              borderRadius: '100px',
              backgroundColor: getRandomColor(index),
              px: '8px',
              py: '5px',
              width: '42px'
            }}
          >
            {item?.count}
          </Typography>
          <div>
            <Typography sx={{ fontSize: '12px', fontWeight: '400' }}>
              -0.03%{' '}
              <span>
                <MovingIcon sx={{ height: '16px', width: '16px' }} />
              </span>
            </Typography>
            <Typography sx={{ fontSize: '12px', fontWeight: '400', display: 'flex', justifyContent: 'flex-end' }}>
              Today
            </Typography>
          </div>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '14px',
            fontWeight: '600',
            paddingTop: '5px'
          }}
        >
          <Typography>10</Typography>
          <Typography>60</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography sx={{ fontSize: '12px', fontWeight: '400' }}>{item?.serve}</Typography>
          <Typography sx={{ fontSize: '12px', fontWeight: '400' }}>{item?.total}</Typography>
        </Box>
      </Card>
    </>
  )
}

export default DashboardCard
