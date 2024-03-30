"use client";
import { useState, useEffect } from "react";
import semesterService from "@/services/semesterService/semester.service";
import useAuth from "@/hooks/useAuth";

const EditSemesterModal = ({ isOpen, closeModal, semesterData }) => {
  const { token } = useAuth();
  const [dataEdit, setDataEdit] = useState({
    tahunAjaranAwal: "",
    tahunAjaranAkhir: "",
    jenisSemester: "",
    namaKepsek: "",
    nipKepsek: "",
    tglBagiRapor: "",
    isAktif: false,
  });

  useEffect(() => {
    if (isOpen && semesterData) {
      setDataEdit(semesterData);
    }
  }, []);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setDataEdit({
      ...dataEdit,
      [name]: checked, // Ubah nilai sesuai dengan status checkbox
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataEdit({ ...dataEdit, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dummy function for handling form submission
    console.log("Form values:", dataEdit);
    // Add logic for form submission, e.g., sending data to server
    // await semesterService.update(token, semesterData.id, dataEdit);
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
            <form role="form" onSubmit={handleSubmit}>
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
                  <label htmlFor="inputDatepickerTglLahir">
                    Tanggal Raport
                  </label>
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
                <div className="form-group flex gap-3">
                  <label htmlFor="isAktif"> Status Aktif</label>
                  <input
                    type="checkbox"
                    name="isAktif"
                    checked={dataEdit.isAktif}
                    onChange={handleCheckboxChange}
                    className="w-6 h-6 border-solid border-2 border-sky-500"
                    id="isAktif"
                    value={dataEdit.isAktif || ""}
                  />
                </div>
              </div>
              <div className="box-footer">
                <button type="submit" className="btn btn-primary">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSemesterModal;
