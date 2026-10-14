import { SVGProps } from 'react'

export function BloodDropSVG(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 250" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Outer hands */}
      <ellipse cx="100" cy="230" rx="60" ry="15" fill="#fee2e2" opacity="0.5" />
      {/* Main blood drop */}
      <path
        d="M100 20 C100 20, 155 95, 155 145 C155 178, 130 205, 100 205 C70 205, 45 178, 45 145 C45 95, 100 20, 100 20Z"
        fill="url(#dropGradient)"
      />
      {/* Highlight */}
      <path
        d="M78 70 C78 70, 95 100, 95 125 C95 135, 90 142, 83 142 C76 142, 70 135, 70 125 C70 100, 78 70, 78 70Z"
        fill="white"
        opacity="0.25"
      />
      {/* Heart inside */}
      <path
        d="M100 170 C100 170, 75 150, 75 138 C75 130, 82 125, 100 140 C118 125, 125 130, 125 138 C125 150, 100 170, 100 170Z"
        fill="white"
        opacity="0.7"
      />
      {/* Heartbeat line */}
      <polyline
        points="65,152 75,152 82,140 90,165 98,135 106,160 114,145 120,152 135,152"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.8"
      />
      <defs>
        <linearGradient id="dropGradient" x1="45" y1="20" x2="155" y2="205" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f83b3b" />
          <stop offset="100%" stopColor="#a80000" />
        </linearGradient>
      </defs>
    </svg>
  )
}
