// External Imports
import React from 'react'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Box } from '@mui/system'

const DonutChart = () => {
  const [stages, setStages] = React.useState('')

  const handleChange = event => {
    setStages(event.target.value)
  }

  const seriesData = [65, 35]

  const optionsData = {
    chart: {
      type: 'donut'
    },
    plotOptions: {
      pie: {
        expandOnClick: true,
        customScale: 1,
        donut: {
          size: '65%',
          labels: {
            show: true,
            name: {
              show: true,
              text: '12',
              offsetY: -10,
              formatter(val) {
                return 'Totalclasses'
              }
            },
            value: {
              show: true,
              text: 'Totalclasses',
              offsetY: 16,
              formatter(val) {
                return '12'
              }
            }
          },
          hover: {
            enabled: false // Disable color highlight on hover
          }
        }
      }
    },
    legend: {
      show: false // Hide the legend
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 100
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ],
    fill: {
      colors: ['#709A8C', '#ffb3c0']
    }
  }

  return (
    <Box xs={12} md={12} sx={{ backgroundColor: 'white', borderRadius: '16px', height: '382px' }}>
      <Typography sx={{ fontSize: '16px', fontWeight: '600', color: '#333333', pt: '15px', pl: '20px' }}>
        Classes Attendance
      </Typography>
      <FormControl sx={{ maxWidth: '115px', mt: '10px', ml: '20px' }} size='small'>
        <InputLabel id='demo-simple-select-label'>Stages</InputLabel>
        <Select
          labelId='demo-simple-select-label' autoWidth
          id='demo-simple-select'
          value={stages}
          label='Stages'
          onChange={handleChange}
        >
          <MenuItem value={10}>Elementry</MenuItem>
          <MenuItem value={20}>Middle</MenuItem>
          <MenuItem value={30}>High</MenuItem>
        </Select>
      </FormControl>
      <div id='chart'>
        <ReactApexcharts options={optionsData} series={seriesData} type='donut' height='195px' />
      </div>

      <Typography
        sx={{
          fontSize: '15px',
          fontWeight: '600',
          display: 'flex',
          justifyContent: 'center',
          color: '#242424',
          mt: '10px'
        }}
      >
        Period 1
      </Typography>
      <div className='flex gap-[15px] justify-center font-semibold text-[#FFFFFF] text-[10px] mt-[30px]'>
        <div className='  bg-[#709A8C] px-[17px] py-[5px] rounded-[5px] h-auto ml-[33px] mb-[27px]'>Submit (10)</div>
        <div className='bg-[#FF715B] px-[17px] py-[5px] rounded-[5px] h-auto mr-[32px] mb-[27px]'>Pending (02)</div>
      </div>
    </Box>
  )
}

export default DonutChart
