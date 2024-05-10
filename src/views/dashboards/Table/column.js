// External Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CustomAvatar from 'src/@core/components/mui/avatar'

const Columns = () => {
  const renderClient = row => {
    if (row?.url) {
      return <CustomAvatar src={row.url} sx={{ mr: 3, width: 34, height: 34 }} />
    } else {
      return (
        <CustomAvatar
          skin='light'
          color={row.avatarColor || 'primary'}
          sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
        >
        </CustomAvatar>
      )
    }
  }
  const column = [
    {
      flex: 0.05,
      minWidth: 100,
      field: 'id',
      headerName: 'Student ID',
      align: 'center',
      headerAlign: 'center'
    },
    {
      flex: 0.05,
      minWidth: 100,
      field: 'url',
      headerName: 'Profile',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', height: 'fit-content' }}>
            {renderClient(row)}
          </Box>
        )
      }
    },
    {
      flex: 0.05,
      minWidth: 100,
      field: 'name',
      headerName: 'Name',
      align: 'center',
      headerAlign: 'center'
    },
    {
      flex: 0.05,
      minWidth: 100,
      field: 'phone',
      headerName: 'Grade ',
      align: 'center',
      headerAlign: 'center'
    },
    {
      flex: 0.05,
      minWidth: 100,
      field: 'checkoutby',
      headerName: 'Check out by ',
      align: 'center',
      headerAlign: 'center'
    },
    {
      flex: 0.05,
      minWidth: 100,
      field: 'category',
      headerName: 'Category',
      align: 'center',
      headerAlign: 'center'
    },
    {
      flex: 0.05,
      minWidth: 100,
      field: 'time',
      headerName: 'Timer',
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => {
        const { time } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }} >
            <Typography
              sx={{
                padding: '10px',
                backgroundColor: '#CFDDD9',
                height: 'auto',
                width: 'auto',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#333',
                fontWeight: '500'
              }}
            >
              {time}
            </Typography>
          </Box>
        )
      }
    }
  ]

  return column
}

export default Columns
