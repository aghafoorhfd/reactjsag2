import React, { useState } from 'react'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Icon from 'src/@core/components/icon'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Typography } from '@mui/material'
import { FadeLoader } from 'react-spinners'

import DetailModal from './detailModal'
import { remove } from 'src/services/school.service'
import toast from 'react-hot-toast'
import Lottie from 'lottie-react'
import DeleteGifIcon from 'src/gifs/delete.json'

const SchoolAction = ({ data, fetchSchools }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const [detailModal, setDetailModal] = useState(false)
  const [detailData, setDetailData] = useState(false)
  const rowOptionsOpen = Boolean(anchorEl)
  const [loading, setLoading] = useState(false)

  const ModalStyle2 = {
    borderRadius: '5px',
    position: 'relative'
  }
  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }
  const handleEdit = id => {
    openEditModal(true)
    setSchoolId(id)
    handleRowOptionsClose()
  }

  const handleClickOpen = () => {
    setOpen(true)
    handleRowOptionsClose()
  }

  const handleClose = () => {
    setOpen(false)
    handleRowOptionsClose()
  }

  const handleDetail = data => {
    setDetailData(data)
    handleOpen()
    handleRowOptionsClose()
  }

  const handleOpen = () => setDetailModal(true)
  const handleClosed = () => setDetailModal(false)

  const handleDelete = async id => {
    setLoading(true)
    const res = await remove(id)
    if (res?.success) {
      setLoading(false)
      handleClose()
      toast.success('School removed Successfully!')
      fetchSchools()
    } else {
      setLoading(false)
      toast.error(res.message)
    }
  }

  return (
    <div>
      <>
        <IconButton size='large' onClick={handleRowOptionsClick}>
          <Icon size='large' icon='mdi:dots-horizontal' />
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          PaperProps={{ style: { minWidth: '8rem' } }}
        >
          <MenuItem sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='tabler:edit' fontSize={20} />
            Edit
          </MenuItem>
          <MenuItem sx={{ '& svg': { mr: 2 } }} onClick={() => handleDetail(data)}>
            <Icon icon='bxs:user-detail' fontSize={20} />
            Detail
          </MenuItem>
          <MenuItem onClick={() => handleClickOpen()} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='mdi:delete-outline' fontSize={20} />
            Delete
          </MenuItem>
        </Menu>
        <Dialog open={open} onClose={handleClose}>
          {loading && (
            <div
              style={{
                width: '100%',
                height: '90%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                zIndex: 10
              }}
            >
              <FadeLoader color='#04463A' />
            </div>
          )}

          <Box sx={{ filter: loading ? 'blur(5px)' : 'none' }}>
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
                animationData={DeleteGifIcon}
                loop
                autoplay
                style={{ width: '300px', height: '250px' }}
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
                  {'Are you sure?'}
                </Typography>
                <Typography align='center'>{'You want to delete the school'}</Typography>
              </Box>
            </DialogContent>
            <DialogActions sx={{ mb: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                variant='contained'
                onClick={handleClose}
                sx={{
                  backgroundColor: '#B9BBBD',
                  width: '100px'
                }}
                color='secondary'
              >
                No
              </Button>
              <Button
                variant='contained'
                onClick={() => handleDelete(data?.schoolID)}
                sx={{
                  backgroundColor: '#FB4B4B',
                  width: '100px',
                  '&:hover': {
                    backgroundColor: 'red'
                  }
                }}
              >
                Yes
              </Button>
            </DialogActions>
          </Box>
        </Dialog>

        <Dialog
          fullWidth
          open={detailModal}
          maxWidth='md'
          scroll='body'
          onClose={handleClosed}
          onBackdropClick={handleClose}
        >
          <DialogContent style={{ backgroundColor: '#F1F0F4' }} className='!p-0'>
            <Box sx={ModalStyle2}>
              <IconButton
                edge='end'
                color='inherit'
                onClick={handleClosed}
                aria-label='close'
                sx={{
                  position: 'absolute',
                  top: '10px',
                  right: '25px',
                  backgroundColor: '#286753',
                  color: '#ffffff'
                }}
              >
                <CloseIcon className='border border-[white] rounded-full' />
              </IconButton>
              <DetailModal selectedData={data} />
            </Box>
          </DialogContent>
        </Dialog>
      </>
    </div>
  )
}

export default SchoolAction
