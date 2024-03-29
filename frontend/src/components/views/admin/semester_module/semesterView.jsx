"use client";
import { useState, useEffect } from "react";
import AddSemesterModal from "./addSemesterModal";
import semesterService from "@/services/semesterService/semester.service";
import useAuth from "@/hooks/useAuth";

const SemesterView = () => {
  const { token } = useAuth();
  const [dataSemester, setDataSemester] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await semesterService.getAll(token);
      // setDataSemester(data);
      console.log(data);
    };
    fetchData();
  }, [dataSemester]);
  const dummyData = [
    // {
    //   id: 1,
    //   tahun: 2022,
    //   kepala_sekolah: 'John Doe',
    //   tgl_raport: '2022-01-01',
    //   semester: 'Ganjil',
    //   status: 'Aktif',
    // },
    // {
    //   id: 2,
    //   tahun: 2023,
    //   kepala_sekolah: 'Jane Doe',
    //   tgl_raport: '2023-01-01',
    //   semester: 'Genap',
    //   status: 'Nonaktif',
    // },
    // {
    //   id: 3,
    //   tahun: 2024,
    //   kepala_sekolah: 'Alice Smith',
    //   tgl_raport: '2024-01-01',
    //   semester: 'Ganjil',
    //   status: 'Aktif',
    // },
  ];

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  const openModal = () => {
    setIsOpenAddModal(true);
  };

  const closeModal = () => {
    setIsOpenAddModal(false);
  };

  return (
    <>
      <div className="content-wrapper">
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <div className="box box-solid box-primary">
                <div className="box-header">
                  <h3 className="box-title">
                    <i className="fa fa-calendar"></i> Data Tahun
                  </h3>
                </div>

                <div className="box-body">
                  <div style={{ margin: "0 20px 20px 20px" }}>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={openModal}
                    >
                      <i className="icon fa fa-plus"></i> Tambah
                    </button>
                  </div>
                  <table
                    className="table table-bordered table-striped"
                    id="tahun"
                  >
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Tahun</th>
                        <th>Kepala Sekolah</th>
                        <th>Tgl Raport</th>
                        <th>Semester</th>
                        <th>Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dummyData.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.tahun}</td>
                          <td>{item.kepala_sekolah}</td>
                          <td>{item.tgl_raport}</td>
                          <td>{item.semester}</td>
                          <td>
                            <span
                              className={`label bg-${
                                item.status === "Aktif" ? "green" : "red"
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-primary btn-sm">
                              <i className="icon fa fa-edit"></i>
                            </button>
                            {item.status === "Nonaktif" ? (
                              <button
                                className="btn btn-success btn-sm"
                                style={{ marginLeft: "5px" }}
                              >
                                <span className="glyphicon glyphicon-user"></span>{" "}
                                Aktifkan User
                              </button>
                            ) : (
                              <button
                                className="btn btn-danger btn-sm"
                                style={{ marginLeft: "5px" }}
                              >
                                <span className="glyphicon glyphicon-user"></span>{" "}
                                Nonaktifkan User
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <AddSemesterModal
        isOpen={isOpenAddModal}
        closeModal={closeModal}
      ></AddSemesterModal>
    </>
  );
};
export default SemesterView;
