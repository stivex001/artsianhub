"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  className?: string;
};

const Charts: React.FC<Props> = ({ className }) => {
  const data = [
    {
      name: "Total No of Appointment",
      value: 50,
      color: "#5691D1",
      labelColor: "#5691D1",
    },
    {
      name: "Accepted Appointment",
      value: 30,
      color: "#1F873B",
      labelColor: "#1F873B",
    },
    {
      name: "Declined Appointment",
      value: 18,
      color: "#AE2525",
      labelColor: "#AE2525",
    },
    {
      name: "Completed Appointment",
      value: 28,
      color: "#0D3D73",
      labelColor: "#0D3D73",
    },
  ];

  return (
    <div className={` ${className}`}>
      <div className="w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap={40} className="-mx-8">
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="name"
              interval={0}
              tick={({ x, y, payload }) => {
                const item = data[payload.index];
                return (
                  <text
                    x={x}
                    y={y + 5}
                    fill={item.labelColor}
                    fontSize={10}
                    textAnchor="middle"
                    width="100%"
                  >
                    {item.name.split(" ").map((line, index) => (
                      <tspan key={index} x={x} dy={index * 16}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                );
              }}
            />

            <YAxis
              tick={{ fill: "#0D3D73", fontSize: 12 }}
              tickCount={10}
              domain={[0, 200]}
            />

            <Tooltip cursor={{ fill: "transparent" }} />

            {/* Single Bar to Avoid Duplication */}
            <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40} fill="#000">
              {data.map((entry, index) => (
                <rect key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
