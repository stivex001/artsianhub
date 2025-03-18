import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

type BarChartProps = {
  data: any;
};

const CustomBarChart = ({ data }: BarChartProps) => {
  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 40 }}
        >
          <XAxis
            dataKey="name"
            angle={5}
            interval={0}
            tick={({ x, y, payload }) => {
              const entry = data?.find((d: any) => d.name === payload.value);
              return (
                <text
                  x={x}
                  y={y + 30}
                  fill={entry ? entry.labelColor : "#333"}
                  textAnchor="middle"
                  style={{ fontSize: "10px" }}
                >
                  {payload.value.split(" ").map((line: any, index: number) => (
                    <tspan x={x} dy={index === 0 ? 0 : 14} key={index}>
                      {line}
                    </tspan>
                  ))}
                </text>
              );
            }}
          />
          <YAxis tick={{ fill: "#4A4A4A" }} />
          <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} />
          <Bar
            dataKey="value"
            barSize={67}
            // label={{
            //   position: "top",
            //   fill: "#000",
            //   fontSize: 10,
            //   fontWeight: "semibold",
            // }}
          >
            {data?.map((entry: any, index: number) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
