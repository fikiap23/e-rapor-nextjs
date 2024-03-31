'use client'
import Swal from 'sweetalert2'
import { useState } from 'react'
import Link from 'next/link'
import ActivitiesView from './component/activitiesView'
import InputModulAjar from './component/inputModulAjar'

const SubjectView = () => {
  const [activeTab, setActiveTab] = useState('moduleTab')

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    // console.log(tab);
  }

  const handleDelete = () => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda akan menghapus siswa!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Tidak, batalkan!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Data Dihapus!', 'Siswa telah dihapus.', 'success')
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Dibatalkan', 'Tidak ada perubahan pada data siswa.', 'error')
      }
    })
  }

  const dataDummy = [
    {
      minggu: 1,
      tujuan_pembelajaran: [
        'Memahami konsep dasar JavaScript',
        'Menerapkan konsep dasar dalam pembuatan program sederhana',
      ],
      capaian_pembelajaran: [
        'Memahami konsep dasar JavaScript',
        'Mampu membuat program sederhana menggunakan JavaScript',
      ],
      tujuan_kegiatan: 'Materi pembelajaran, latihan, dan proyek kecil',
    },
    {
      minggu: 2,
      tujuan_pembelajaran: [
        'Memahami struktur data dalam JavaScript',
        'Menggunakan struktur data untuk memecahkan masalah',
      ],
      capaian_pembelajaran: [
        'Menguasai berbagai struktur data dalam JavaScript',
        'Mampu memecahkan masalah menggunakan struktur data yang sesuai',
      ],
      tujuan_kegiatan: 'Pembelajaran konsep, latihan pemrograman',
    },
    {
      minggu: 3,
      tujuan_pembelajaran: [
        'Memahami konsep dasar React',
        'Membangun aplikasi sederhana menggunakan React',
      ],
      capaian_pembelajaran: [
        'Menguasai konsep dasar React',
        'Mampu membuat aplikasi sederhana dengan React',
      ],
      tujuan_kegiatan: 'Pembelajaran React, proyek aplikasi',
    },
    {
      minggu: 4,
      tujuan_pembelajaran: [
        'Memahami penggunaan state dan props dalam React',
        'Menggunakan state dan props dalam pengembangan aplikasi React',
      ],
      capaian_pembelajaran: [
        'Menguasai penggunaan state dan props',
        'Mampu mengimplementasikan state dan props dalam aplikasi React',
      ],
      tujuan_kegiatan: 'Pembelajaran lanjutan React, proyek aplikasi',
    },
    {
      minggu: 5,
      tujuan_pembelajaran: [
        'Memahami penggunaan hooks dalam React',
        'Menggunakan hooks dalam pengembangan aplikasi React',
      ],
      capaian_pembelajaran: [
        'Menguasai penggunaan hooks',
        'Mampu mengimplementasikan hooks dalam aplikasi React',
      ],
      tujuan_kegiatan: 'Pembelajaran hooks, proyek aplikasi',
    },
    {
      minggu: 6,
      tujuan_pembelajaran: [
        'Memahami konsep dasar Node.js',
        'Mengembangkan aplikasi server sederhana menggunakan Node.js',
      ],
      capaian_pembelajaran: [
        'Menguasai konsep dasar Node.js',
        'Mampu membuat aplikasi server sederhana dengan Node.js',
      ],
      tujuan_kegiatan: 'Pembelajaran Node.js, proyek aplikasi',
    },
    {
      minggu: 7,
      tujuan_pembelajaran: [
        'Memahami penggunaan Express.js dalam pengembangan web server',
        'Membangun aplikasi server menggunakan Express.js',
      ],
      capaian_pembelajaran: [
        'Menguasai penggunaan Express.js',
        'Mampu mengimplementasikan Express.js dalam pengembangan aplikasi server',
      ],
      tujuan_kegiatan: 'Pembelajaran Express.js, proyek aplikasi',
    },
    {
      minggu: 8,
      tujuan_pembelajaran: [
        'Memahami konsep dasar MongoDB',
        'Menggunakan MongoDB dalam pengembangan aplikasi web',
      ],
      capaian_pembelajaran: [
        'Menguasai konsep dasar MongoDB',
        'Mampu mengimplementasikan MongoDB dalam aplikasi web',
      ],
      tujuan_kegiatan: 'Pembelajaran MongoDB, proyek aplikasi',
    },
    {
      minggu: 9,
      tujuan_pembelajaran: [
        'Mengimplementasikan teknologi-teknologi yang dipelajari dalam proyek akhir',
        'Menyelesaikan dan mempresentasikan proyek akhir',
      ],
      capaian_pembelajaran: [
        'Menguasai penggunaan teknologi-teknologi yang dipelajari',
        'Mampu menyelesaikan proyek akhir dan mempresentasikannya secara efektif',
      ],
      tujuan_kegiatan: 'Membuat proyek akhir, presentasi proyek akhir',
    },
  ]

  return (
    <div className="content-wrapper" id="guru">
      <section className="content">
        <div className="row">
          <div className="col-md-12">
            {/* {action === "view" && ( */}
            <div className="nav-tabs-custom">
              <ul className="nav nav-tabs">
                <li className={activeTab === 'moduleTab' ? 'active' : ''}>
                  <Link href="" onClick={() => handleTabChange('moduleTab')}>
                    Modul Ajar
                  </Link>
                </li>
                <li
                  className={
                    activeTab === 'learningOutcomesTab' ? 'active' : ''
                  }
                >
                  <Link
                    href=""
                    onClick={() => handleTabChange('learningOutcomesTab')}
                  >
                    Input Modul Ajar
                  </Link>
                </li>
                <li className={activeTab === 'activitiesTab' ? 'active' : ''}>
                  <Link
                    href=""
                    onClick={() => handleTabChange('activitiesTab')}
                  >
                    Jadwal Ajar
                  </Link>
                </li>
              </ul>
              <div className="tab-content">
                {activeTab === 'moduleTab' && (
                  <div className="active tab-pane" id="activity">
                    <div className="box-body table-responsive no-padding">
                      <table id="siswa" className="table table-hover">
                        <thead>
                          <tr>
                            <th>Minggu</th>
                            <th>Topik</th>
                            <th>Sub Topik</th>
                            <th>Kata Kunci</th>
                            <th>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>lorem ipsum A</td>
                            <td>Identitasku</td>
                            <td>Namaku, identitasku</td>
                            <td>lurator</td>
                            <td>
                              <button
                                style={{
                                  marginRight: '2px',
                                  marginLeft: '2px',
                                }}
                                type="button"
                                className="btn btn-primary"
                                // onClick={handleDelete}
                              >
                                <i className="icon fa fa-edit"></i>
                              </button>

                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleDelete}
                              >
                                <i className="icon fa fa-trash"></i>
                              </button>

                              <button
                                style={{
                                  marginRight: '2px',
                                  marginLeft: '2px',
                                }}
                                type="button"
                                className="btn btn-success"
                              >
                                <i className="icon fa fa-print"></i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>lorem ipsum A</td>
                            <td>Identitasku</td>
                            <td>Namaku, identitasku</td>
                            <td>lurator</td>
                            <td>
                              <button
                                style={{
                                  marginRight: '2px',
                                  marginLeft: '2px',
                                }}
                                type="button"
                                className="btn btn-primary"
                              >
                                <i className="icon fa fa-edit"></i>
                              </button>

                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleDelete}
                              >
                                <i className="icon fa fa-trash"></i>
                              </button>

                              <button
                                style={{
                                  marginRight: '2px',
                                  marginLeft: '2px',
                                }}
                                type="button"
                                className="btn btn-success"
                              >
                                <i className="icon fa fa-print"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {activeTab === 'learningOutcomesTab' && <InputModulAjar />}
                {activeTab === 'activitiesTab' && <ActivitiesView />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SubjectView
