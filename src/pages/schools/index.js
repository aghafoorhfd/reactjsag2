// External Imports
import React, { useEffect, useState } from 'react'
import { Typography, Box, Card, Button } from '@mui/material'
import { FadeLoader } from 'react-spinners'

// Internal Imports
import NoData from 'src/views/pages/school/schoolGrid/noData'
import TableList from 'src/views/pages/school/schoolGrid/gridList'
import CreateSchool from 'src/views/pages/school/schoolCreation'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { getAll } from 'src/services/school.service'

const Schools = () => {
  const [addSchool, setAddSchool] = useState(false)
  const [loading, setLoading] = useState(false)
  const [schools, setSchools] = useState([])

  const toggleAddSchoolModal = () => {
    setAddSchool(!addSchool)
  }
  const fetchSchools = async () => {
    setLoading(true)
    const res = await getAll()
    if (res?.success) {
      setLoading(false)
      setSchools(res?.schools?.reverse())
    } else {
      setSchools([])
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchSchools()
  }, [])

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography sx={{ fontSize: '22px', color: theme => theme.palette.color.default, fontWeight: '600' }}>
          {'Welcome Waqar Y!'}
        </Typography>
        {
          schools?.length !== 0 &&
          <Button variant='contained' color='primary' onClick={toggleAddSchoolModal}>
            <ControlPointIcon sx={{ marginRight: 2 }} />
            <Typography sx={{ fontSize: '18px' }} color={'white'} variant='button' display='inline' >
              Add School
            </Typography>
          </Button>
        }
      </Box>
      <Card sx={{ p: '20px', minHeight: '75vh', boxShadow: 'none', position: "relative" }}>
        {loading ? (
          <div
            style={{
              width: '96%',
              height: '90%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              zIndex: '100px'
            }}
          >
            <FadeLoader color='#04463A' />
          </div>
        ) :
          <Box>
            {schools?.length > 0 ? <TableList data={schools} fetchSchools={fetchSchools} /> : <NoData handleOpen={toggleAddSchoolModal} />}
          </Box>

        }
      </Card>
      <CreateSchool open={addSchool} fetchSchools={fetchSchools} toggle={toggleAddSchoolModal} />
    </Box>
  )
}

export default Schools
