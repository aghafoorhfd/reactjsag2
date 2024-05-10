import React from 'react'
import * as yup from 'yup'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import { Alert, Box } from '@mui/material'
import { useRef, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import FormHelperText from '@mui/material/FormHelperText'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

const AddCampus = ({ handleClose, handleComplete, setSchoolData, schoolData }) => {
  const defaultValues = {
    name: '',
    stages: []
  }

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    stages: yup.array().min(1, 'At least one stages is required')
  })
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const [gridItems, setGridItems] = useState([{ id: 0, name: '', stages: [] }])
  const [error, setError] = useState('')
  const nextId = useRef(1) // To generate unique IDs
  const [hasValidationError, setHasValidationError] = useState(false)
  const handleAddGridItem = isEdit => {
    setGridItems(prevItems => [...prevItems, { id: nextId.current, name: '', stages: [] }])
    nextId.current += 1
  }

  const handleRemoveGridItem = id => {
    if (gridItems.length === 1) {
      return
    }
    setGridItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  const handleInputChange = (id, fieldName, value) => {
    if (value) {
      setError('')
    }
    setGridItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          return { ...item, [fieldName]: value }
        }
        return item
      })
    )
  }

  const handleEnterPress = (id, inputText) => {
    if (event.key === 'Enter' && inputText.trim() !== '') {
      setGridItems(prevItems =>
        prevItems.map(item => {
          if (item.id === id) {
            const updatedStage = [...item.stages, { name: inputText.trim() }]
            return { ...item, stages: updatedStage, stageName: '' }
          }
          return item
        })
      )
    }
  }

  const handleAddChip = (id, inputText) => {
    if (inputText && inputText.trim() !== '') {
      setGridItems(prevItems =>
        prevItems.map(item => {
          if (item.id === id) {
            const updatedStage = [...item.stages, { name: inputText.trim() }]
            return { ...item, stages: updatedStage, stageName: '' }
          }
          return item
        })
      )
    }
  }

  const handleDeleteChip = (id, indexToRemove) => {
    setGridItems(prevItems =>
      prevItems.map((item, index) =>
        item.id === id
          ? {
              ...item,
              stages: item.stages ? item.stages.filter((_, idx) => idx !== indexToRemove) : item.stages
            }
          : item
      )
    )
  }

  const handleClickChip = (id, indexToRemove, value) => {
    setGridItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          return { ...item, ['stages']: value }
        }
        return item
      })
    )
    setGridItems(prevItems =>
      prevItems.map((item, index) =>
        item.id === id
          ? {
              ...item,
              stages: item.stages ? item.stages.filter((_, idx) => idx !== indexToRemove) : item.stages
            }
          : item
      )
    )
  }
  // To Do: fix workingDays and profileId data
  const onSubmit = () => {
    if (gridItems.every(item => item.name.trim() !== '' && item.stages.length > 0)) {
      const addCampusData = {
        ...schoolData,
        profileId: 1,
        Campus: gridItems?.map(item => {
          return {
            name: item?.name,
            stages: item?.stages
          }
        })
      }
      setSchoolData(addCampusData)
      handleComplete(addCampusData)
    } else {
      setError('Please Add at least one campus and stage')
    }
  }

  return (
    <div className='relative'>
      <form onSubmit={handleSubmit(onSubmit)} className='pl-[20px] mb-5'>
        <Grid container spacing={5}>
          <div className='w-full mt-5 pt-5  overflow-y-auto h-[270px]' id='AddCampusBar'>
            {gridItems?.map((item, index) => (
              <Grid container spacing={3} key={index} className='w-full mt-3 mb-3'>
                <Grid item xs={6} className='w-full'>
                  <FormControl fullWidth sx={{ mb: 1 }}>
                    <Controller
                      name={`name_${item.id}`}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          name={`name_${item.id}`}
                          label='Campus Name'
                          value={value}
                          onChange={e => handleInputChange(item.id, 'name', e.target.value)}
                          placeholder='Enter Campus Name'
                          className='w-full'
                        />
                      )}
                    />
                    {errors[`name_${item.id}`] && (
                      <FormHelperText sx={{ color: 'error.main' }}>{errors[`name_${item.id}`].message}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={6} className='w-full relative'>
                  <TextField
                    fullWidth
                    label='Enter Stage Name'
                    placeholder='Please Enter Stage Name'
                    value={item?.stageName}
                    onChange={e => handleInputChange(item.id, 'stageName', e.target.value)}
                    onKeyPress={() => handleEnterPress(item?.id, item.stageName)}
                    InputProps={{
                      endAdornment: (
                        <Chip
                          label='Add'
                          clickable
                          onClick={() => handleAddChip(item?.id, item.stageName)}
                          color='primary'
                          variant='outlined'
                          style={{ margin: '2px' }}
                        />
                      )
                    }}
                  />
                </Grid>
                <Grid xs={6}></Grid>
                <Grid item xs={6}>
                  <div style={{ marginBottom: '2px', display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    {item?.stages?.map((stageObj, index) => (
                      <Chip
                        // onClick={() => handleClickChip(item?.id, index, stageObj.name)}
                        onDelete={() => handleDeleteChip(item?.id, index)}
                        key={index}
                        label={stageObj.name} // Render the 'name' property
                      />
                    ))}
                  </div>
                </Grid>
                <Grid item xs={12} className='w-full text-center flex justify-between items-end'>
                  {gridItems?.length - 1 === index ? (
                    <Button
                      variant='text'
                      onClick={() => handleAddGridItem()}
                      sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <AddCircleOutlineIcon /> <p style={{ marginLeft: '5px' }}>Add Another Campus</p>
                    </Button>
                  ) : (
                    <Box></Box>
                  )}
                  {index !== 0 ? (
                    <Button
                      sx={{ color: 'red' }}
                      variant='text'
                      onClick={() => {
                        if (!item?.isCreate) {
                          //   handleDeleteCampus(item?.id)
                          // } else {
                          handleRemoveGridItem(item.id)
                        }
                      }}
                    >
                      <DeleteForeverIcon /> <p style={{ marginLeft: '5px' }}>Remove</p>{' '}
                    </Button>
                  ) : null}
                </Grid>
              </Grid>
            ))}
          </div>
          {hasValidationError && <p style={{ color: 'red' }}>{'At least one field is required.'}</p>}
        </Grid>
        <Grid item xs={12} sx={{ mb: 3 }}>
          {error && <Alert severity='error'>{error}</Alert>}
        </Grid>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', gap: '10px' }}>
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
            // type='submit'
            onClick={onSubmit}
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
            Save
          </Button>
        </Grid>
      </form>
    </div>
  )
}

export default AddCampus
