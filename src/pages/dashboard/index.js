import * as React from 'react'

import { Grid } from '@mui/material'
import { useAuth } from 'src/hooks/useAuth'

import LineChart from 'src/views/dashboards/Charts/LineChart'
import RightBoxDashboard from 'src/views/dashboards/RightBoxDashboard'

import { useLanguage } from 'src/context/LanguageContext'
import { getTranslations } from 'src/context/getTranslations'

import HeaderCard from 'src/views/dashboards/HeaderCard'
import DonutChart from 'src/views/dashboards/Charts/donutChart'
import Table from 'src/views/dashboards/Table'

const Dashboard = () => {
  const { language } = useLanguage()
  const {
    pages: { dashboard }
  } = getTranslations(language)
  const auth = useAuth()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={9}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <HeaderCard />
          </Grid>
          <Grid item xs={12} md={8}>
            <LineChart />
          </Grid>
          <Grid item xs={12} md={4}>
            <DonutChart />
          </Grid>
          <Grid item xs={12} md={12}>
            <Table />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={3}>
        <RightBoxDashboard user={auth?.user} />
      </Grid>
    </Grid>
  )
}

export default Dashboard
