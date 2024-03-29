function SchoolIdentity() {
    return (
        <div>
            <div className='header'>
                <img src="https://picsum.photos/200" alt="circle-image" width={150} className="circle-image-school" />
                <h1><b>LAPORAN</b></h1>
                <h2><b>HASIL PERKEMBANGAN ANAK DIDIK</b></h2>
                <h3><b>Semester 1 Tahun Pelajaran 2023/2024</b></h3>
                <hr style={{ borderTop: '5px solid black', margin: '20px 0' }} />
            </div>

            <div className="container-school">
                <table>
                    <tr>
                        <td >Nama Sekolah</td>
                        <td width={20}>:</td>
                        <td className="tbl">TK ERLANGGA CIRACAS ASY SYAMS ISLAMIC SCHOOL</td>
                    </tr>

                    <tr>
                        <td>NPSN</td>
                        <td width={20}>:</td>
                        <td className="tbl">2145617478</td>
                    </tr>

                    <tr>
                        <td>Alamat Sekolah</td>
                        <td width={20}>:</td>
                        <td className="tbl">JI. H. Baping No.100 Kelurahan Ciracas Kecamatan Ciracas Kota Jakarta Timur</td>
                    </tr>

                    <tr>
                        <td>Kode Pos</td>
                        <td width={20}>:</td>
                        <td className="tbl">1234</td>
                    </tr>

                    <tr>
                        <td>Nomor Telepon</td>
                        <td width={20}>:</td>
                        <td className="tbl">82946246</td>
                    </tr>

                    <tr>
                        <td>Kelurahan</td>
                        <td width={20}>:</td>
                        <td className="tbl">Cakung</td>
                    </tr>

                    <tr>
                        <td>Kecamatan</td>
                        <td width={20}>:</td>
                        <td className="tbl">Ujung Menteng</td>
                    </tr>

                    <tr>
                        <td>Kota/Kabupaten</td>
                        <td width={20}>:</td>
                        <td className="tbl">Jakarta</td>
                    </tr>

                    <tr>
                        <td>Provinsi</td>
                        <td width={20}>:</td>
                        <td className="tbl">DKI Jakarta</td>
                    </tr>
                </table>
            </div>

            <div className='footer' style={{pageBreakAfter: 'always'}}>
                <h3><b>DINAS PENDIDIKAN DKI JAKARTA</b></h3>
                <h3><b>KOTA JAKARTA TIMUR</b></h3>
            </div>
        </div>
    )
}

export default SchoolIdentity;