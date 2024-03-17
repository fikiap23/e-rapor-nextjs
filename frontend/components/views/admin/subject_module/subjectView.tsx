'use client'
import Swal from 'sweetalert2'
import { useState } from 'react'
import AddSubjectModal from './component/addSubjectModal'
import Link from 'next/link'
import InputSubject from './component/InputSubject'
import ActivitiesView from './component/activitiesView'

const SubjectView = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showInput, setShowInput] = useState(false)
    const [activeTab, setActiveTab] = useState("moduleTab");

    const handleTabChange = (tab: any) => {
        setActiveTab(tab);
        // console.log(tab);
    };

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
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

    const handleShowInput = () => {
        setShowInput(!showInput)
        console.log(showInput);


    }

    // const DummyData = [
    //     { id: 1, topic: 'lorem  ipsum A', sub_topic: 'Identitasku', status: "lengkap" , keywords: 'Namaku, identitasku' },
    //     { id: 2, topic: 'lorem  ipsum B', sub_topic: 'Anggota Tubuh ', status: "lengkap" , keywords: 'Anggota tubuh, Jari-jariku, Mata, Bakteri pada gigi, pancaindra, dll' },
    //     { id: 3, topic: 'lorem  ipsum C', sub_topic: 'Kebutuhanku003', status: "tidak lengkap" , keywords: 'Makanan, minuman, kesehatan, dll' },
    //     { id: 4, topic: 'lorem  ipsum D', sub_topic: 'Menjaga Kebersihan diri ', status: "lengkap" , keywords: 'Mandi, menyikat gigi, dll' },
    //     { id: 5, topic: 'lorem  ipsum D', sub_topic: 'Menjaga Kebersihan diri ', status: "lengkap" , keywords: 'Mandi, menyikat gigi, dll' },
    //     { id: 6, topic: '-', sub_topic: '-', status: "-" , keywords: '-' },
    //     { id: 7, topic: '-', sub_topic: '-', status: "-" , keywords: '-' },
    // ];
    // const [matpelData, setMatpelData] = useState(DummyData);


    return (
        <div className="content-wrapper" id="guru">
            <section className="content">
                <div className="row">
                    <div className="col-md-12">
                        {/* {action === "view" && ( */}
                        <div className="nav-tabs-custom">
                            <ul className="nav nav-tabs">
                                <li className={activeTab === "moduleTab" ? "active" : ""}><Link href="" onClick={() => handleTabChange("moduleTab")}>Modul Ajar</Link></li>
                                <li className={activeTab === "learningOutcomesTab" ? "active" : ""}><Link href="" onClick={() => handleTabChange("learningOutcomesTab")}>Capaian Pembelajaran</Link></li>
                                <li className={activeTab === "activitiesTab" ? "active" : ""}><Link href="" onClick={() => handleTabChange("activitiesTab")}>Kegiatan Inti</Link></li>
                            </ul>
                            <div className="tab-content">
                                {activeTab === "moduleTab" && (
                                    <div className="active tab-pane" id="activity">
                                        <div className="box-body table-responsive no-padding">
                                            <div style={{ margin: '0 20px 20px 20px' }}>
                                                <button
                                                    type="button"
                                                    className="btn btn-success"
                                                    onClick={openModal}
                                                >
                                                    <i className="icon fa fa-plus"></i> Tambah
                                                </button>
                                                {/* <span style={{color: 'red', fontStyle: 'italic', marginLeft: '10px'}}>*modul ajar belum lengkap sampai 14 minggu</span> */}
                                            </div>
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
                                                        <td>lorem  ipsum A</td>
                                                        <td>Identitasku</td>
                                                        <td>Namaku, identitasku</td>
                                                        <td>lurator</td>
                                                        <td>
                                                            <button
                                                                style={{ marginRight: '2px', marginLeft: '2px' }}
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
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>lorem  ipsum A</td>
                                                        <td>Identitasku</td>
                                                        <td>Namaku, identitasku</td>
                                                        <td>lurator</td>
                                                        <td>
                                                            <button
                                                                style={{ marginRight: '2px', marginLeft: '2px' }}
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
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                                {activeTab === "learningOutcomesTab" && (
                                    <div className="active tab-pane" id="activity">
                                        <div className="box-body table-responsive no-padding">
                                            {showInput ? (
                                                <>
                                                    <div style={{ margin: '0 20px 20px 20px' }}>
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger"
                                                            onClick={handleShowInput}
                                                        >
                                                            <i className="icon fa fa-close"></i> Batal
                                                        </button>
                                                        {/* <span style={{color: 'red', fontStyle: 'italic', marginLeft: '10px'}}>*modul ajar belum lengkap sampai 14 minggu</span> */}
                                                    </div>
                                                    <InputSubject />
                                                </>
                                            ) : (
                                                <>
                                                    <div style={{ margin: '0 20px 20px 20px' }}>
                                                        <button
                                                            type="button"
                                                            className="btn btn-success"
                                                            onClick={handleShowInput}
                                                        >
                                                            <i className="icon fa fa-plus"></i> Tambah
                                                        </button>
                                                        {/* <span style={{color: 'red', fontStyle: 'italic', marginLeft: '10px'}}>*modul ajar belum lengkap sampai 14 minggu</span> */}
                                                    </div>
                                                    <table id="siswa" className="table table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th>Minggu</th>
                                                                <th>Tujuan Pembelajaran</th>
                                                                <th>Tujuan Kegiatan</th>
                                                                <th>Alat & Bahan</th>
                                                                <th>Peta Konsep</th>
                                                                <th>Sumber</th>
                                                                <th>Aksi</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>1</td>
                                                                <td>
                                                                    <ol>
                                                                        <li>lorem  ipsum A</li>
                                                                        <li>Identitasku</li>
                                                                        <li>Namaku, identitasku</li>
                                                                    </ol>
                                                                </td>
                                                                <td>
                                                                    <ol>
                                                                        <li>lorem  ipsum A</li>
                                                                        <li>Identitasku</li>
                                                                        <li>Namaku, identitasku</li>
                                                                    </ol>
                                                                </td>
                                                                <td>Buku, Majalah, Pensil </td>
                                                                <td>
                                                                    <ol>
                                                                        <li>lorem  ipsum A</li>
                                                                        <li>Identitasku</li>
                                                                        <li>Namaku, identitasku</li>
                                                                    </ol>
                                                                </td>
                                                                <td>Namaku, identitasku</td>
                                                                <td>
                                                                    <button
                                                                        style={{ marginRight: '2px', marginLeft: '2px' }}
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
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </>
                                            )}
                                        </div>
                                    </div>)}
                                {activeTab === "activitiesTab" && (
                                    <ActivitiesView />
                                )}
                            </div>
                        </div>
                        {/* )} */}
                        {/* {action !== "view" && <TabEditSiswa />} */}
                    </div>
                </div>
            </section>
            {/* ADD MODUL AJAR */}
            <AddSubjectModal isOpen={isModalOpen} closeModal={closeModal}></AddSubjectModal>
        </div>
    )
}

export default SubjectView
