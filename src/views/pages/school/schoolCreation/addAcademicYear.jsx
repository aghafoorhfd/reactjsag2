// External Imports
import React from 'react'
import * as yup from 'yup'
import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { FormLabel, Typography } from '@mui/material'
import FormHelperText from '@mui/material/FormHelperText'
import { Checkbox, FormControlLabel } from '@mui/material'

// Internal Imports
import RepeatDivison from './repeatDivision'

const AddAcademicYear = ({ handleClose, handleNext, setSchoolData, schoolData }) => {
  const [datesError, setDatesError] = useState('')
  const [error, setError] = React.useState(null)
  const Options = ['Term', 'Semester', 'Trimester', 'Quarter', 'Other']
  const [selectedOption, setSelectedOption] = useState('Trimester')
  const [divisionDates, setDivisionDates] = useState()

  const defaultValue = {
    start: '',
    end: ''
  }

  const schema = yup.object().shape({
    start: yup.string().required(),
    end: yup.string().required()
  })

  const passDatesToParent = dates => {
    setDivisionDates(dates)
  }

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
    if (!selectedOption) {
      setError('Please select an academic year division')
      return
    }
    const hasEmptyDates = divisionDates.some(dateObj => !dateObj.startDate.trim() || !dateObj.endDate.trim())

    if (hasEmptyDates) {
      setDatesError('Please select all division dates')
      return
    }
    setError('')

    const updatedSchoolData = {
      ...schoolData,
      acadamicYear: {
        divisions: divisionDates?.map(item => {
          return {
            start: item?.startDate,
            end: item?.endDate
          }
        }),
        start: data?.start,
        end: data?.end
      },
      divisionT: selectedOption
    }
    setSchoolData(updatedSchoolData)
    handleNext()
  }

  return (
    <div className='relative'>
      <form className='' onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5} style={{ marginTop: '15px' }}>
          <Grid item xs={12} sm={4} md={6} style={{ paddingTop: '5px' }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Controller
                name='start'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    type='date'
                    value={value}
                    label='Academic Year (From)'
                    onChange={onChange}
                    error={Boolean(errors.start)}
                    className=' p-[10px] '
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                )}
              />
              {errors.start && <FormHelperText sx={{ color: 'error.main' }}>{errors.start.message}</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4} md={6} style={{ paddingTop: '5px' }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Controller
                name='end'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    type='date'
                    value={value}
                    label='Academic Year (To)'
                    onChange={onChange}
                    error={Boolean(errors.end)}
                    className=' p-[10px] '
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                )}
              />
              {errors.end && <FormHelperText sx={{ color: 'error.main' }}>{errors.end.message}</FormHelperText>}
            </FormControl>
          </Grid>
        </Grid>

        <Grid item xs={12} style={{ marginTop: '40px' }}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <FormLabel>What do you call the division of the academic year: </FormLabel>
            <div>
              {Options.map(option => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={selectedOption === option}
                      onChange={e => {
                        setSelectedOption(e.target.checked ? option : '')
                      }}
                    />
                  }
                  label={option}
                />
              ))}
            </div>
            {error && <FormHelperText sx={{ color: 'error.main' }}>{error}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item sm={12} md={12} sx={{ marginTop: '45px' }}>
          <Typography sx={{ fontSize: '18px', fontWeight: 600, lineHeight: '16px', letterSpacing: '0.5px' }}>
            Division
          </Typography>
        </Grid>
        <Grid item sm={12} md={12}>
          <RepeatDivison
            selectedOption={selectedOption}
            passDatesToParent={passDatesToParent}
            datesError={datesError}
            setDatesError={setDatesError}
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            gap: '10px',
            marginTop: '38px'
          }}
        >
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

export default AddAcademicYear
