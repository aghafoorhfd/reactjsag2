// External Imports
import React from 'react'
import * as yup from 'yup'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'

const AddSchool = ({ setSchoolData, handleClose, handleNext }) => {
  const [companyLogo, setLogo] = useState(null)
  const [image, setImage] = useState('')
  const [logoError, setLogoError] = useState('')
  const [error, setError] = React.useState(null)

  const classes = {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    },
    avatar: {
      width: 150,
      height: 150
    },
    input: {
      display: 'none'
    }
  }

  const handleRemoveImage = () => {
    setImage(null)
  }

  const handleImageChange = async event => {
    const file = event.target.files[0]
    if (file) {
      setLogo(file)
      setLogoError('')
      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const defaultValue = {
    name: '',
    address: '',
    phoneNo: '',
    email: '',
    webUrl: '',
    trnTax: '',
  }

  const schema = yup.object().shape({
    name: yup.string().required(),
    address: yup.string().required(),
    trnTax: yup
      .string()
      .required()
      .min(10, 'Tax must be at least 10 characters')
      .max(10, 'Tax must be at most 10 characters'),
    webUrl: yup.string().url().required(),
    email: yup.string().email().required(),
    phoneNo: yup.string().typeError('Phone Number field is required').required()
  })

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValue,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    if (companyLogo) {
      setSchoolData(data)
      handleNext()
    } else {
      setLogoError('Please upload a Logo of School')
    }
  }

  return (
    <div className='relative'>
      <form className='' onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={7}>
            <Paper>
              <div className={classes.root} >
                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 5
                  }}
                >
                  {image ? (
                    <div className='flex gap-[10px] w-full items-center relative'>
                      <IconButton
                        sx={{ position: 'absolute', left: 85, top: -3, width: 15, height: 10, zIndex: '1' }}
                        onClick={handleRemoveImage}
                        color='secondary'
                      >
                        <RemoveCircleOutlineIcon sx={{ color: 'red', fontSize: 30 }} />
                      </IconButton>
                      <div>
                        <Avatar
                          src={image}
                          alt='Uploaded'
                          style={{
                            width: '96px',
                            height: '96px',
                            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                            borderRadius: '0px'
                          }}
                        />
                      </div>
                      <div className='flex flex-col gap-1 cursor-pointer'>
                        <span className='text-[#666666] font-medium text-[16px] cursor-pointer'>School logo</span>
                      </div>
                    </div>
                  ) : (
                    <div >
                      <label className='flex gap-[10px] w-full  items-center justify-start'>
                        <input accept='image/*' id='image-upload' type='file' onChange={handleImageChange} hidden className='!h-1 !w-1' />
                        <Avatar
                          alt='Uploaded'
                          style={{ width: '96px', height: '96px', cursor: 'pointer', border: '1px solid', borderRadius: '10px' }}
                          src='/images/schoolSetup/logoSchool.png'
                        />
                        <span className='text-[#666666] font-medium text-[16px] cursor-pointer'>School logo</span>
                      </label>
                      {logoError && <Alert severity='error' className='mt-2'>{logoError}</Alert>}
                    </div>
                  )}
                </Box>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value || ''}
                    onChange={onChange}
                    label="School Name"
                    error={Boolean(errors.name)}
                    helperText={errors.name ? errors.name.message : ''}
                    className=' p-[10px] '
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Controller
                name='address'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value || ''}
                    onChange={onChange}
                    label='School Address'
                    error={Boolean(errors.address)}
                    helperText={errors.address ? errors.address.message : ''}
                    className=' p-[10px] '
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} sm={4}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Controller
                name='phoneNo'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value || ''}
                    type='number'
                    onChange={onChange}
                    label='Phone Number'
                    error={Boolean(errors.phoneNo)}
                    helperText={errors.phoneNo ? errors.phoneNo.message : ''}
                    className=' p-[10px] '
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={6}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value || ''}
                    type='email'
                    onChange={onChange}
                    label='Email'
                    error={Boolean(errors.email)}
                    helperText={errors.email ? errors.email.message : ''}
                    className=' p-[10px] '
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={6} style={{ paddingTop: '20px' }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Controller
                name='webUrl'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value || ''}
                    type='text'
                    onChange={onChange}
                    placeholder='https://example.com'
                    label='Website'
                    error={Boolean(errors.webUrl)}
                    helperText={errors.webUrl ? errors.webUrl.message : ''}
                    className=' p-[10px] '
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={6} style={{ paddingTop: '20px' }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Controller
                name='trnTax'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value || ''}
                    type='number'
                    onChange={onChange}
                    label='School TAX/ TRN'
                    error={Boolean(errors.trnTax)}
                    helperText={errors.trnTax ? errors.trnTax.message : ''}
                    className=' p-[10px] '
                  />
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', gap: '10px', marginTop: '38px' }}>
          <Button
            sx={{
              mr: 1,
              width: '89px',
              height: '40px',
              borderRadius: '8px',
              border: '1px solid #115740',
              color: '#115740'
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            type='submit'
            sx={{
              mr: 1,
              width: '89px',
              height: '40px',
              borderRadius: '8px',
              border: '1px solid #115740',
              color: '#FFFFFF',
              backgroundColor: '#115740'
            }}
          >
            Next
          </Button>
        </Grid>
      </form>
    </div>
  )
}

export default AddSchool
