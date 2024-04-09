'use client'
import { useParams } from 'next/navigation';
import StudentTable from './tableStudent'
import { useEffect, useState } from 'react';
import { useOneStudentByIdSemesterGuru } from '@/hooks/useOneStudentByIdSemesterGuru';


const LectureStudentView = () => {
  const { id } = useParams();
  const [rombel, setRombel] = useState('');
  const [semester, setSemester] = useState('');
  const {
    data: listRombelSemesterMurid,
    error,
    isFetching,
    refetch,
  } = useOneStudentByIdSemesterGuru(id)

  useEffect(() => {
    setRombel(listRombelSemesterMurid.rombel);
    setSemester(listRombelSemesterMurid.semester)
  })
  return (
    <>
      <div className="content-wrapper">
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box box-solid box-primary">
                <div className="box-header">
                  <h3 className="box-title">
                    <i className="fa fa-book"></i> Daftar Siswa
                  </h3>
                </div>

                <div className="callout callout-primary">
                  <h4>
                    <i className="icon fa fa-info-circle"></i> Daftar Siswa di
                    Rombel {rombel?.name}
                  </h4>
                  <p>{`Tahun Ajaran ${semester?.name}`}</p>
                </div>

                <div className="box-body">
                  <StudentTable siswa={listRombelSemesterMurid?.murid} fetching={isFetching} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default LectureStudentView
