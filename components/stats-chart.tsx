"use client";

import {
  Area,
  AreaChart,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

type ChartPoint = {
  time: string;
  subscribers: number;
  views: number;
  videos: number;
};

const axisProps = {
  tick: { fill: "#8ea4c7", fontSize: 11 },
  tickLine: false,
  axisLine: { stroke: "#1d2a45" }
};

const tooltipStyle = {
  backgroundColor: "#0b1324",
  border: "1px solid #1d2a45",
  borderRadius: "10px",
  color: "#e5f1ff"
};

function ChartShell({ children }: { children: React.ReactNode }) {
  return <div style={{ width: "100%", height: 320 }}>{children}</div>;
}

export function StatsChart({ data }: { data: ChartPoint[] }) {
  return (
    <ChartShell>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 14, right: 16, left: 4, bottom: 0 }}>
          <defs>
            <linearGradient id="subscribersFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10d9ff" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#10d9ff" stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#1d2a45" strokeDasharray="4 4" />
          <XAxis dataKey="time" {...axisProps} minTickGap={30} />
          <Tooltip contentStyle={tooltipStyle} />
          <Area
            type="monotone"
            dataKey="subscribers"
            stroke="#10d9ff"
            fill="url(#subscribersFill)"
            strokeWidth={2.4}
            name="Abonnes"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartShell>
  );
}

export function ViewsAreaChart({ data }: { data: ChartPoint[] }) {
  return (
    <ChartShell>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 14, right: 16, left: 4, bottom: 0 }}>
          <defs>
            <linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3ba7ff" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#3ba7ff" stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#1d2a45" strokeDasharray="4 4" />
          <XAxis dataKey="time" {...axisProps} minTickGap={30} />
          <Tooltip contentStyle={tooltipStyle} />
          <Area
            type="monotone"
            dataKey="views"
            stroke="#3ba7ff"
            fill="url(#viewsFill)"
            strokeWidth={2.2}
            name="Vues"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartShell>
  );
}

export function VideosBarChart({ data }: { data: ChartPoint[] }) {
  return (
    <ChartShell>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 14, right: 16, left: 4, bottom: 0 }}>
          <defs>
            <linearGradient id="videosFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#37ffb1" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#37ffb1" stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#1d2a45" strokeDasharray="4 4" />
          <XAxis dataKey="time" {...axisProps} minTickGap={30} />
          <Tooltip contentStyle={tooltipStyle} />
          <Area
            type="monotone"
            dataKey="videos"
            stroke="#37ffb1"
            fill="url(#videosFill)"
            strokeWidth={2.2}
            name="Videos"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartShell>
  );
}
