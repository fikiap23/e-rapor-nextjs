'use client'
import useAuth from '@/hooks/useAuth'
import TableLecture from './tableLecture'
import { useRombelDiampu } from '@/services/teacherService/useRombelDiampu'
import Loading from '@/components/shared/Loading'

const LectureView = () => {
  const { token } = useAuth()
  const {
    data: listRombel,
    error,
    isFetching,
    refetch,
  } = useRombelDiampu(token)
  console.log(listRombel)
  return (
    <>
      <div className="content-wrapper">
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box box-solid box-primary">
                <div className="box-header">
                  <h3 className="box-title">
                    <i className="fa fa-book"></i> Rombel Diampuh
                  </h3>
                </div>
                <div className="box-body">
                  {isFetching && <Loading />}
                  {!isFetching && listRombel && (
                    <TableLecture rombels={listRombel} />
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

export default LectureView
