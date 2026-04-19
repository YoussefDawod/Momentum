import { useMemo } from "react";
import { Clock, Flame, Target, Sparkles, Download, Zap } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import PageWrapper from "../components/Layout/PageWrapper";
import Card, { CardHeader, CardTitle, CardSubtitle, CardBody } from "../components/ui/Card";
import StatsCard from "../components/Stats/StatsCard";
import Button from "../components/ui/Button";
import { useSessions } from "../context/SessionsContext";
import { METHODS } from "../utils/constants";
import { formatClock, formatDate, formatDuration } from "../utils/formatters";
import { calculateStreak } from "../utils/streak";
import { exportSessionsAsJson } from "../utils/exportSessions";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import styles from "./StatsPage.module.css";

const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

const toMondayBased = (day) => (day === 0 ? 6 : day - 1);

const buildWeeklyData = (sessions) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days = Array.from({ length: 7 }, (_, offset) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - offset));
    return {
      label: WEEKDAYS[toMondayBased(date.getDay())],
      date,
      minutes: 0,
    };
  });

  sessions.forEach((session) => {
    const sessionDate = new Date(session.date);
    sessionDate.setHours(0, 0, 0, 0);
    const bucket = days.find((d) => d.date.getTime() === sessionDate.getTime());
    if (bucket) bucket.minutes += Math.round(session.totalMinutes || 0);
  });

  return days;
};

const StatsPage = () => {
  useDocumentTitle("Statistik — Momentum");
  const { sessions, clearSessions } = useSessions();

  const weeklyData = useMemo(() => buildWeeklyData(sessions), [sessions]);

  const stats = useMemo(() => {
    const totalMinutes = sessions.reduce((sum, s) => sum + (s.totalMinutes || 0), 0);
    const totalSessions = sessions.length;
    const totalCycles = sessions.reduce((sum, s) => sum + (s.completedCycles || 0), 0);
    const weekMinutes = weeklyData.reduce((sum, d) => sum + d.minutes, 0);
    return { totalMinutes, totalSessions, totalCycles, weekMinutes };
  }, [sessions, weeklyData]);

  const streak = useMemo(() => calculateStreak(sessions), [sessions]);

  const recentSessions = sessions.slice(0, 10);

  return (
    <PageWrapper
      title="Statistik"
      description="Verfolge deine Produktivität und sieh, wie sich deine Fokus-Zeit entwickelt."
    >
      <div className={styles.statsGrid}>
        <StatsCard
          icon={Clock}
          label="Diese Woche"
          value={formatDuration(stats.weekMinutes)}
          hint={`${weeklyData.filter((d) => d.minutes > 0).length} aktive Tage`}
          accent="primary"
          index={0}
        />
        <StatsCard
          icon={Flame}
          label="Gesamt-Fokus"
          value={formatDuration(stats.totalMinutes)}
          hint="Alle Zeit"
          accent="primary"
          index={1}
        />
        <StatsCard
          icon={Target}
          label="Sitzungen"
          value={stats.totalSessions}
          hint="Abgeschlossen"
          accent="secondary"
          index={2}
        />
        <StatsCard
          icon={Zap}
          label="Streak"
          value={`${streak.current} ${streak.current === 1 ? "Tag" : "Tage"}`}
          hint={streak.longest > 0 ? `Bestwert: ${streak.longest} Tage` : "Starte heute!"}
          accent="secondary"
          index={3}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Wöchentliche Übersicht</CardTitle>
          <CardSubtitle>Fokus-Minuten der letzten 7 Tage</CardSubtitle>
        </CardHeader>
        <CardBody>
          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={weeklyData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  width={40}
                />
                <Tooltip
                  cursor={{ fill: "var(--color-primary-soft)" }}
                  contentStyle={{
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-md)",
                    color: "var(--color-text)",
                    fontSize: "0.875rem",
                  }}
                  formatter={(value) => [`${value} min`, "Fokus"]}
                  labelStyle={{ color: "var(--color-text-secondary)" }}
                />
                <Bar
                  dataKey="minutes"
                  fill="var(--color-primary)"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={48}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Letzte Sitzungen</CardTitle>
          <CardSubtitle>
            {sessions.length > 0
              ? `Deine ${Math.min(10, sessions.length)} letzten Sitzungen`
              : "Noch keine abgeschlossenen Sitzungen"}
          </CardSubtitle>
        </CardHeader>
        <CardBody>
          {recentSessions.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon} aria-hidden="true">
                <Sparkles size={28} />
              </span>
              <p className={styles.emptyText}>
                Noch nichts zu sehen — dein erster Fokus-Moment wartet.
              </p>
            </div>
          ) : (
            <ul className={styles.list}>
              {recentSessions.map((session) => (
                <li key={session.id} className={styles.item}>
                  <div className={styles.itemMain}>
                    <span className={styles.itemMethod}>
                      {METHODS[session.method]?.label ?? session.method}
                    </span>
                    <span className={styles.itemDate}>
                      {formatDate(session.date)} · {formatClock(session.date)}
                    </span>
                  </div>
                  <div className={styles.itemMeta}>
                    <span>{formatDuration(session.totalMinutes)}</span>
                    <span className={styles.itemCycles}>
                      {session.completedCycles} Zyklen
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {sessions.length > 0 && (
            <div className={styles.clearWrap}>
              <Button
                variant="secondary"
                size="sm"
                icon={Download}
                onClick={() => exportSessionsAsJson(sessions)}
              >
                Exportieren
              </Button>
              <Button variant="ghost" size="sm" onClick={clearSessions}>
                Verlauf löschen
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </PageWrapper>
  );
};

export default StatsPage;
