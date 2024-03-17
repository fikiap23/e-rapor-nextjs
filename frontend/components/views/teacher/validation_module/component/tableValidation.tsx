'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';

const TableValidation = () => {
    // DATA DUMMY
    const ValidationDummy = [
        { id:1, Rombel: { nama: "X IPA 1" }, KelompokUsia: { rentang: "2-3 tahun" } },
        { id:2, Rombel: { nama: "X IPA 2" }, KelompokUsia: { rentang: "3-4 tahun" } },
        { id:3, Rombel: { nama: "X IPA 3" }, KelompokUsia: { rentang: "4-5 tahun" } },
        { id:4, Rombel: { nama: "X IPS 1" }, KelompokUsia: { rentang: "5-6 tahun" } },
        { id:5, Rombel: { nama: "X IPS 2" }, KelompokUsia: { rentang: "2-3 tahun" } },
        { id:6, Rombel: { nama: "X IPS 3" }, KelompokUsia: { rentang: "3-4 tahun" } },
        { id:7, Rombel: { nama: "X Seni 1" }, KelompokUsia: { rentang: "4-5 tahun" } },
        { id:8, Rombel: { nama: "X Seni 2" }, KelompokUsia: { rentang: "5-6 tahun" } },
        { id:9, Rombel: { nama: "X Seni 3" }, KelompokUsia: { rentang: "2-3 tahun" } },
    ];

    const [validation, setValidation] = useState(ValidationDummy);
    const [sortAscending, setSortAscending] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('');
    const [indexOfFirstItem, setIndexOfFirstItem] = useState(0);

    useEffect(() => {
        setIndexOfFirstItem((currentPage - 1) * itemsPerPage);
    }, [currentPage]);

    const handleSort = (key: any) => {
        const sortedValidation = [...validation].sort((a, b) => {
            const valueA = a[key].nama.toLowerCase();
            const valueB = b[key].nama.toUpperCase();
            return sortAscending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        });
        setValidation(sortedValidation);
        setSortAscending(!sortAscending);
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
        setCurrentPage(1);
    };

    const itemsPerPage = 10;
    const filteredValidation = validation.filter(data =>
        data.Rombel.nama.toLowerCase().includes(filter.toLowerCase()) ||
        data.KelompokUsia.rentang.toLowerCase().includes(filter.toLowerCase())
    );

    const currentValidation = filteredValidation.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="box-header">
            <div className="form-group" style={{ width: '30%' }}>
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
                <table id="validation" className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            {/* <th onClick={() => handleSort('MataPelajaran')}>Rombel <i className="fa fa-sort"></i></th> */}
                            <th>No</th>
                            <th onClick={() => handleSort('Rombel')}>Rombel <i className="fa fa-sort"></i></th>
                            <th onClick={() => handleSort('KelompokUsia')}>Kelompk Usia <i className="fa fa-sort"></i></th>
                            <th>Aksi</th>
                            {/* <th onClick={() => handleSort('Kelas')}>Kelas <i className="fa fa-sort"></i></th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {currentValidation.map((data, index) => (
                            <tr key={index}>
                                <td>{indexOfFirstItem + index + 1}</td>
                                <td>{data.Rombel.nama}</td>
                                <td>{data.KelompokUsia.rentang}</td>
                                <td>
                                    <Link href={`/teacher/validation/${data.id}`} className="btn btn-info btn-sm">
                                        <i className="icon fa fa-eye"></i> Lihat Siswa
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ul className="pagination">
                    {Array.from({ length: Math.ceil(filteredValidation.length / itemsPerPage) }, (_, i) => (
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

export default TableValidation;
