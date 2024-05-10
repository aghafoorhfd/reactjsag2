import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import { Box, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

function RepeatDivison({ selectedOption, passDatesToParent, datesError, setDatesError }) {
  const [repetitions, setRepetitions] = useState([])
  const [dateArray, setDateArray] = useState([])

  const getNumberOfRepetitions = () => {
    switch (selectedOption) {
      case 'Term':
        return 1
      case 'Semester':
        return 2
      case 'Trimester':
        return 3
      case 'Quarter':
        return 4
      case 'Other':
        return 1
    }
  }
  useEffect(() => {
    const numberOfRepetitionsToShow = getNumberOfRepetitions()
    const newRepetitions = Array.from({ length: numberOfRepetitionsToShow }, (_, index) => {
      return {
        key: index + 1,
        startDate: '',
        endDate: ''
      }
    })
    setRepetitions(newRepetitions)
  }, [selectedOption])

  useEffect(() => {
    const dates = repetitions.map(({ startDate, endDate }) => ({ startDate, endDate }))
    setDateArray(dates)
    passDatesToParent(dates)
  }, [repetitions])

  const addRepetition = () => {
    setRepetitions(prevRepetitions => [
      ...prevRepetitions,
      {
        key: prevRepetitions.length + 1,
        startDate: '',
        endDate: ''
      }
    ])
  }

  const handleStartDate = (key, value) => {
    setRepetitions(prevRepetitions =>
      prevRepetitions.map(repetition => (repetition.key === key ? { ...repetition, startDate: value } : repetition))
    )
    setDatesError('')
  }

  const handleEndDate = (key, value) => {
    setRepetitions(prevRepetitions =>
      prevRepetitions.map(repetition => (repetition.key === key ? { ...repetition, endDate: value } : repetition))
    )
    setDatesError('')
  }
  const removeRepetition = key => {
    setRepetitions(prevRepetitions => prevRepetitions.filter(repetition => repetition.key !== key))
  }

  function getOrdinalSuffix(number) {
    if (number % 10 === 1 && number % 100 !== 11) {
      return number + 'st'
    } else if (number % 10 === 2 && number % 100 !== 12) {
      return number + 'nd'
    } else if (number % 10 === 3 && number % 100 !== 13) {
      return number + 'rd'
    } else {
      return number + 'th'
    }
  }

  return (
    <div>
      {repetitions?.map((repetition, index) => (
        <Box key={index}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} md={5} style={{ marginTop: '15px', marginBottom: '15px', marginLeft: '3px' }}>
              <Typography>{`${getOrdinalSuffix(repetition?.key)} ${selectedOption}`}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} md={5} style={{ paddingTop: '7px' }}>
              <TextField
                type='date'
                fullWidth
                label='Start Date'
                value={repetition.startDate}
                onChange={e => handleStartDate(repetition.key, e.target.value)}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={5} style={{ paddingTop: '7px' }}>
              <TextField
                type='date'
                fullWidth
                label='End Date'
                value={repetition.endDate}
                onChange={e => handleEndDate(repetition.key, e.target.value)}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item sm={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {selectedOption === 'Other' && index !== 0 && (
                <Button
                  variant='text'
                  color='error'
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  onClick={() => removeRepetition(repetition.key)}
                >
                  <DeleteForeverIcon /> <p style={{ marginLeft: '5px' }}>Remove</p>
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      ))}
      {datesError && (
        <Alert severity='error' className='mt-2'>
          {datesError}
        </Alert>
      )}
      {selectedOption === 'Other' && (
        <Button
          variant='text'
          onClick={addRepetition}
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <AddCircleOutlineIcon /> <p style={{ marginLeft: '5px' }}>Add Repetition</p>
        </Button>
      )}
    </div>
  )
}

export default RepeatDivison
