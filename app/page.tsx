'use client';

import { useState, useCallback } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';

import PageWrap from '@/components/layout/PageWrap';
import TopBar from '@/components/layout/TopBar';
import ClickZones from '@/components/layout/ClickZones';
import KPI from '@/components/ui/KPI';
import Narrative from '@/components/ui/Narrative';
import ChartCard from '@/components/ui/ChartCard';
import ComparisonCard from '@/components/ui/ComparisonCard';
import DataTable from '@/components/ui/DataTable';
import FunnelChart from '@/components/charts/FunnelChart';
import Sparkline from '@/components/ui/Sparkline';
import LiveReadout from '@/components/ui/LiveReadout';
import useKeyboardNav from '@/lib/hooks/useKeyboardNav';
import useHoverReadout from '@/lib/hooks/useHoverReadout';
import { colors, accentOpacity } from '@/lib/theme';
import {
  sampleKPIs,
  sampleFunnel,
  sampleMonthlyRevenue,
  sampleSparkline,
  sampleComparison,
  sampleTableColumns,
  sampleTableRows,
} from '@/config/sample-data';

const SLIDE_TITLES = [
  'Executive Summary',
  'Pipeline Funnel',
  'Key Insights',
  'Monthly Revenue',
  'Rep Performance',
  'QoQ Comparison',
];

/** Monthly revenue totals for computing contextual MoM growth */
const revenueByMonth: Record<string, number> = {};
sampleMonthlyRevenue.forEach((d) => { revenueByMonth[d.month] = d.revenue; });
const monthOrder = sampleMonthlyRevenue.map((d) => d.month);

export default function Home() {
  const [slide, setSlide] = useState(0);

  const next = useCallback(() => setSlide((s) => Math.min(s + 1, SLIDE_TITLES.length - 1)), []);
  const prev = useCallback(() => setSlide((s) => Math.max(s - 1, 0)), []);

  useKeyboardNav({ onNext: next, onPrev: prev });

  // ── Hover readouts for each chart-bearing slide ──
  const revenueHover = useHoverReadout();
  const funnelHover = useHoverReadout();
  const comparisonHover = useHoverReadout();

  // ── Revenue bar chart hover handler ──
  const handleRevenueBarHover = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data: any) => {
      if (!data || !data.activePayload || data.activePayload.length === 0) return;
      const payload = data.activePayload[0].payload as { month: string; revenue: number };
      const idx = monthOrder.indexOf(payload.month);
      const prevRevenue = idx > 0 ? sampleMonthlyRevenue[idx - 1].revenue : null;
      const momGrowth = prevRevenue ? ((payload.revenue - prevRevenue) / prevRevenue) * 100 : null;

      let message: string;
      if (momGrowth !== null) {
        const direction = momGrowth >= 0 ? 'up' : 'down';
        message = `${payload.month} REVENUE ${direction} ${Math.abs(momGrowth).toFixed(1)}% MoM — $${(payload.revenue / 1000).toFixed(0)}K closed`;
      } else {
        message = `${payload.month} BASELINE — $${(payload.revenue / 1000).toFixed(0)}K closed (series start)`;
      }

      revenueHover.onHover({
        message,
        value: payload.revenue,
        format: 'currency',
      });
    },
    [revenueHover],
  );

  return (
    <>
      <TopBar
        title="Acme Corp"
        subtitle="Q4 Performance Review"
        currentSlide={slide}
        totalSlides={SLIDE_TITLES.length}
        onPrev={prev}
        onNext={next}
      />
      <ClickZones onPrev={prev} onNext={next} />
      <PageWrap>
        <section style={{ padding: 'var(--section-padding-y-md) 0' }}>
          {/* Slide header */}
          <div style={{ marginBottom: 48 }}>
            <span className="code-accent" style={{ display: 'block', marginBottom: 8 }}>
              [{String(slide + 1).padStart(2, '0')}]
            </span>
            <h1 className="headline-medium">{SLIDE_TITLES[slide]}</h1>
          </div>

          {/* ── Slide 0: KPI Row ── */}
          {slide === 0 && (
            <div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
                {sampleKPIs.map((kpi) => (
                  <KPI key={kpi.label} data={kpi} />
                ))}
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                <LiveReadout label="LIVE PIPELINE" value={3240000} format="currency" refreshInterval={3000} />
                <Sparkline data={sampleSparkline} />
              </div>
            </div>
          )}

          {/* ── Slide 1: Funnel ── */}
          {slide === 1 && (
            <FunnelChart
              stages={sampleFunnel}
              title="[PIPELINE_FUNNEL]"
              onStageHover={(stage, index, convRate) => {
                let message: string;
                if (index === 0) {
                  message = `${stage.value.toLocaleString()} TOTAL LEADS — top of funnel, all channels combined`;
                } else {
                  const prevStage = sampleFunnel[index - 1];
                  const dropoff = prevStage.value - stage.value;
                  message = `${convRate!.toFixed(1)}% CONVERSION from ${prevStage.label} — ${dropoff.toLocaleString()} dropped at this stage`;
                }
                funnelHover.onHover({ message, value: stage.value, format: 'number' });
              }}
              onStageHoverEnd={funnelHover.onHoverEnd}
              footer={
                <LiveReadout
                  label="HOVER A STAGE"
                  value={sampleFunnel[0].value}
                  format="number"
                  hoverData={funnelHover.readout}
                />
              }
            />
          )}

          {/* ── Slide 2: Narrative ── */}
          {slide === 2 && (
            <Narrative
              text="Q4 saw a significant uptick in enterprise deal flow driven by the new outbound motion. Win rates improved 4.4pp QoQ while average deal size held steady. The biggest opportunity for Q1 is converting the 640 open opportunities that entered the pipeline in December."
            />
          )}

          {/* ── Slide 3: Bar Chart ── */}
          {slide === 3 && (
            <ChartCard
              title="[MONTHLY_REVENUE]"
              subtitle="Jul – Dec 2024"
              footer={
                <LiveReadout
                  label="HOVER A BAR"
                  value={sampleMonthlyRevenue.reduce((sum, d) => sum + d.revenue, 0)}
                  format="currency"
                  hoverData={revenueHover.readout}
                />
              }
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sampleMonthlyRevenue}
                  onMouseMove={handleRevenueBarHover}
                  onMouseLeave={revenueHover.onHoverEnd}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={accentOpacity[20]} />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: colors.secondaryText, fontSize: 11, fontFamily: 'monospace' }}
                    axisLine={{ stroke: accentOpacity[20] }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: colors.secondaryText, fontSize: 11, fontFamily: 'monospace' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: colors.background,
                      border: `1px solid ${accentOpacity[50]}`,
                      color: colors.foreground,
                      fontFamily: 'monospace',
                      fontSize: 12,
                    }}
                    formatter={(value: unknown) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                  />
                  <Bar dataKey="revenue" fill={colors.accent} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          )}

          {/* ── Slide 4: Table ── */}
          {slide === 4 && (
            <DataTable
              title="[REP_PERFORMANCE]"
              columns={sampleTableColumns}
              rows={sampleTableRows}
            />
          )}

          {/* ── Slide 5: Comparison ── */}
          {slide === 5 && (
            <ComparisonCard
              title="[QOQ_COMPARISON]"
              items={sampleComparison}
              onItemHover={(item, delta) => {
                const direction = delta >= 0 ? 'improved' : 'declined';
                const absChange = Math.abs(item.current - item.previous);
                let detail: string;
                switch (item.format) {
                  case 'currency':
                    detail = `${item.label} ${direction} ${Math.abs(delta).toFixed(1)}% QoQ — $${absChange.toLocaleString()} net change`;
                    break;
                  case 'percent':
                    detail = `${item.label} ${direction} ${absChange.toFixed(1)}pp QoQ — now at ${item.current.toFixed(1)}%`;
                    break;
                  default:
                    detail = `${item.label} ${direction} ${Math.abs(delta).toFixed(1)}% QoQ — moved from ${item.previous.toLocaleString()} to ${item.current.toLocaleString()}`;
                }
                comparisonHover.onHover({
                  message: detail,
                  value: item.current,
                  format: item.format,
                });
              }}
              onItemHoverEnd={comparisonHover.onHoverEnd}
              footer={
                <LiveReadout
                  label="HOVER A METRIC"
                  value={sampleComparison.length}
                  format="number"
                  hoverData={comparisonHover.readout}
                />
              }
            />
          )}
        </section>
      </PageWrap>
    </>
  );
}
