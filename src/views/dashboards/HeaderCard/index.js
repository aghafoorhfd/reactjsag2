import Grid from '@mui/material/Grid'
import DashboardCard from './DashboardCard'

const conduct = [
  {
    id: 1,
    name: 'Nagative Conduct',
    total: 'Total Conduct',
    count: '50'
  },
  {
    id: 2,
    name: 'Positive Conduct',
    total: 'All Positive conduct',
    count: '30'
  },
  {
    id: 3,
    name: 'Checkout',
    total: 'Total Check Out',
    count: '22'
  },
  {
    id: 4,
    name: 'No Show',
    total: 'Total No Show',
    count: '34'
  },
  {
    id: 5,
    name: 'Grade Attendance',
    total: 'Total Attendance',
    count: '08'
  }
]
const HeaderCard = () => {

  return (
    <Grid container spacing={3}>
      {conduct?.map((item, index) => {
        return (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3} xxl={2.4} sx={{ display: 'flex' }}>
            <DashboardCard item={item} index={index} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default HeaderCard
