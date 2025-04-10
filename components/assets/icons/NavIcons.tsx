import * as React from "react";
import { SVGProps } from "react";
export const DownLargeArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={15}
    fill="none"
    {...props}
  >
    <path fill="#013975" d="M13.5 15 26.923 0H.077L13.5 15Z" />
  </svg>
);

export const PolygonWhite = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={15}
    fill="none"
    {...props}
  >
    <path fill="#fff" d="m13.5 0 13.423 15H.077L13.5 0Z" />
  </svg>
);

export const PolygonGrey = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={15}
    fill="none"
    {...props}
  >
    <path fill="#DEE8FF" d="m13.5 0 13.423 15H.077L13.5 0Z" />
  </svg>
);

export const PolygonBlue = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={56}
    height={45}
    fill="none"
    {...props}
  >
    <path fill="#1A60AA" d="m28 0 27.713 44.25H.287L28 0Z" />
  </svg>
)

export const EyeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={11}
    height={11}
    fill="none"
    {...props}
  >
    <path fill="url(#a)" d="M0 0h11v11H0z" />
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



export const NotificationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={29}
    height={30}
    fill="none"
    {...props}
  >
    <path
      fill="url(#a)"
      d="M0 14.135h20v20H0z"
      transform="rotate(-41.493 0 14.135)"
    />
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
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEZElEQVR4nO2cz4scRRTHn4n4A0Rxd15NfoGoi8he13lvEoKLN/GgKIy/ku33JosRxIgKohddRfCgh+hF8eKfEPwZgnhRkESjBhQ9BPEgxCD4A7NGMa5GatYBWXdmdnq6p6tq3gfqNFM925/59puurqoFMAzDMAzDMAzDMAzDMIKgNrdna531Lkf6kmM54ki/dqQ/OZZzSPqbIzmFLF/415DkWcfZrfWde12/Y87cfODiOsmiI/kQSX5E1l+R5Bg25YB/DSaFbY2F6RrLQ/7kHev5oRvpCpK8iw2VKdpz+X+P7XixjqQf9el/YqqZbYeUmWpm231yfcJyCV5XupxBlqc7wlutzY7l+Ab6nUgy2bOzrYuQ5YlCBa9pyPoDsh7a8PtJH4SUqDUWrnOkn5UleIQv5iikgmtktzuS5aql9io5kALIoo7kz8qF9ik1EDuO2o9ULXJwkw8gZlwUkn2iRSFWHOujVQvcYNk46u+EIEZcLJJJjm3Z3UaIEReLZNZDflADMeIiqcn/tp+3zu2vQWwg6zMByBu2PQ/R0GptRtZXApCWp/1y5dz+KyB0djQXpxzr2wEIy99I74eQQW7vRpZvKxc1ensfQmRHs3Vppx4HPKQeMtEr/sqEkHCktyHrN5XLKbgh6x0QAnXKbkLW96oW4kpr8lylgmuN7MbcU0wcT0OWt8qss68iy1n/iNDfT643nTO9a982R3IyedEkn5ci2kv+3weSHp5U2Uj6fRmeL+g509FD9upEasKyqaQZFn/g3h86ebKR5WwpopH1YP9veLJkY0mlo7N6x8s02doV/RWUur6C5M3+37YcuWpeLlnb1/kVQCxfJlQ6yrm962LJ1m6gXoCysWTr+Ibgk51s+WvQitRCmdxky/jXdExisrGqBY4TlWyS5UqnslaTLe+knmxkPQhVs5psfSPZZJN/3rNYhxBIOdlI8hiERJKyST6F+aULITSSKiMkZ6Z3yvUQKkkkm3TFb5mD0Bkl2diQLf4pWYWi/3Ys90EsxCobWR+HqPBr7UgWBi6gCamMkDwMMYG7sms3uEnyfDCyY5Tsp3yGP1GtTnZskle3++on+U9Yxy87OsmdzZh67+gnruOTHaNkz8D7Zw5INslTECu5ajNXIJvkZYgZZP2j2EtbC5eNLK9Hu8uqi2P9rlDRXOygxu88CG4xeR4Gz7hor0t5DIMaOedImpACjtr35LqcKcvKn4OUJyEdljb5Z7hDXs4f+5pZ6oQvycnk/k2Pu6F9zRB3H6f9+7t9y5JdY70FUqROe68ePEKU4/59a/sWLpv0MKTN0qY6y92dR6Ukpzo/Rqyn/Q9mrZnd6V/v1bNI2X6fY+mnGjOzI6wb6d76+Q1M1fz1kTEzYrItzWNKtjEkJnuMzFqyTXaSzIzwA2mUIBtJXhz2uEYe2STLfvfven2NAmUj6e/9Rp9GUbJJXhv2WMYGZPua7MuFT7KXjPMPXDaon5EfX5OtLhuGYRiGYRgGxM0/BiKRhXFPyDwAAAAASUVORK5CYII="
        id="b"
        width={90}
        height={90}
        preserveAspectRatio="none"
      />
    </defs>
  </svg>
)

export const RatingIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={54}
    height={53}
    fill="none"
    {...props}
  >
    <path
      fill="#013975"
      d="m27 0 6.286 20.038H53.63L37.172 32.423l6.286 20.038L27 40.078 10.542 52.462l6.286-20.039L.37 20.038h20.344L27 0Z"
    />
  </svg>
)

export const LogoutIcon = (props: SVGProps<SVGSVGElement>) => (
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
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACJklEQVR4nO3dvW4TQRTF8ROKABIvQHjD8FGSNwCJhoKKinegQDxBIAWEl0BCogIHRVR/tNJECijYa2dnfXxyf/2O5x6tZm3P1axUSimllFJKKQmA28AT4CNwxu44a3N+BOzLGfAA+MLuOx1qkfGdnBDyhc+Wd3ZbLtI8lBvghDwf5AZYkGchN4SSG0LJDaHkhlByQyi5IZTcEEpuCCU3hJIbQskNoeSGUHJDKLkhlNwQSm4IpXG13wVetw3e78CLYWuvgp4+6CHkf73rEjahtLruvSW7S9OHTSiNq/3nkiGmDZtQGlf7yxXDTBc2oTS+p2UIs3/YhNL4+veBtyuGew/cqaCvsObN1j9sQmn9HPqGTShtlkW/sAmlDXULm1C6hi5hM6/fwFPg4DpBGNU1/qsf8zrqHfAW6nruNqHB/e4Jz1/XN7cJMceSsYW6vrpNKHXpeOY2oYuH4VE9DIPohn+9m41VyBX03+on+Aa0pvpTaUNWIbcPiSSnkG960NRW1mxBv1oxTG3OrjIi5FvAryVDVLvBhEGf/+fyaqCZeOl4c8Wl1RLWIeh7Lezz1h42NNRUk+PUQV8KfE+9EUpuCCU3hJIbQskNoeSGUHJDKLkhlNwQSm4IJTeEkhtCyQ2h5IZQchN6COwPuWnHtqc5lhvgMXkO5ab1Ngxn46f4ZHn0/KWXKZyGhHwgZ601anjFxvGOPSAXbc6HtndyKaWUUkoppWhL/gA8W92XIF47ywAAAABJRU5ErkJggg=="
        id="b"
        width={90}
        height={90}
        preserveAspectRatio="none"
      />
    </defs>
  </svg>
)

export const HamburgerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={21}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M2.5 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 1 1 0 1.5H3.25a.75.75 0 0 1-.75-.75Zm0 5a.75.75 0 0 1 .75-.75h14.5a.75.75 0 1 1 0 1.5H3.25a.75.75 0 0 1-.75-.75Zm.75 4.25a.75.75 0 1 0 0 1.5h14.5a.75.75 0 1 0 0-1.5H3.25Z"
    />
  </svg>
);