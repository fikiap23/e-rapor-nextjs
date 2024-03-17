'use client'
import { useState, useEffect } from 'react';

const TableHistory = () => {
    // Data dummy
    const Riwayat = [
        { Tahun: { tahun: "2020/2021" }, MataPelajaran: { nama: "Nilai Agama dan Budi Pekerti" }, Kelas: { nama: "A1" } },
        { Tahun: { tahun: "2021/2022" }, MataPelajaran: { nama: "Jati Diri" }, Kelas: { nama: "A2" } },
        { Tahun: { tahun: "2021/2022" }, MataPelajaran: { nama: "Dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, dan Seni" }, Kelas: { nama: "A3" } },
        { Tahun: { tahun: "2020/2021" }, MataPelajaran: { nama: "Nilai Agama dan Budi Pekerti" }, Kelas: { nama: "B1" } },
        { Tahun: { tahun: "2021/2022" }, MataPelajaran: { nama: "Jati Diri" }, Kelas: { nama: "B2" } },
        { Tahun: { tahun: "2021/2022" }, MataPelajaran: { nama: "Dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, dan Seni" }, Kelas: { nama: "B3" } },
        { Tahun: { tahun: "2020/2021" }, MataPelajaran: { nama: "Nilai Agama dan Budi Pekerti" }, Kelas: { nama: "C1" } },
        { Tahun: { tahun: "2021/2022" }, MataPelajaran: { nama: "Jati Diri" }, Kelas: { nama: "C2" } },
        { Tahun: { tahun: "2021/2022" }, MataPelajaran: { nama: "Dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, dan Seni" }, Kelas: { nama: "C3" } },
        { Tahun: { tahun: "2020/2021" }, MataPelajaran: { nama: "Nilai Agama dan Budi Pekerti" }, Kelas: { nama: "D1" } },
        { Tahun: { tahun: "2021/2022" }, MataPelajaran: { nama: "Jati Diri" }, Kelas: { nama: "D2" } },
        { Tahun: { tahun: "2021/2022" }, MataPelajaran: { nama: "Dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, dan Seni" }, Kelas: { nama: "D3" } },
    ];



    const [riwayat, setRiwayat] = useState(Riwayat);
    const [sortAscending, setSortAscending] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('');
    const [indexOfFirstItem, setIndexOfFirstItem] = useState(0);

    useEffect(() => {
        setIndexOfFirstItem((currentPage - 1) * itemsPerPage);
    }, [currentPage]);

    const handleSort = (key: string) => {
        const sortedRiwayat = [...riwayat].sort((a, b) => {
            const valueA = a[key].nama.toUpperCase();
            const valueB = b[key].nama.toUpperCase();
            return sortAscending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        });
        setRiwayat(sortedRiwayat);
        setSortAscending(!sortAscending);
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
        setCurrentPage(1);
    };

    const itemsPerPage = 10;
    const filteredRiwayat = riwayat.filter(data =>
        data.Tahun.tahun.toLowerCase().includes(filter.toLowerCase()) ||
        data.MataPelajaran.nama.toLowerCase().includes(filter.toLowerCase()) ||
        data.Kelas.nama.toLowerCase().includes(filter.toLowerCase())
    );

    const currentRiwayat = filteredRiwayat.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="box-header">
            <div className="form-group" style={{ width: '30%' }}>
                {/* <label htmlFor="filter">Cari:</label> */}
                <input
                    type="text"
                    id="filter"
                    className="form-control"
                    value={filter}
                    placeholder='Masukan pencarian'
                    onChange={handleFilterChange}
                />
            </div>
            <div className="box-body">
                <table id="riwayat" className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Tahun Ajaran</th>
                            {/* <th onClick={() => handleSort('Tahun')}>Tahun Ajaran <i className="fa fa-sort"></i></th> */}
                            <th onClick={() => handleSort('MataPelajaran')}>Rombel <i className="fa fa-sort"></i></th>
                            <th onClick={() => handleSort('Kelas')}>Kelas <i className="fa fa-sort"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRiwayat.map((data, index) => (
                            <tr key={index}>
                                <td>{indexOfFirstItem + index + 1}</td>
                                <td>{data.Tahun.tahun}</td>
                                <td>{data.MataPelajaran.nama}</td>
                                <td>{data.Kelas.nama}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ul className="pagination">
                    {Array.from({ length: Math.ceil(filteredRiwayat.length / itemsPerPage) }, (_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                            <button onClick={() => paginate(i + 1)} className="page-link">
                                {i + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TableHistory;
