"use client";

import React, { useEffect, useMemo, useState } from "react";

const WATTS_PER_PANEL = 410;
const SUN_HOURS_ANNUAL = 1440;
const EPC_SUNRUN = 2.35;

type Program = "pv" | "full";
type Role =
  | "trainee"
  | "consultor"
  | "lider"
  | "gerente"
  | "partner"
  | "partner_ejecutivo";

const ROLE_RATES: Record<Role, number> = {
  trainee: 0.06,
  consultor: 0.1,
  lider: 0.11,
  gerente: 0.12,
  partner: 0.14,
  partner_ejecutivo: 0.16,
};

const ROLE_LABELS: Record<Role, string> = {
  trainee: "Trainee — 6%",
  consultor: "Consultor — 10%",
  lider: "Líder — 11%",
  gerente: "Gerente — 12%",
  partner: "Partner — 14%",
  partner_ejecutivo: "Partner Ejecutivo — 16%",
};

const getProductionPerPanel = () =>
  (WATTS_PER_PANEL * SUN_HOURS_ANNUAL) / 1000;

const getProduction = (panels: number) => {
  const watts = panels * WATTS_PER_PANEL;
  const annualProduction = (watts * SUN_HOURS_ANNUAL) / 1000;
  const monthlyProduction = annualProduction / 12;

  return {
    annualProduction,
    monthlyProduction,
  };
};

const getSunrunPvBatteryTotal = (count: number) => {
  let total = 0;
  if (count >= 1) total += 10000;
  if (count >= 2) total += 12500;
  if (count >= 3) total += 11500;
  if (count > 3) total += (count - 3) * 11500;
  return total;
};

const getSunrunPvCommissionBattery = (count: number) => {
  let total = 0;
  if (count >= 2) total += 12500;
  if (count >= 3) total += 11500;
  if (count > 3) total += (count - 3) * 11500;
  return total;
};

const getSunrunFullBatteryTotal = (count: number) => {
  let total = 0;
  if (count >= 1) total += 12500;
  if (count >= 2) total += 11500;
  if (count > 2) total += (count - 2) * 11500;
  return total;
};

const fmtMoney = (n: number) =>
  new Intl.NumberFormat("es-PR", {
    style: "currency",
    currency: "USD",
  }).format(n || 0);

const fmtNum = (n: number, d = 2) =>
  new Intl.NumberFormat("es-PR", {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  }).format(n || 0);

const fmtEpc = (n: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n || 0);

export default function Home() {
  const [program, setProgram] = useState<Program>("pv");
  const [panels, setPanels] = useState(20);
  const [batteries, setBatteries] = useState(1);
  const [role, setRole] = useState<Role>("consultor");
  const [saleEpc, setSaleEpc] = useState(0);
  const [c1, setC1] = useState(0);
  const [c2, setC2] = useState(0);
  const [c3, setC3] = useState(0);

  const avg = (Number(c1) + Number(c2) + Number(c3)) / 3 || 0;
  const panelProductionMonthly = getProductionPerPanel() / 12;
  const panelsNeeded = avg > 0 ? avg / panelProductionMonthly : 0;

  const data = useMemo(() => {
    const panelCount = Number(panels) || 0;
    const batteryCount = Number(batteries) || 0;
    const saleEpcValue = Number(saleEpc) || 0;

    const watts = panelCount * WATTS_PER_PANEL;
    const kw = watts / 1000;
    const baseSolar = watts * EPC_SUNRUN;
    const { annualProduction, monthlyProduction } = getProduction(panelCount);
    const roleRate = ROLE_RATES[role];

    let batteryTotal = 0;
    let commissionBase = 0;

    if (program === "pv") {
      batteryTotal = getSunrunPvBatteryTotal(batteryCount);
      commissionBase = baseSolar + getSunrunPvCommissionBattery(batteryCount);
    } else {
      batteryTotal = getSunrunFullBatteryTotal(batteryCount);
      commissionBase = baseSolar + batteryTotal;
    }

    const total = baseSolar + batteryTotal;
    const epc = watts > 0 ? total / watts : 0;
    const commission = commissionBase * roleRate;
    const saleEpcFinal = saleEpcValue > 0 ? saleEpcValue : epc;
    const saleTotal = watts * saleEpcFinal;
    const saleCommission = (saleEpcFinal - epc) * watts;

    return {
      watts,
      kw,
      annualProduction,
      monthlyProduction,
      baseSolar,
      batteryTotal,
      total,
      epc,
      commission,
      saleEpc: saleEpcValue,
      saleTotal,
      saleCommission,
    };
  }, [panels, batteries, role, saleEpc, program]);

  const annualConsumption = avg * 12;
  const offsetPercent =
    annualConsumption > 0 ? (data.annualProduction / annualConsumption) * 100 : 0;

  const panelsFor120Offset =
    annualConsumption > 0
      ? Math.ceil((annualConsumption * 1.2) / getProductionPerPanel())
      : 0;

  const extraPanelsFor120 = Math.max(panelsFor120Offset - panels, 0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-amber-100 p-6 md:p-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 flex justify-center md:justify-start">
              <div className="text-4xl font-bold tracking-wide md:text-5xl">
                <span className="text-amber-500">HQS</span>{" "}
                <span className="text-sky-500">ENERGY</span>
              </div>
            </div>

            <h1 className="bg-gradient-to-r from-sky-700 to-amber-500 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
              Calculadora interna de EPC y comisión
            </h1>

            <p className="mt-2 text-lg font-semibold text-slate-700">
              Calculadora EPC Micheal y Nandy
            </p>

            <p className="mt-1 max-w-3xl text-sm text-slate-600 md:text-base">
              Calcula tamaño del sistema, producción aproximada, total del
              sistema, EPC y comisión por rol.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-sky-100 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-md">
            <span>🛡️</span>
            <span className="text-sm text-slate-700">Modo visual privado</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>🧮 Entradas</CardTitle>
            </CardHeader>

            <CardContent className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label>Programa Sunrun</Label>
                <div className="grid gap-3 md:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setProgram("pv")}
                    className={`rounded-2xl border px-5 py-4 text-left shadow-sm transition ${
                      program === "pv"
                        ? "border-sky-500 bg-sky-50 text-sky-800"
                        : "border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    <div className="text-lg font-bold">SUNRUN PV</div>
                    <div className="text-xs">Fórmula actual</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setProgram("full")}
                    className={`rounded-2xl border px-5 py-4 text-left shadow-sm transition ${
                      program === "full"
                        ? "border-amber-500 bg-amber-50 text-amber-800"
                        : "border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    <div className="text-lg font-bold">SUNRUN FULL</div>
                    <div className="text-xs">Nueva fórmula con batería FULL</div>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Cantidad de paneles</Label>
                <Input
                  type="number"
                  value={panels}
                  onChange={(e) => setPanels(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label>Watts por panel</Label>
                <Display>{WATTS_PER_PANEL} W</Display>
              </div>

              <div className="space-y-2">
                <Label>Cantidad de baterías</Label>
                <Input
                  type="number"
                  value={batteries}
                  onChange={(e) => setBatteries(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label>Marca de batería</Label>
                <Display>Tesla</Display>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Rol del vendedor</Label>
                <select
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 text-sm shadow-sm outline-none transition-all focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                >
                  {Object.entries(ROLE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>EPC de venta</Label>
                <Input
                  className="border-2 border-sky-500 bg-sky-50 focus:border-sky-600 focus:ring-sky-500"
                  type="number"
                  step="0.01"
                  placeholder="Ej: 5.50"
                  value={saleEpc === 0 ? "" : saleEpc}
                  onChange={(e) => setSaleEpc(Number(e.target.value))}
                />
              </div>

              <div className="grid gap-3 md:col-span-2 md:grid-cols-2">
                <Highlight title="EPC Base" value={fmtEpc(data.epc)} />
                <Highlight
                  title="EPC Venta"
                  value={fmtEpc(data.saleEpc || data.epc)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📈 Resultados</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Metric title="kW" value={`${fmtNum(data.kw)} kW`} />
                <Metric title="Watts" value={`${fmtNum(data.watts, 0)} W`} />
                <Metric title="PV Base" value={fmtMoney(data.baseSolar)} />
                <Metric title="Baterías" value={fmtMoney(data.batteryTotal)} />
                <Metric
                  title="Promedio consumo anual actual"
                  value={`${fmtNum(avg * 12, 0)} kWh`}
                />
                <Metric
                  title="Promedio consumo mensual actual"
                  value={`${fmtNum(avg, 0)} kWh`}
                />
                <Metric
                  title="Producción Anual"
                  value={`${fmtNum(data.annualProduction, 0)} kWh`}
                />
                <Metric
                  title="Producción Mensual"
                  value={`${fmtNum(data.monthlyProduction, 0)} kWh`}
                />
                <Metric title="Sistema Base" value={fmtMoney(data.total)} />
                <Metric title="Comisión Base" value={fmtMoney(data.commission)} />
                <Metric title="Sistema Venta" value={fmtMoney(data.saleTotal)} />
                <Metric
                  title="Comisión Venta"
                  value={fmtMoney(data.saleCommission)}
                  danger={data.saleCommission < 0}
                />
              </div>

              <div className="rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50 p-4 text-sm text-slate-600 shadow-sm">
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <div className="text-slate-500">Offset promedio</div>
                    <div className="text-2xl font-bold text-sky-700">
                      {fmtNum(offsetPercent, 0)}%
                    </div>
                  </div>

                  <div>
                    <div className="text-slate-500">Recomendación 120%</div>
                    <div className="text-2xl font-bold text-amber-600">
                      {extraPanelsFor120 > 0
                        ? `Añadir ${extraPanelsFor120} paneles`
                        : "Ya está en 120%"}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>📊 Promedio de Consumo</CardTitle>
              <CardDescription>
                Calcula el promedio de los 3 meses más altos y estima paneles
                necesarios.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Mes alto 1 (kWh)</Label>
                <Input
                  type="number"
                  value={c1}
                  onChange={(e) => setC1(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label>Mes alto 2 (kWh)</Label>
                <Input
                  type="number"
                  value={c2}
                  onChange={(e) => setC2(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label>Mes alto 3 (kWh)</Label>
                <Input
                  type="number"
                  value={c3}
                  onChange={(e) => setC3(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label>Promedio mensual</Label>
                <Display>{fmtNum(avg, 0)} kWh</Display>
              </div>

              <div className="rounded-2xl bg-gradient-to-r from-sky-600 to-amber-400 p-5 text-white md:col-span-2">
                <div className="text-sm">Paneles estimados</div>
                <div className="text-3xl font-bold">
                  {Math.ceil(panelsNeeded)} paneles
                </div>

                <button
                  type="button"
                  onClick={() => setPanels(Math.ceil(panelsNeeded))}
                  className="mt-4 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-sky-700 shadow-sm"
                >
                  Usar este cálculo arriba
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

function Card({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-3xl border border-white/40 bg-white/80 shadow-xl shadow-sky-100/40 backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

function CardHeader({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

function CardContent({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`px-6 pb-6 ${className}`}>{children}</div>;
}

function CardTitle({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`flex items-center gap-2 text-xl font-bold ${className}`}>{children}</div>;
}

function CardDescription({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <p className={`text-sm text-slate-600 ${className}`}>{children}</p>;
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", ...rest } = props;

  return (
    <input
      {...rest}
      className={`h-12 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 text-sm text-slate-900 shadow-sm outline-none transition-all duration-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 ${className}`}
    />
  );
}

function Label({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`text-sm font-medium text-slate-700 ${className}`}>
      {children}
    </label>
  );
}

function Display({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-12 items-center rounded-2xl border bg-slate-100 px-4 text-sm text-slate-700">
      {children}
    </div>
  );
}

function Highlight({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/20 bg-gradient-to-br from-sky-600 via-cyan-500 to-amber-400 p-5 text-white shadow-2xl shadow-sky-300/30">
      <div className="text-sm">{title}</div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}

function Metric({
  title,
  value,
  danger = false,
}: {
  title: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        danger ? "border-red-200 bg-red-50" : "bg-slate-50"
      }`}
    >
      <div className={`text-sm ${danger ? "text-red-600" : "text-slate-500"}`}>
        {title}
      </div>
      <div className={`mt-1 text-xl font-semibold ${danger ? "text-red-700" : ""}`}>
        {value}
      </div>
    </div>
  );
}
