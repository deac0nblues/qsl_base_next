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

export default function Home() {
  const [slide, setSlide] = useState(0);

  const next = useCallback(() => setSlide((s) => Math.min(s + 1, SLIDE_TITLES.length - 1)), []);
  const prev = useCallback(() => setSlide((s) => Math.max(s - 1, 0)), []);

  useKeyboardNav({ onNext: next, onPrev: prev });

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
          {slide === 1 && <FunnelChart stages={sampleFunnel} title="[PIPELINE_FUNNEL]" />}

          {/* ── Slide 2: Narrative ── */}
          {slide === 2 && (
            <Narrative
              text="Q4 saw a significant uptick in enterprise deal flow driven by the new outbound motion. Win rates improved 4.4pp QoQ while average deal size held steady. The biggest opportunity for Q1 is converting the 640 open opportunities that entered the pipeline in December."
            />
          )}

          {/* ── Slide 3: Bar Chart ── */}
          {slide === 3 && (
            <ChartCard title="[MONTHLY_REVENUE]" subtitle="Jul – Dec 2024">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sampleMonthlyRevenue}>
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
            <ComparisonCard title="[QOQ_COMPARISON]" items={sampleComparison} />
          )}
        </section>
      </PageWrap>
    </>
  );
}
