import * as React from "react";
import { SVGProps } from "react";
export const TrustedIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#516CF4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      d="M13.336 4.666H2.669c-.736 0-1.333.597-1.333 1.333v6.667c0 .736.597 1.333 1.333 1.333h10.667c.736 0 1.333-.597 1.333-1.333V5.999c0-.736-.597-1.333-1.333-1.333Z"
    />
    <path
      stroke="#516CF4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      d="M10.67 14V3.333A1.333 1.333 0 0 0 9.335 2H6.669a1.333 1.333 0 0 0-1.333 1.333V14"
    />
  </svg>
);

export const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 19.5a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21.003 21.5l-4.3-4.3"
    />
  </svg>
);

export const BarMenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 12h16M4 6h16M4 18h16"
    />
  </svg>
);

export const ArrowRightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.333}
        d="m6 12 4-4-4-4"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);

export const RighArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16.459 9.771h-12.5M11.417 4.751l5.042 5.02-5.042 5.02"
    />
  </svg>
)