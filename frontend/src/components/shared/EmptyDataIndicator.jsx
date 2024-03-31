import React from 'react'

const EmptyDataIndicator = ({ message }) => (
  <div className="text-center" style={{ opacity: '0.6' }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="3em"
      height="3em"
      viewBox="0 0 24 24"
    >
      <path fill="#47a6ff" fillOpacity="0" d="M5 3H12.5V8.5H19V21H5V3Z">
        <animate
          fill="freeze"
          attributeName="fill-opacity"
          begin="2.38s"
          dur="0.255s"
          values="0;0.3"
        />
      </path>
      <g
        fill="none"
        stroke="#47a6ff"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g strokeWidth="2">
          <path
            strokeDasharray="64"
            strokeDashoffset="64"
            d="M13 3L19 9V21H5V3H13"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="1.02s"
              values="64;0"
            />
          </path>
          <path strokeDasharray="6" strokeDashoffset="6" d="M9 13H13">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="1.7s"
              dur="0.34s"
              values="6;0"
            />
          </path>
          <path strokeDasharray="8" strokeDashoffset="8" d="M9 16H15">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="2.04s"
              dur="0.34s"
              values="8;0"
            />
          </path>
        </g>
        <path strokeDasharray="14" strokeDashoffset="14" d="M12.5 3V8.5H19">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="1.19s"
            dur="0.34s"
            values="14;0"
          />
        </path>
      </g>
    </svg>
    <div style={{ color: 'gray' }}>
      <p>
        <b>{message}</b>
      </p>
    </div>
  </div>
)

export default EmptyDataIndicator
