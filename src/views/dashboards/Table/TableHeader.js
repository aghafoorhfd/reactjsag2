// External Imports

import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

const TableHeader = props => {
  // ** Props
  const { pageTitle } = props

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: '20px',
        pb: '6px',
        pt: '18px'
      }}
    >
      <Typography sx={{ fontSize: '18px', fontWeight: '600', color: '#333' }}>{pageTitle}</Typography>
      <Typography sx={{ fontSize: '14px', fontWeight: '600', color: '#115740', textDecoration: 'underline', cursor: 'pointer' }}>
        Viwe all
      </Typography>
    </Box>
  )
}

export default TableHeader
