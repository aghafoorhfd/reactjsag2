import React, { useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { Box, Typography } from '@mui/material'
import Lottie from 'lottie-react'

const SuccessFullyDoneModal = props => {
  const { open, handleClose, heading, subHeading, animationData, animationWidth, animationHeight } = props

  useEffect(() => {
    // Automatically close the modal after 5 seconds
    const timeoutId = setTimeout(() => {
      handleClose()
    }, 3000) // 5 seconds in milliseconds

    // Clear the timeout when the component unmounts or when the modal is manually closed
    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box>
        <DialogContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          <Lottie
            animationData={animationData}
            loop
            autoplay
            style={{ width: animationWidth, height: animationHeight }}
            rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
          />
          <Box sx={{ mt: '10px', width: '25vw' }}>
            <Typography
              sx={{
                mb: 2,
                fontSize: '26px',
                fontWeight: '600',
                color: theme => theme.palette.color.default
              }}
              align='center'
            >
              {heading}
            </Typography>
            <Typography align='center'>{subHeading}</Typography>
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  )
}
export default SuccessFullyDoneModal
