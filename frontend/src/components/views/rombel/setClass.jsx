import { Button, Table } from 'antd'
import EmptyDataIndicator from '@/components/shared/EmptyDataIndicator'
import Link from 'next/link'

export default function SetClass({ rombels }) {
  return (
    <section className="content">
      <div className="row">
        {rombels.length === 0 && (
          <EmptyDataIndicator message={'Data Rombel Kosong'} />
        )}
        {rombels.length > 0 &&
          rombels.map((rombel) => (
            <div key={rombel.id} className="col-sm-4">
              <div
                className="box box-solid box-primary"
                style={{ height: '320px', overflow: 'auto' }}
              >
                <div className="box-header with-border">
                  <h3
                    className="box-title"
                    style={{ float: 'left', margin: '0', marginTop: '8px' }}
                  >
                    {rombel.name}
                  </h3>
                  <Link href={`/admin/rombel/read_student/${rombel.id}`}>
                    <Button type="default" style={{ float: 'right' }}>
                      Lihat Siswa
                    </Button>
                  </Link>
                </div>

                <div className="box-body">
                  <Table
                    dataSource={rombel.murid}
                    rowKey="id"
                    pagination={false}
                    bordered
                  >
                    <Table.Column
                      title="No"
                      dataIndex="id"
                      key="id"
                      render={(text, record, index) => index + 1}
                    />
                    <Table.Column title="NIS" dataIndex="nis" key="nis" />
                    <Table.Column title="Nama" dataIndex="nama" key="nama" />
                  </Table>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}
