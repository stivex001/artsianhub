import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  {
    name: "Total Appointment",
    value: 60,
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

const CustomBarChart = () => {
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
              const entry = data.find((d) => d.name === payload.value);
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
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
