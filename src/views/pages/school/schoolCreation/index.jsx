// External Imports
import React, { useState, useEffect } from 'react'
import { forwardRef } from 'react'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Step from '@mui/material/Step'
import Stepper from '@mui/material/Stepper'
import Icon from 'src/@core/components/icon'
import StepLabel from '@mui/material/StepLabel'
import IconButton from '@mui/material/IconButton'
import { Dialog, DialogTitle } from '@mui/material'
import DialogContent from '@mui/material/DialogContent'
import { FadeLoader } from 'react-spinners'
import { create } from 'src/services/school.service'

// Internal Imports
import AddCampus from './addCampus'
import AddSchool from './addSchool'
import AddInformation from './addInformation'
import AddAcademicYear from './addAcademicYear'
import SuccessFullyDoneModal from '../../common/successfullyDoneModal'
import DeleteGifIcon from 'src/gifs/done.json'

const steps = ['Add School', 'Academic Year', 'School Information', 'Add Campus/Stage']

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const CreateSchool = props => {
  // ** Props
  const { open, toggle, fetchSchools } = props
  const [schoolData, setSchoolData] = useState({})
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [isSuccessModal, setIsSuccessModal] = useState(false)

  const handleClose = () => {
    setActiveStep(0)
    toggle()
    setSchoolData({})
  }
  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }
  const handleComplete = async data => {
    setLoading(true)
    const res = await create(data)
    console.log(res, 'res handleComplete')
    if (res?.success) {
      setLoading(false)
      toggle()
      setSchoolData({})
      setActiveStep(0)
      setIsSuccessModal(true)
      fetchSchools()
    } else {
      setLoading(false)
    }
    console.log('handleComplete', data)
  }

  return (
    <div>
      <Dialog fullWidth open={open} maxWidth='md' scroll='body' onClose={handleClose} TransitionComponent={Transition}>
        <DialogTitle>
          <Box sx={{ width: '100%', marginTop: '39px' }}>
            <Stepper activeStep={activeStep} className='bg-[#F2F4F7] rounded-[8px]  py-[10px] px-[11px] mx-[5px]'>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </DialogTitle>
        <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <Icon icon='carbon:close-outline' />
        </IconButton>
        <DialogContent sx={{ position: 'relative', marginLeft: '5px', marginRight: '5px' }}>
          {loading && (
            <div
              style={{
                width: '96%',
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
          <React.Fragment>
            <Box sx={{ filter: loading ? 'blur(5px)' : 'none' }}>
              {activeStep === 0 ? (
                <AddSchool handleNext={handleNext} handleClose={handleClose} setSchoolData={setSchoolData} />
              ) : activeStep === 1 ? (
                <AddAcademicYear
                  handleNext={handleNext}
                  handleClose={handleClose}
                  setSchoolData={setSchoolData}
                  schoolData={schoolData}
                />
              ) : activeStep === 2 ? (
                <AddInformation
                  handleNext={handleNext}
                  handleClose={handleClose}
                  setSchoolData={setSchoolData}
                  schoolData={schoolData}
                />
              ) : (
                <AddCampus
                  handleClose={handleClose}
                  handleComplete={handleComplete}
                  setSchoolData={setSchoolData}
                  schoolData={schoolData}
                />
              )}
            </Box>
          </React.Fragment>
        </DialogContent>
      </Dialog>
      {isSuccessModal && (
        <SuccessFullyDoneModal
          open={isSuccessModal}
          animationData={DeleteGifIcon}
          handleClose={() => setIsSuccessModal(false)}
          heading={'Successfully'}
          subHeading={"You've Successfully added the school."}
          animationWidth={'300px'}
          animationHeight={'25opx'}
        />
      )}
    </div>
  )
}

export default CreateSchool
