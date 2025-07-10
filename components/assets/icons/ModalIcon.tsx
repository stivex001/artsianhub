import * as React from "react"
import { SVGProps } from "react"
export const ConfirmIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={132}
    height={131}
    fill="none"
    {...props}
  >
    <circle cx={66.5} cy={65} r={46} fill="#00D261" />
    <circle cx={66} cy={65.5} r={65.5} fill="#00D261" fillOpacity={0.1} />
    <path
      fill="#fff"
      d="M66.5 78.333c7.364 0 13.333-5.97 13.333-13.333 0-7.364-5.97-13.333-13.333-13.333-7.364 0-13.333 5.97-13.333 13.333 0 7.364 5.97 13.333 13.333 13.333Z"
    />
    <path
      fill="#00D261"
      d="M64.606 69.773a.999.999 0 0 1-.707-.293l-3.773-3.773a1.006 1.006 0 0 1 0-1.413 1.006 1.006 0 0 1 1.413 0l3.067 3.066 6.853-6.853a1.006 1.006 0 0 1 1.414 0 1.006 1.006 0 0 1 0 1.413l-7.56 7.56a.999.999 0 0 1-.707.293Z"
    />
  </svg>
)

