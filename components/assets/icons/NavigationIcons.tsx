import * as React from "react";
import { SVGProps } from "react";
export const DashboardIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path fill="url(#a)" d="M0 0h20v20H0z" />
    <defs>
      <pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#b" transform="scale(.01111)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACFElEQVR4nO2cPW4bQQxGt3FO4CHiK7gVPHOSVCmGbuzYOUg2B4sTxzmGf2r/9ArGWqRZBBIkLSlK7wHTUuDzB3p3MWDXAQAAAAAAAABAd3r66UPK9Wsq+jMVfZOi8308qehbKnqTil53s4sj0z/98ezziRT94y1BzE+9S2f1o1mSD1OyDgmvv02S3caFd7PiLvv8ykL0L+9GxV203kwuWnJ99W5UvE+uL9OL/s+Pd3uKePWLaEX0FJBoIxBtBKKNCCN6eJP8LkUf13iMepBc+1bDq34Y0a0R2fy5tXerH0b0Okkro/PkWD+M6Pk2zq7V76YmighBtCKaRI9hdAwwOpxFCDNaEb0KURInJFoRTaLH8NQxwOhwFiEHN6Pbp8iyoYis9271A4nutyDim1v9KKLfP8zn2q+VvFU//E9YP4zo6AiibUC0EYg2AtFGINqIMKK51xHqhaVyr2OpaO51GCV60zSX3azfTU0UEYJoRTSJHsPoGGB0OIsQZrQiehWiJE5ItCKaRI/hqWOA0eEsQg5uRnOvw0x0v3HiuNexXDT3OtbEbWY5EWZGR0cQbQOijUC0EYjee9GsY5tL0efJRbelr9t67ZWoJ9cfFqKv3Rstzuesfplc9OKKV71zb7b4nJT11my9cVvt27bOHqLkZLXW+B+zi6O2dbbNq73+B5nr66JHvTRf1A0AAAAAAAAA0O0mfwF6XJRd/qPyBQAAAABJRU5ErkJggg=="
        id="b"
        width={90}
        height={90}
        preserveAspectRatio="none"
      />
    </defs>
  </svg>
);

export const TimerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path fill="url(#a)" d="M0 0h20v20H0z" />
    <defs>
      <pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#b" transform="scale(.01111)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,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"
        id="b"
        width={90}
        height={90}
        preserveAspectRatio="none"
      />
    </defs>
  </svg>
);

export const GalleryIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path fill="url(#a)" d="M0 0h20v20H0z" />
    <defs>
      <pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#b" transform="scale(.01111)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,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"
        id="b"
        width={90}
        height={90}
        preserveAspectRatio="none"
      />
    </defs>
  </svg>
);

export const SubcriptionIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path fill="url(#a)" d="M0 0h20v20H0z" />
    <defs>
      <pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#b" transform="scale(.01111)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,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"
        id="b"
        width={90}
        height={90}
        preserveAspectRatio="none"
      />
    </defs>
  </svg>
);

export const HamburgerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={14}
    fill="none"
    {...props}
  >
    <path
      stroke="#013975"
      d="M0 13h25M0 13h25M0 13h25M0 7h15M0 7h15M0 7h15M0 1h25M0 1h25M0 1h25"
    />
  </svg>
);
