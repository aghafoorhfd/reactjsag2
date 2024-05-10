// External Imports
import * as React from 'react'

// Internal Imports
import ConductCard from './ConductCard'

const RecentConduct = ({ data, head }) => {
  return (
    <>
      <div className='flex justify-between items-center'>
        <div>
          <p className='!p-0 !m-0 font-semibold text-[18px] leading-[27px] text-[#333333]'>
            {head?.title || ''}
          </p>
        </div>
        <div>
          <p className='!p-0 !m-0 font-semibold text-[16px] leading-[17px] text-[#115740] underline cursor-pointer'>
            {head?.view || ''}
          </p>
        </div>
      </div>
      <div className='pt-4'>
        {data.map((elements, index) => {
          return <ConductCard data={elements} key={index} />
        })}
      </div>
    </>
  )
}

export default RecentConduct
