<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Calculadora EPC Micheal y Nandy</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    input, select { outline: none; }
  </style>
</head>
<body class="min-h-screen bg-gradient-to-br from-sky-100 via-white to-amber-100 p-5 md:p-10">
  <main class="mx-auto max-w-6xl space-y-6">
    <section class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <div class="mb-4 text-center md:text-left text-4xl md:text-5xl font-black tracking-wide">
          <span class="text-amber-500">HQS</span> <span class="text-sky-500">ENERGY</span>
        </div>
        <h1 class="bg-gradient-to-r from-sky-700 to-amber-500 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
          Calculadora interna de EPC y comisión
        </h1>
        <p class="mt-2 text-lg font-bold text-slate-800">Calculadora EPC Micheal y Nandy</p>
        <p class="mt-1 max-w-3xl text-sm text-slate-600 md:text-base">
          Calcula tamaño del sistema, producción aproximada, total del sistema, EPC y comisión por rol.
        </p>
      </div>
      <div class="flex items-center gap-2 rounded-2xl border border-sky-100 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-md">
        <span>🛡️</span><span class="text-sm text-slate-700">Modo visual privado</span>
      </div>
    </section>

    <section class="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div class="rounded-3xl border border-white/40 bg-white/85 p-6 shadow-xl shadow-sky-100/50 backdrop-blur-xl">
        <h2 class="mb-5 flex items-center gap-2 text-xl font-bold text-slate-800">🧮 Entradas</h2>
        <div class="grid gap-5 md:grid-cols-2">
          <div class="space-y-2 md:col-span-2">
            <label class="text-sm font-medium text-slate-700">Tipo de Sunrun</label>
            <select id="mode" class="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm shadow-sm focus:border-sky-400 focus:ring-4 focus:ring-sky-100">
              <option value="pv">SUNRUN PV</option>
              <option value="full">SUNRUN FULL</option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-700">Cantidad de paneles</label>
            <input id="panels" type="number" value="20" class="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm shadow-sm focus:border-sky-400 focus:ring-4 focus:ring-sky-100" />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-700">Watts por panel</label>
            <div class="flex h-12 items-center rounded-2xl border bg-slate-100 px-4 text-sm text-slate-700">410 W</div>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-700">Cantidad de baterías</label>
            <input id="batteries" type="number" value="1" class="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm shadow-sm focus:border-sky-400 focus:ring-4 focus:ring-sky-100" />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-700">Marca de batería</label>
            <select class="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm shadow-sm focus:border-sky-400 focus:ring-4 focus:ring-sky-100">
              <option>Tesla</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-700">Rol del vendedor</label>
            <select id="role" class="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm shadow-sm focus:border-sky-400 focus:ring-4 focus:ring-sky-100">
              <option value="0.06">Trainee — 6%</option>
              <option value="0.10" selected>Consultor — 10%</option>
              <option value="0.11">Líder — 11%</option>
              <option value="0.12">Gerente — 12%</option>
              <option value="0.14">Partner — 14%</option>
              <option value="0.16">Partner Ejecutivo — 16%</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-700">Tipo de techo</label>
            <select class="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm shadow-sm focus:border-sky-400 focus:ring-4 focus:ring-sky-100">
              <option>Cemento</option>
            </select>
          </div>
          <div class="space-y-2 md:col-span-2">
            <label class="text-sm font-medium text-slate-700">EPC de venta</label>
            <input id="saleEpc" type="number" step="0.01" placeholder="Ej: 6.00" class="h-12 w-full rounded-2xl border-2 border-sky-500 bg-sky-50 px-4 text-sm shadow-sm focus:border-sky-600 focus:ring-4 focus:ring-sky-100" />
          </div>
          <div class="grid gap-3 md:col-span-2 md:grid-cols-2">
            <div class="rounded-3xl bg-gradient-to-br from-sky-600 via-cyan-500 to-amber-400 p-5 text-white shadow-2xl shadow-sky-300/30">
              <div class="text-sm">EPC Base</div><div id="epcBaseBig" class="text-3xl font-black">0.00</div>
            </div>
            <div class="rounded-3xl bg-gradient-to-br from-sky-600 via-cyan-500 to-amber-400 p-5 text-white shadow-2xl shadow-sky-300/30">
              <div class="text-sm">EPC Venta</div><div id="epcSaleBig" class="text-3xl font-black">0.00</div>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-3xl border border-white/40 bg-white/85 p-6 shadow-xl shadow-sky-100/50 backdrop-blur-xl">
        <h2 class="mb-5 flex items-center gap-2 text-xl font-bold text-slate-800">📈 Resultados</h2>
        <div class="grid grid-cols-2 gap-3" id="metrics"></div>
        <div class="mt-4 rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-slate-50 p-4 text-sm text-slate-600 shadow-sm">
          <div class="grid gap-3 md:grid-cols-2">
            <div><div class="text-slate-500">Offset promedio</div><div id="offset" class="text-2xl font-bold text-sky-700">0%</div></div>
            <div><div class="text-slate-500">Recomendación 120%</div><div id="rec120" class="text-2xl font-bold text-amber-600">—</div></div>
          </div>
        </div>
      </div>

      <div class="rounded-3xl border border-white/40 bg-white/85 p-6 shadow-xl shadow-sky-100/50 backdrop-blur-xl lg:col-span-2">
        <h2 class="text-xl font-bold text-slate-800">📊 Promedio de Consumo</h2>
        <p class="mt-1 text-sm text-slate-600">Calcula el promedio de los 3 meses más altos y estima paneles necesarios.</p>
        <div class="mt-5 grid gap-5 md:grid-cols-2">
          <div class="space-y-2"><label class="text-sm font-medium text-slate-700">Mes alto 1 (kWh)</label><input id="c1" type="number" value="0" class="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm shadow-sm focus:border-sky-400 focus:ring-4 focus:ring-sky-100" /></div>
          <div class="space-y-2"><label class="text-sm font-medium text-slate-700">Mes alto 2 (kWh)</label><input id="c2" type="number" value="0" class="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm shadow-sm focus:border-sky-400 focus:ring-4 focus:ring-sky-100" /></div>
          <div class="space-y-2"><label class="text-sm font-medium text-slate-700">Mes alto 3 (kWh)</label><input id="c3" type="number" value="0" class="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm shadow-sm focus:border-sky-400 focus:ring-4 focus:ring-sky-100" /></div>
          <div class="space-y-2"><label class="text-sm font-medium text-slate-700">Promedio mensual</label><div id="avg" class="flex h-12 items-center rounded-2xl border bg-slate-100 px-4 text-slate-700">0 kWh</div></div>
          <div class="rounded-2xl bg-gradient-to-r from-sky-600 to-amber-400 p-5 text-white md:col-span-2">
            <div class="text-sm">Paneles estimados</div><div id="panelsNeeded" class="text-3xl font-black">0 paneles</div>
            <button id="usePanels" type="button" class="mt-4 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-sky-700 shadow-sm">Usar este cálculo arriba</button>
          </div>
        </div>
      </div>
    </section>
  </main>

<script>
const WATTS_PER_PANEL = 410;
const SUN_HOURS_ANNUAL = 1440;
const EPC_SUNRUN = 2.35;

const money = n => new Intl.NumberFormat('es-PR', { style: 'currency', currency: 'USD' }).format(Number(n) || 0);
const num = (n, d = 2) => new Intl.NumberFormat('es-PR', { minimumFractionDigits: d, maximumFractionDigits: d }).format(Number(n) || 0);
const epcFmt = n => new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(n) || 0);

function sunrunPvBatteryTotal(count) {
  let total = 0;
  if (count >= 1) total += 10000;
  if (count >= 2) total += 12500;
  if (count >= 3) total += 11500;
  if (count > 3) total += (count - 3) * 11500;
  return total;
}
function sunrunPvCommissionBattery(count) {
  let total = 0;
  if (count >= 2) total += 12500;
  if (count >= 3) total += 11500;
  if (count > 3) total += (count - 3) * 11500;
  return total;
}
function sunrunFullBatteryTotal(count) {
  let total = 0;
  if (count >= 1) total += 12500;
  if (count >= 2) total += 11500;
  if (count > 2) total += (count - 2) * 11500;
  return total;
}
function metric(title, value, danger=false) {
  return `<div class="rounded-2xl border p-4 ${danger ? 'border-red-200 bg-red-50' : 'bg-slate-50'}"><div class="text-sm ${danger ? 'text-red-600' : 'text-slate-500'}">${title}</div><div class="mt-1 text-xl font-semibold ${danger ? 'text-red-700' : 'text-slate-900'}">${value}</div></div>`;
}
function production(panelCount) {
  const watts = panelCount * WATTS_PER_PANEL;
  const annualProduction = watts * SUN_HOURS_ANNUAL / 1000;
  return { annualProduction, monthlyProduction: annualProduction / 12 };
}
function recalc() {
  const mode = document.getElementById('mode').value;
  const panels = Math.max(0, Number(document.getElementById('panels').value) || 0);
  const batteries = Math.max(0, Number(document.getElementById('batteries').value) || 0);
  const roleRate = Number(document.getElementById('role').value) || 0;
  const saleEpcInput = Number(document.getElementById('saleEpc').value) || 0;
  const watts = panels * WATTS_PER_PANEL;
  const kw = watts / 1000;
  const baseSolar = watts * EPC_SUNRUN;
  const batteryTotal = mode === 'full' ? sunrunFullBatteryTotal(batteries) : sunrunPvBatteryTotal(batteries);
  const total = baseSolar + batteryTotal;
  const epcBase = watts > 0 ? total / watts : 0;
  const commissionBaseAmount = mode === 'full' ? total : baseSolar + sunrunPvCommissionBattery(batteries);
  const commission = commissionBaseAmount * roleRate;
  const saleEpcFinal = saleEpcInput > 0 ? saleEpcInput : epcBase;
  const saleTotal = watts * saleEpcFinal;
  const saleCommission = (saleEpcFinal - epcBase) * watts;
  const prod = production(panels);
  const c1 = Number(document.getElementById('c1').value) || 0;
  const c2 = Number(document.getElementById('c2').value) || 0;
  const c3 = Number(document.getElementById('c3').value) || 0;
  const avg = (c1 + c2 + c3) / 3 || 0;
  const annualConsumption = avg * 12;
  const offsetPercent = annualConsumption > 0 ? (prod.annualProduction / annualConsumption) * 100 : 0;
  const productionPerPanel = (WATTS_PER_PANEL * SUN_HOURS_ANNUAL) / 1000;
  const panelsNeeded = annualConsumption > 0 ? Math.ceil((annualConsumption * 1.2) / productionPerPanel) : 0;
  const extraPanels = Math.max(panelsNeeded - panels, 0);

  document.getElementById('epcBaseBig').textContent = epcFmt(epcBase);
  document.getElementById('epcSaleBig').textContent = epcFmt(saleEpcFinal);
  document.getElementById('metrics').innerHTML = [
    metric('kW', `${num(kw)} kW`),
    metric('Watts', `${num(watts, 0)} W`),
    metric('Promedio consumo anual actual', `${num(annualConsumption, 0)} kWh`),
    metric('Promedio consumo mensual actual', `${num(avg, 0)} kWh`),
    metric('Producción Anual', `${num(prod.annualProduction, 0)} kWh`),
    metric('Producción Mensual', `${num(prod.monthlyProduction, 0)} kWh`),
    metric('Sistema Base', money(total)),
    metric('Comisión Base', money(commission)),
    metric('Sistema Venta', money(saleTotal)),
    metric('Comisión Venta', money(saleCommission), saleCommission < 0)
  ].join('');
  document.getElementById('avg').textContent = `${num(avg, 0)} kWh`;
  document.getElementById('offset').textContent = `${num(offsetPercent, 0)}%`;
  document.getElementById('rec120').textContent = extraPanels > 0 ? `Añadir ${extraPanels} paneles` : (annualConsumption > 0 ? 'Ya está en 120%' : '—');
  document.getElementById('panelsNeeded').textContent = `${panelsNeeded} paneles`;
  document.getElementById('usePanels').onclick = () => { document.getElementById('panels').value = panelsNeeded; recalc(); };
}
['mode','panels','batteries','role','saleEpc','c1','c2','c3'].forEach(id => document.getElementById(id).addEventListener('input', recalc));
recalc();
</script>
</body>
</html>
