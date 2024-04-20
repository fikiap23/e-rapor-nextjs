import React from 'react';
import './css/dashboardAdmin.css';

const DashboardViewAdmin = () => {
  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="callout callout-info">
          <h3>Selamat datang di dashboard Admin</h3>
        </div>
        <div className="stats-container">
          <div className="stat-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="5em" height="5em" viewBox="0 0 20 20"><path fill="#47a6ff" d="M10 9a3 3 0 1 0 0-6a3 3 0 0 0 0 6M6 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0m-4.51 7.326a.78.78 0 0 1-.358-.442a3 3 0 0 1 4.308-3.516a6.484 6.484 0 0 0-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 0 1-2.07-.655m14.95.654a4.97 4.97 0 0 0 2.07-.654a.78.78 0 0 0 .357-.442a3 3 0 0 0-4.308-3.517a6.484 6.484 0 0 1 1.907 3.96a2.32 2.32 0 0 1-.026.654M18 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0M5.304 16.19a.844.844 0 0 1-.277-.71a5 5 0 0 1 9.947 0a.843.843 0 0 1-.277.71A6.975 6.975 0 0 1 10 18a6.974 6.974 0 0 1-4.696-1.81" /></svg>            <p className="stat-value">20</p>
            <p className="stat-label">Jumlah Murid</p>
          </div>
          <div className="stat-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="5em" height="5em" viewBox="0 0 640 512"><path fill="#abb800" d="M208 352c-2.39 0-4.78.35-7.06 1.09C187.98 357.3 174.35 360 160 360c-14.35 0-27.98-2.7-40.95-6.91c-2.28-.74-4.66-1.09-7.05-1.09C49.94 352-.33 402.48 0 464.62C.14 490.88 21.73 512 48 512h224c26.27 0 47.86-21.12 48-47.38c.33-62.14-49.94-112.62-112-112.62m-48-32c53.02 0 96-42.98 96-96s-42.98-96-96-96s-96 42.98-96 96s42.98 96 96 96M592 0H208c-26.47 0-48 22.25-48 49.59V96c23.42 0 45.1 6.78 64 17.8V64h352v288h-64v-64H384v64h-76.24c19.1 16.69 33.12 38.73 39.69 64H592c26.47 0 48-22.25 48-49.59V49.59C640 22.25 618.47 0 592 0" /></svg>            <p className="stat-value">20</p>
            <p className="stat-label">Jumlah Guru</p>
          </div>
          <div className="stat-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="5em" height="5em" viewBox="0 0 576 512"><path fill="#00cc22" d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0M571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93" /></svg>            <p className="stat-value">20</p>
            <p className="stat-label">Jumlah Rombel</p>
          </div>
          <div className="stat-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="5em" height="5em" viewBox="0 0 16 16"><path fill="#ff5252" fill-rule="evenodd" d="M14 4v-.994C14 2.45 13.55 2 12.994 2H11v1h-1V2H6v1H5V2H3.006C2.45 2 2 2.45 2 3.006v9.988C2 13.55 2.45 14 3.006 14h9.988C13.55 14 14 13.55 14 12.994V5H2V4zm-3-3h1.994C14.102 1 15 1.897 15 3.006v9.988A2.005 2.005 0 0 1 12.994 15H3.006A2.005 2.005 0 0 1 1 12.994V3.006C1 1.898 1.897 1 3.006 1H5V0h1v1h4V0h1zM4 7h2v1H4zm3 0h2v1H7zm3 0h2v1h-2zM4 9h2v1H4zm3 0h2v1H7zm3 0h2v1h-2zm-6 2h2v1H4zm3 0h2v1H7zm3 0h2v1h-2z" /></svg>
            <p className="stat-value">20</p>
            <p className="stat-label">Jumlah Semester</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardViewAdmin;
