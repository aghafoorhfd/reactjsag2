// External Imports
import Card from '@mui/material/Card'
import Badge from '@mui/material/Badge'
import React, { useState } from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import ReactApexcharts from 'src/@core/components/react-apexcharts'


const getRandomColor = index => {
  const colors = ['#F04438', '#12B76A', '#FDB022', '#A97CF2']
  return colors[index % colors.length]
}

const ChartText = [
  {
    title: 'Negative conduct'
  },
  {
    title: 'Positive conduct'
  },
  {
    title: 'Check-Out'
  },
  {
    title: 'Attendence'
  }
]

const LineChart = () => {

  const [selectedItem, setSelectedItem] = useState('')

  const handleDropdownChange = event => {
    setSelectedItem(event.target.value)
  }

  const options = {
    chart: {
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: false,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false | '<img src="/static/icons/reset.png" width="20">',
          customIcons: []
        },
        export: {
          csv: {
            filename: undefined,
            columnDelimiter: ',',
            headerCategory: 'category',
            headerValue: 'value',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString()
            }
          },
          svg: {
            filename: undefined
          },
          png: {
            filename: undefined
          }
        },
        autoSelected: 'zoom'
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    yaxis: {
      min: 0,
      max: 15,
      tickAmount: 3
    },

    colors: ['#F04438', '#12B76A', '#FDB022', '#A97CF2'],
    stroke: {
      show: true,
      curve: 'smooth',
      lineCap: 'butt',
      width: 2,
      dashArray: 0
    },
    tooltip: {
      enabled: true,
      x: {
        show: true,
      },
      y: {
        formatter: function (value, { seriesIndex }) {
          const tooltips = ['Negative conduct', 'Positive conduct', 'Check-Out', 'Attendance'];
          return tooltips[seriesIndex] ? tooltips[seriesIndex] + ': ' + value : '';
        },
      },

    },

    legend: {
      show: false,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: 'top',
      horizontalAlign: 'right',
      floating: false,
      fontSize: '12px',
      color: '#666666',
      fontWeight: 400,
      formatter: undefined,
      inverseOrder: false,
      width: undefined,
      height: undefined,
      tooltipHoverFormatter: undefined,
      customLegendItems: ['Negative conduct', 'Positive conduct', 'Check-Out', 'Attendence'],
      offsetX: 0,
      offsetY: 0,
      labels: {
        colors: undefined,
        useSeriesColors: false
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: '#fff',
        fillColors: undefined,
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,
        offsetY: 0
      },
      itemMargin: {
        horizontal: 5,
        vertical: 0
      },
      onItemClick: {
        toggleDataSeries: true
      },
      onItemHover: {
        highlightDataSeries: true
      },
    },
  }

  const series = [
    {
      data: [0, 10, 5, 4, 13, 11]
    },
    {
      data: [0, 13, 3, 1, 7, 14]
    },
    {
      data: [0, 1, 6, 8, 9, 1]
    },
    {
      data: [0, 3, 14, 10, 3, 5]
    }
  ]

  return (
    <Card sx={{ height: 382, boxShadow: 'none' }}>
      <CardContent className='!pt-[27px] !pb-[34px] !px-[24px] flex justify-center items-center relative flex-col '>
        <div className='flex justify-between w-full border-b-2 border-[#E5E5EF] pb-[18px] gap-[12px]'>
          <div className=' flex gap-[7px] items-center justify-center'>
            <p className='!text-[14px] font-medium leading-[21px] text-[#242424] !p-0 !m-0 !mt-[3px]' >Filter</p>
            <FormControl size="small" sx={{ maxWidth: '129px' }} >
              <Select
                value={selectedItem}
                onChange={handleDropdownChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Select Legend Item' }}
                labelId="demo-select-small-label" autoWidth
              >
                <MenuItem value='' >
                  All
                </MenuItem>
                <MenuItem value={10}>Negative conduct</MenuItem>
                <MenuItem value={20}>Positive conduct</MenuItem>
                <MenuItem value={30}>Check-Out</MenuItem>
                <MenuItem value={30}>Attendence</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ maxWidth: '114px' }}>
              <Select
                value={selectedItem}
                onChange={handleDropdownChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Select Legend Item' }}
                labelId="demo-select-small-label"
                autoWidth
              >
                <MenuItem value='' >
                  6 month
                </MenuItem>
                <MenuItem value={10}>2 Month</MenuItem>
                <MenuItem value={20}>3 Month</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className='flex  items-center  flex-wrap gap-2'>
            {
              ChartText.map((elem, index) => {
                const avatarColor = getRandomColor(index)
                return (
                  <div key={index} className='flex gap-2 justify-start items-center'>
                    <Badge className='w-[8px] h-[8px]  rounded-[100%]' badgeContent=' ' style={{ backgroundColor: avatarColor }} />
                    <p className='!p-0 !m-0 text-[12px] font-normal leading-[16px] text-[#666666]'>{elem?.title}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div style={{ width: '100%', height: '280px' }}>
          <ReactApexcharts options={options} series={series} type='line' width='100%' height='100%' className="!mt-[10px]" />
        </div>
      </CardContent>
    </Card>
  )
}

export default LineChart
