import React, { useState } from 'react'
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Grid,
  Divider,
  Typography
} from '@mui/material'

const questionsData = [
  {
    key: 'subjectName',
    title: 'Which word do you use in your school:',
    options: ['Subject', 'Course', 'Other']
  },
  {
    key: 'blockOfTime',
    title: 'What do you call the block of time allocated for lessons/classes:',
    options: ['Period', 'Session', 'Lesson', 'Class', 'Course', 'Lecture', 'Other']
  },
  {
    key: 'workingDays',
    title: 'Working Days:',
    options: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday']
  },
  {
    key: 'scheduling',
    title: 'Scheduling:',
    options: ['Cycle', 'Weeks']
  },
  {
    key: 'shifts',
    title: 'Shifts:',
    options: ['1', '2', '3', 'Other']
  }
]

const AddInformation = ({ handleClose, handleNext, setSchoolData, schoolData }) => {
  const [formState, setFormState] = useState(() => {
    const initialState = {}
    questionsData.forEach(question => {
      initialState[question.key] = {
        selectedOptions: [], // Change to an array for multi-check
        otherText: ''
      }
    })
    return initialState
  })

  const [error, setError] = useState('')

  const handleCheckboxChange = (questionKey, option) => {
    setFormState(prevFormState => {
      const updatedState = { ...prevFormState }

      if (questionKey === 'workingDays') {
        const index = updatedState[questionKey].selectedOptions.indexOf(option)
        if (index === -1) {
          updatedState[questionKey].selectedOptions.push(option)
        } else {
          updatedState[questionKey].selectedOptions.splice(index, 1)
        }
      } else {
        // Reset other options and otherText if "Other" is selected
        if (option === 'Other') {
          updatedState[questionKey].selectedOptions = ['Other']
          updatedState[questionKey].otherText = ''
        } else {
          updatedState[questionKey].selectedOptions = [option]
          updatedState[questionKey].otherText = ''
        }
      }

      return updatedState
    })

    setError('')
  }

  const handleOtherTextChange = (questionKey, event) => {
    setFormState(prevFormState => ({
      ...prevFormState,
      [questionKey]: {
        ...prevFormState[questionKey],
        otherText: event.target.value
      }
    }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    // Basic validation
    for (const questionKey of Object.keys(formState)) {
      const { selectedOptions, otherText } = formState[questionKey]
      if (questionKey === 'workingDays' && selectedOptions.length === 0) {
        setError(`Please select at least one working day.`)
        return
      }

      if (selectedOptions.length === 0) {
        setError(`Please select an option for "${questionsData.find(q => q.key === questionKey)?.title}".`)
        return
      }

      if (selectedOptions.includes('Other') && !otherText.trim()) {
        setError(`Please enter a value for "${questionsData.find(q => q.key === questionKey)?.title} - Other".`)
        return
      }
    }

    // Handle form submission logic here
    const updatedSchoolInfo = {
      ...schoolData,
      shifts: formState?.shifts?.selectedOptions[0],
      scheduling: formState?.scheduling?.selectedOptions[0],
      workingDays: JSON.stringify(formState?.workingDays?.selectedOptions),
      lectureT: formState?.blockOfTime?.selectedOptions[0],
      subjectT: formState?.subjectName?.selectedOptions[0]
    }
    setSchoolData(updatedSchoolInfo)
    handleNext()
  }

  return (
    <form onSubmit={handleSubmit} style={{ margin: '10px 20px' }}>
      <FormControl component='fieldset' sx={{ width: '100%' }}>
        {questionsData.map(question => (
          <FormGroup key={question.key}>
            <Typography sx={{ fontWeight: 'bold' }}>{`${question.title}`}</Typography>
            <Grid container>
              {question.options.map(option => (
                <Grid item key={option}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          question.key === 'workingDays'
                            ? formState[question.key]?.selectedOptions.includes(option)
                            : formState[question.key]?.selectedOptions[0] === option
                        }
                        onChange={() => handleCheckboxChange(question.key, option)}
                        color='primary'
                      />
                    }
                    label={option}
                  />
                </Grid>
              ))}
            </Grid>
            {question.key !== questionsData[questionsData.length - 1].key && (
              <Divider className='!mt-[20px] !mb-[20px]' />
            )}

            {formState[question.key]?.selectedOptions.includes('Other') && (
              <TextField
                label='Other'
                variant='outlined'
                value={formState[question.key]?.otherText}
                onChange={event => handleOtherTextChange(question.key, event)}
                fullWidth
              />
            )}
          </FormGroup>
        ))}
      </FormControl>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Grid
        item
        xs={12}
        style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', gap: '10px', marginTop: '38px' }}
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
  )
}

export default AddInformation
