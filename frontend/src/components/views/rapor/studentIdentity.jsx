function StudentIdentity() {
    return (
        <div>
            <div className="header" style={{ marginTop: '10%' }}>
                <h3 className="tbl">IDENTITAS PESERTA DIDIK</h3>
            </div>

            <div className="container-student">
                <table>
                    <tr>
                        <td>1. Nama Peserta Didik</td>
                        <td width={20}>:</td>
                        <td className="tbl">ANAK2</td>
                    </tr>

                    <tr>
                        <td>2. NIS</td>
                        <td width={20}>:</td>
                        <td className="tbl">1718390</td>
                    </tr>

                    <tr>
                        <td>3. Tempat, Tanggal Lahir</td>
                        <td width={20}>:</td>
                        <td className="tbl">Jakarta, 4 Februari</td>
                    </tr>

                    <tr>
                        <td>4. Jenis Kelamin</td>
                        <td width={20}>:</td>
                        <td className="tbl">L</td>
                    </tr>

                    <tr>
                        <td>5. Agama</td>
                        <td width={20}>:</td>
                        <td className="tbl">Islam</td>
                    </tr>

                    <tr>
                        <td>6. Anak Ke-</td>
                        <td width={20}>:</td>
                        <td className="tbl">3</td>
                    </tr>

                    <tr>
                        <td>7. Orangtua</td>
                    </tr>

                    <tr>
                        <td style={{ paddingLeft: '30px' }}>a. Ayah</td>
                        <td width={20}>:</td>
                        <td className="tbl">Lili Suparli</td>
                    </tr>

                    <tr>
                        <td style={{ paddingLeft: '30px' }}>b. Ibu</td>
                        <td width={20}>:</td>
                        <td className="tbl">Ai Sumartini</td>
                    </tr>

                    <tr>
                        <td>8. Pekerjaan Orangtua</td>
                    </tr>

                    <tr>
                        <td style={{ paddingLeft: '30px' }}>a. Ayah</td>
                        <td width={20}>:</td>
                        <td className="tbl">Buruh</td>
                    </tr>

                    <tr>
                        <td style={{ paddingLeft: '30px' }}>b. Ibu</td>
                        <td width={20}>:</td>
                        <td className="tbl">Ibu Rumah Tangga</td>
                    </tr>

                    <tr>
                        <td>9. Alamat</td>
                    </tr>

                    <tr>
                        <td style={{ paddingLeft: '30px' }}>Jalan</td>
                        <td width={20}>:</td>
                        <td className="tbl">Cianjur Kulon</td>
                    </tr>

                    <tr>
                        <td style={{ paddingLeft: '30px' }}>Kelurahan/Desa</td>
                        <td width={20}>:</td>
                        <td className="tbl">Gunung Tandala</td>
                    </tr>

                    <tr>
                        <td style={{ paddingLeft: '30px' }}>Kecamatan/Kota</td>
                        <td width={20}>:</td>
                        <td className="tbl">Kawalu</td>
                    </tr>

                    <tr>
                        <td style={{ paddingLeft: '30px' }}>Kabupaten/Kota</td>
                        <td width={20}>:</td>
                        <td className="tbl">Jakarta</td>
                    </tr>

                    <tr>
                        <td>10. Provinsi</td>
                        <td width={20}>:</td>
                        <td className="tbl">DKI Jakarta</td>
                    </tr>

                    {/* <tr>
                            <td>Orang Tua</td>
                        </tr>
                        <tr style={{ backgroundColor: 'red' }}>
                            <td colSpan={3}>
                                <table>
                                    <tr>
                                        <td>a. Ayah</td>
                                        <td width={20}>:</td>
                                        <td>Abdul</td>
                                    </tr>
                                    <tr>
                                        <td>b. Ibu</td>
                                        <td>:</td>
                                        <td>Umi</td>
                                    </tr>
                                </table>
                            </td>
                        </tr> */}
                </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
                <img src="https://picsum.photos/200" alt="circle-image" width={150} />
                <div className="ttd" style={{ marginLeft: '20px' }}>
                    <p style={{ marginBottom: '30%' }}>Kepala TK ERLANGGA CIRACAS<br />ASY SYAMS ISLAMIC SCHOOL</p>
                    <p style={{ fontWeight: 'bold', margin: '0' }}>LILIANA ASTUTI</p>
                    <hr style={{ borderColor: 'black', margin: '5px 0', width: '100%' }} />
                    <p style={{ fontWeight: 'bold', margin: '0' }}>NIP. 1234567890</p>
                </div>
            </div>


        </div>
    )
}

export default StudentIdentity;