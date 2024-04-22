'use client'
import React, { useEffect, useState } from 'react';
import './css/dashboardTeacher.css';
import useAuth from '@/hooks/useAuth';
import { useDashboardTeacher } from '@/hooks/useDashboardTeacher';

const DashboardViewTeacher = () => {
  const { token } = useAuth()
  const [muridDiampu, setMuridDiampu] = useState(0)
  const [raportTersedia, setRaportTersedia] = useState(0)
  const [raportNonTersedia, setRaportNonTersedia] = useState(0)

  const {
    data: dashboardTeacher,
    error: errorDashboardTeacher,
    isFetching: isFetchingDashboardTeacher,
    refetch: refetchDashboardTeacher,
  } = useDashboardTeacher(token)

  console.log(dashboardTeacher);

  useEffect(() => {
    if (dashboardTeacher && errorDashboardTeacher === null && isFetchingDashboardTeacher === false) {
      setMuridDiampu(dashboardTeacher?.totalMuridDiampu)
      setRaportTersedia(dashboardTeacher?.totalRaportTersedia)
      setRaportNonTersedia(dashboardTeacher?.totalRaportBelumSiap)
    }
  }, [dashboardTeacher, errorDashboardTeacher, isFetchingDashboardTeacher, refetchDashboardTeacher])

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="callout callout-info">
          <h3>Selamat datang di dashboard Guru</h3>
        </div>
        <div className="stats-container">
          <div className="stat-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="5em" height="5em" viewBox="0 0 20 20"><path fill="#47a6ff" d="M10 9a3 3 0 1 0 0-6a3 3 0 0 0 0 6M6 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0m-4.51 7.326a.78.78 0 0 1-.358-.442a3 3 0 0 1 4.308-3.516a6.484 6.484 0 0 0-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 0 1-2.07-.655m14.95.654a4.97 4.97 0 0 0 2.07-.654a.78.78 0 0 0 .357-.442a3 3 0 0 0-4.308-3.517a6.484 6.484 0 0 1 1.907 3.96a2.32 2.32 0 0 1-.026.654M18 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0M5.304 16.19a.844.844 0 0 1-.277-.71a5 5 0 0 1 9.947 0a.843.843 0 0 1-.277.71A6.975 6.975 0 0 1 10 18a6.974 6.974 0 0 1-4.696-1.81" /></svg>
            <p className="stat-value">{isFetchingDashboardTeacher ?
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><circle cx="4" cy="12" r="3" fill="#009411"><animate id="svgSpinners3DotsBounce0" attributeName="cy" begin="0;svgSpinners3DotsBounce1.end+0.25s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12" /></circle><circle cx="12" cy="12" r="3" fill="#009411"><animate attributeName="cy" begin="svgSpinners3DotsBounce0.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12" /></circle><circle cx="20" cy="12" r="3" fill="#009411"><animate id="svgSpinners3DotsBounce1" attributeName="cy" begin="svgSpinners3DotsBounce0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12" /></circle></svg>
              : muridDiampu}
            </p>
            <p className="stat-label">Jumlah Murid Diampu</p>
          </div>

          <div className="stat-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="5em" height="5em" viewBox="0 0 24 24"><path fill="#abb800" d="m19 2l-5 4.5v11l5-4.5zM6.5 5C4.55 5 2.45 5.4 1 6.5v14.66c0 .25.25.5.5.5c.1 0 .15-.07.25-.07c1.35-.65 3.3-1.09 4.75-1.09c1.95 0 4.05.4 5.5 1.5c1.35-.85 3.8-1.5 5.5-1.5c1.65 0 3.35.31 4.75 1.06c.1.05.15.03.25.03c.25 0 .5-.25.5-.5V6.5c-.6-.45-1.25-.75-2-1V19c-1.1-.35-2.3-.5-3.5-.5c-1.7 0-4.15.65-5.5 1.5V6.5C10.55 5.4 8.45 5 6.5 5" /></svg>
            <p className="stat-value">{isFetchingDashboardTeacher ?
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><circle cx="4" cy="12" r="3" fill="#009411"><animate id="svgSpinners3DotsBounce0" attributeName="cy" begin="0;svgSpinners3DotsBounce1.end+0.25s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12" /></circle><circle cx="12" cy="12" r="3" fill="#009411"><animate attributeName="cy" begin="svgSpinners3DotsBounce0.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12" /></circle><circle cx="20" cy="12" r="3" fill="#009411"><animate id="svgSpinners3DotsBounce1" attributeName="cy" begin="svgSpinners3DotsBounce0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12" /></circle></svg>
              : `${raportTersedia}/${muridDiampu}`}
            </p>
            <p className="stat-label">Jumlah Raport Tersedia</p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default DashboardViewTeacher;
