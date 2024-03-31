"use client";
import { formatDate } from "@/lib/helperDate";
import semesterService from "@/services/semesterService/semester.service";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
const EditSemesterModal = ({
  isOpen,
  closeModal,
  semesterData,
  token,
  refetch,
}) => {
  const [dataEdit, setDataEdit] = useState({});

  useEffect(() => {
    if (isOpen) {
      setDataEdit({
        id: semesterData.id,
        isAktif: semesterData.isAktif,
        jenisSemester: semesterData.jenisSemester,
        tglBagiRapor: formatDate(new Date(semesterData.tglBagiRapor)),
        namaKepsek: semesterData.namaKepsek,
        nipKepsek: semesterData.nipKepsek,
        tahunAjaranAwal: semesterData.tahunAjaranAwal,
        tahunAjaranAkhir: semesterData.tahunAjaranAkhir,
      });
    }
  }, [semesterData]);

  const handleToggle = () => {
    setDataEdit({ ...dataEdit, isAktif: !dataEdit.isAktif });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataEdit({ ...dataEdit, [name]: value });
  };

  const handleSubmit = () => {
    try {
      semesterService
        .update(token, dataEdit.id, dataEdit)
        .then((result) => {
          Swal.fire({
            icon: "success",
            title: "Data semester telah diperbarui",
            position: "bottom-center",
          });
          refetch();
          closeModal();
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
            position: "bottom-center",
          });
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
        position: "top-right",
      });
    }
  };

  return (
    <div
      className={`modal fade overscroll-auto scroll-auto  ${
        isOpen ? "in show-modal" : ""
      }`}
      id="add-modal"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 className="modal-title">Edit</h4>
          </div>
          <div className="modal-body ">
            <div className="box-body ">
              <div className="form-group">
                <label>Tahun Ajaran Awal</label>
                <input
                  type="number"
                  required
                  name="tahunAjaranAwal"
                  className="form-control"
                  onChange={handleChange}
                  value={dataEdit.tahunAjaranAwal || ""}
                />
              </div>
              <div className="form-group">
                <label>Tahun Ajaran Akhir</label>
                <input
                  type="number"
                  required
                  name="tahunAjaranAkhir"
                  className="form-control"
                  onChange={handleChange}
                  value={dataEdit.tahunAjaranAkhir || ""}
                />
              </div>
              <div className="form-group">
                <label>Semester</label>
                <select
                  required
                  name="jenisSemester"
                  className="form-control"
                  onChange={handleChange}
                  value={dataEdit.jenisSemester || ""}
                >
                  <option value="">--- Pilih Semester ---</option>
                  <option value="GANJIL">Ganjil</option>
                  <option value="GENAP">Genap</option>
                  {/* Add other options */}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="namaKepsek">Kepala Sekolah</label>
                <input
                  type="text"
                  className="form-control"
                  id="namaKepsek"
                  name="namaKepsek"
                  placeholder="Masukkan Nama Kepala Sekolah"
                  required
                  onChange={handleChange}
                  value={dataEdit.namaKepsek || ""}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nipKepsek">NIP</label>
                <input
                  type="text"
                  className="form-control"
                  id="nipKepsek"
                  name="nipKepsek"
                  placeholder="Masukkan NIP"
                  required
                  onChange={handleChange}
                  value={dataEdit.nipKepsek || ""}
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputDatepickerTglLahir">Tanggal Raport</label>
                <div className="input-group date">
                  <div className="input-group-addon">
                    <i className="fa fa-calendar"></i>
                  </div>
                  <input
                    type="date"
                    required
                    name="tglBagiRapor"
                    className="form-control pull-right"
                    id="tglBagiRapor"
                    onChange={handleChange}
                    value={dataEdit.tglBagiRapor || ""}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Status Aktif</label>
                <br />
                <div onClick={handleToggle} className="switch">
                  <input
                    type="checkbox"
                    name="isAktif"
                    checked={dataEdit.isAktif}
                  />
                  <span className="slider round"></span>
                </div>
              </div>
            </div>
            <div className="box-footer">
              <button onClick={handleSubmit} className="btn btn-primary">
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSemesterModal;
