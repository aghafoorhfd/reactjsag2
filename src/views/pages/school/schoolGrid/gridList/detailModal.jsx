import React from 'react'

const DetailModal = ({ selectedData }) => {
  console.log(selectedData)
  return (
    <>
      <div className="bg-[url('/images/schoolSetup/cover.png')] h-auto max-h-[140px] w-full object-cover flex   items-center rounded-t-[5px]">
        <div className='flex  pt-[115px] gap-8 pl-[102px]'>
          <div>
            <img
              src='/images/schoolSetup/logoSchool.png'
              className='w-[158px] h-[158px] object-cover rounded-full'
              style={{
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
              }}
            />
          </div>
          <div>
            <p className='p-0 pt-3 m-0 text-[32px] font-bold text-white line-clamp-1 w-[100%]'>{selectedData?.name}</p>
            <p className='p-0 m-0 text-[14px] font-medium text-[#F9FAFB] line-clamp-1 w-[100%]'>
              {selectedData?.address}
            </p>
          </div>
        </div>
      </div>
      <div className='  h-auto bg-[#ffffff] mx-[35px] my-[29px] overflow-auto rounded-lg' id='DetailSchool'>
        <div className='pt-[50px] pl-[62px] flex flex-col gap-[25px]'>
          <div className='flex gap-[50px]'>
            <p className='p-0 m-0 text-[16px] font-semibold text-[#242424] w-[200px]'>Phone Number</p>
            <p className='p-0 m-0 text-[16px] font-semibold text-[#666666]'>{selectedData?.phoneNo}</p>
          </div>
          <div className='flex gap-[50px]'>
            <p className='p-0 m-0 text-[16px] font-semibold text-[#242424] w-[200px]'>Email</p>
            <p className='p-0 m-0 text-[16px] font-semibold text-[#666666]'>{selectedData?.email}</p>
          </div>
          <div className='flex gap-[50px] '>
            <p className='p-0 m-0 text-[16px] font-semibold text-[#242424] w-[200px]'>Web URL</p>
            <p className='p-0 m-0 text-[16px] font-semibold text-[#417966] underline line-clamp-1 cursor-pointer'>
              <a href={selectedData?.webSite} target='_blank' rel='noreferrer'>
                {selectedData?.webUrl}
              </a>
            </p>
          </div>
          <div className='flex flex-col gap-[33px] border-t-[1px] border-b-[1px] border-[#A1A1A1] w-[80%]'>
            <div className='flex gap-[50px] pt-[25px] w-max'>
              <p className='p-0 m-0 text-[16px] font-semibold text-[#242424] w-[200px]'>Academic Year</p>
              <p className='p-0 m-0 text-[16px] font-semibold text-[#666666]'>
                {selectedData?.acadamicYear[0]?.start} &nbsp;To&nbsp; {selectedData?.acadamicYear[0]?.end}{' '}
              </p>
            </div>
            <div className='flex gap-[50px] pb-[10px] w-max'>
              <p className='p-0 m-0 text-[16px] font-semibold text-[#242424] w-[200px]'>Division</p>
              <p className='p-0 m-0 text-[16px] font-semibold text-[#666666]'>
                {selectedData?.divisionT}
              </p>
            </div>
          </div>
          {selectedData?.Campus?.length == 0 ? (
            <span className='text-[#666666] font-medium text-[16px] w-[135px] h-[30px] rounded-full bg-[#F2F4F7] px-[13px] py-[3px] text-center'>
              no campus
            </span>
          ) : (
            <div className='flex gap-[20px] flex-col'>
              {selectedData?.Campus?.map((campuses, index) => (
                <>
                  <div className='flex gap-[50px]'>
                    <div>
                      <p className='p-0 m-0 text-[16px] font-semibold text-[#242424] w-[200px]'>Campuses/ Stages</p>
                    </div>
                    <div className='flex flex-wrap gap-[18px] mb-2'>
                      <div className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-[16px]'>
                          <div key={index}>
                            <span className='block  cursor-pointer text-[#333333] font-medium text-[16px] w-fit h-[30px] rounded-full bg-[#E6ECEB] px-[30px] py-[3px] text-center'>
                              {campuses?.name}
                            </span>
                          </div>
                          <div key={index} className='flex gap-[18px] flex-wrap mb-[18px]'>
                            {campuses?.stage.length ? (
                              campuses?.stage?.map((stage, index) => (
                                <span
                                  key={index}
                                  className='cursor-pointer text-[#333333] font-medium text-[16px] w-fit  h-[30px] rounded-full bg-[#E6ECEB] px-[30px] py-[3px] text-center'
                                >
                                  {stage?.name}
                                </span>
                              ))
                            ) : (
                              <span className='cursor-pointer text-[#333333] font-medium text-[16px] w-fit  h-[30px] rounded-full bg-[#11574033] px-[30px] py-[3px] text-center'>
                                No Stages
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default DetailModal
