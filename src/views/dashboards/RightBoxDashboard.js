// External Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import RecentConduct from './RecentConduct'
import CardContent from '@mui/material/CardContent'

const Conduct = [
  {
    title: 'Recent Conduct',
    view: 'View all',
    data: [
      {
        image: 'https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=600',
        name: 'Rayna Gouse',
        time: '20 Sec',
        descrypt: 'Dirty Uniform and not tie.',
        status: 'Negative',
        date: '25-10-2023'
      },
      {
        image: 'https://images.pexels.com/photos/1326946/pexels-photo-1326946.jpeg?auto=compress&cs=tinysrgb&w=600',
        name: 'Skylar Bergson',
        time: '2 Sec',
        descrypt: 'Dirty Uniform and not tie.',
        status: 'Positive',
        date: '25-10-2023'
      },
      {
        image: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=600',
        name: 'Talan Stanton',
        time: '1 min',
        descrypt: 'Dirty Uniform and not tie.',
        status: 'Negative',
        date: '25-10-2023'
      }
    ]
  },
  {
    title: 'Recent Acadamic',
    view: 'View all',
    data: [
      {
        image: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=600',
        name: 'Gretchen Mango',
        time: '20 Sec',
        descrypt: 'Dirty Uniform and not tie.',
        status: 'Negative',
        date: '25-10-2023'
      },
      {
        image: 'https://images.pexels.com/photos/1326947/pexels-photo-1326947.jpeg?auto=compress&cs=tinysrgb&w=600',
        name: 'Zaire Septimus',
        time: '2 Sec',
        descrypt: 'Dirty Uniform and not tie.',
        status: 'Positive',
        date: '25-10-2023'
      },
      {
        image: 'https://images.pexels.com/photos/3184407/pexels-photo-3184407.jpeg?auto=compress&cs=tinysrgb&w=600',
        name: 'Jocelyn Dokidis',
        time: '1 min',
        descrypt: 'Dirty Uniform and not tie.',
        status: 'Negative',
        date: '25-10-2023'
      }
    ]
  },
  {
    title: 'Attendance',
    view: 'View all',
    data: [
      {
        image: 'https://images.pexels.com/photos/1007066/pexels-photo-1007066.jpeg?auto=compress&cs=tinysrgb&w=600',
        name: 'Gretchen Mangoe',
        number: '+966 1234567 ',
        status: 'No-Show',
        date: '25-10-2023'
      },
      {
        image: 'https://images.pexels.com/photos/1152500/pexels-photo-1152500.jpeg?auto=compress&cs=tinysrgb&w=600',
        name: 'Zaire Septimus',
        number: '+966 1234567 ',
        status: 'No-Show',
        date: '25-10-2023'
      }
    ]
  }
]

const RightBoxDashboard = () => {
  return (
    <Card sx={{ position: 'relative', height: '100%', borderRadius: '16px', boxShadow: 'none' }}>
      <CardContent className='!pt-5 !pb-0 !px-0 !mx-3 '>
        {
          Conduct?.map((item, index) => {
            return (
              <div key={index}>
                <Grid item xs={12} className=''>
                  <RecentConduct data={item?.data} head={item} />
                </Grid>
                {Conduct.length - 1 !== index && <Divider className='!mt-[20px] !mb-[20px]' />}
              </div>
            )
          })
        }
      </CardContent>
    </Card>
  )
}

export default RightBoxDashboard
