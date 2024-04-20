import React, { useState } from 'react'
import { Select } from 'antd'
import useAuth from '@/hooks/useAuth'
import { useCpTp } from '@/hooks/useCpTp'
import MuridTable from './table/muridTable'
import EmptyDataIndicator from '@/components/shared/EmptyDataIndicator'
import { useRombelWithSemester } from '@/hooks/useRombelWithSemester'

const { Option } = Select

const PenilaianView = ({ idRombelSemesterGuru }) => {
  const [selectedWeek, setSelectedWeek] = useState(null)
  const { token } = useAuth()
  const { data: cpTp, isFetching: isFetchingCpTp } = useCpTp(token)
  const { data: rombelWithSemester, isFetching: isFetchingRombelWithSemester } =
    useRombelWithSemester(idRombelSemesterGuru)

  const handleWeekChange = (value) => {
    const tp = cpTp?.tujuanPembelajaran?.find((tp) => tp.id === value)
    // console.log(tp)
    setSelectedWeek(tp)
    // Fetch data for the selected week
  }

  return (
    <>
      <div className="content-wrapper">
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box box-solid box-primary">
                <div className="box-header">
                  <h3 className="box-title">
                    <i className="fa fa-calendar"></i> Data Penilaian Mingguan
                  </h3>
                  <div style={{ float: 'right' }}>
                    <b>Rombel: </b>
                    {rombelWithSemester?.rombel} | <b>Semester: </b>{' '}
                    {rombelWithSemester?.semester}
                  </div>
                </div>

                <div className="box-body">
                  <Select
                    placeholder="Pilih Minggu"
                    style={{ width: 200, marginBottom: 16 }}
                    onChange={handleWeekChange}
                  >
                    {cpTp?.tujuanPembelajaran?.map((tp) => (
                      <Option
                        key={tp.id}
                        value={tp.id}
                      >{`Minggu ${tp.minggu}`}</Option>
                    ))}
                  </Select>

                  {selectedWeek && (
                    <MuridTable
                      idRombelSemesterGuru={idRombelSemesterGuru}
                      tp={selectedWeek}
                      token={token}
                    />
                  )}
                  {!selectedWeek && (
                    <EmptyDataIndicator message={'Pilih Minggu'} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default PenilaianView
