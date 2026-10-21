
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  ChartNoAxesCombined,
  Settings,
  Search,
  Bell,
  Menu,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  X,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Analytics", icon: ChartNoAxesCombined },
  { label: "Orders", icon: ShoppingCart },
  { label: "Customers", icon: Users },
  { label: "Products", icon: Package },
];

const stats = [
  {
    title: "Total Revenue",
    value: "$54,239",
    change: "12.8%",
    positive: true,
    icon: DollarSign,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Total Orders",
    value: "2,456",
    change: "8.2%",
    positive: true,
    icon: ShoppingCart,
    color: "bg-violet-50 text-violet-600",
  },
  {
    title: "Total Customers",
    value: "8,549",
    change: "5.4%",
    positive: true,
    icon: Users,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Conversion Rate",
    value: "3.62%",
    change: "1.2%",
    positive: false,
    icon: ChartNoAxesCombined,
    color: "bg-orange-50 text-orange-600",
  },
];

const orders = [
  { id: "#DB-1001", customer: "Olivia Martin", product: "Pro Plan", amount: "$249.00", status: "Completed" },
  { id: "#DB-1002", customer: "Jackson Lee", product: "Basic Plan", amount: "$99.00", status: "Pending" },
  { id: "#DB-1003", customer: "Isabella Chen", product: "Enterprise", amount: "$499.00", status: "Completed" },
  { id: "#DB-1004", customer: "William Kim", product: "Pro Plan", amount: "$249.00", status: "Cancelled" },
  { id: "#DB-1005", customer: "Sofia Patel", product: "Basic Plan", amount: "$99.00", status: "Completed" },
];

const revenue = [
  { month: "Jan", value: 35 },
  { month: "Feb", value: 52 },
  { month: "Mar", value: 42 },
  { month: "Apr", value: 68 },
  { month: "May", value: 55 },
  { month: "Jun", value: 82 },
  { month: "Jul", value: 65 },
  { month: "Aug", value: 92 },
  { month: "Sep", value: 72 },
  { month: "Oct", value: 86 },
  { month: "Nov", value: 62 },
  { month: "Dec", value: 100 },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter((order) =>
    `${order.id} ${order.customer} ${order.product} ${order.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {menuOpen && (
        <button
          aria-label="Close sidebar"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform lg:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <ChartNoAxesCombined size={23} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">DevBoard</h1>
            <p className="text-xs text-slate-500">Analytics Platform</p>
          </div>
          <button
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="ml-auto lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4 pt-7">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Workspace
          </p>
          <nav className="space-y-1">
            {navigation.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => {
                  setActivePage(label);
                  setMenuOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                  activePage === label
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon size={19} />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto border-t border-slate-100 p-4">
          <button
            onClick={() => setActivePage("Settings")}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${
              activePage === "Settings"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Settings size={19} />
            Settings
          </button>

          <div className="mt-4 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
              MS
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Admin User</p>
              <p className="truncate text-xs text-slate-500">admin@devboard.com</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="min-h-screen lg:pl-64">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={22} />
            </button>
            <div>
              <h2 className="text-xl font-bold">{activePage}</h2>
              <p className="hidden text-xs text-slate-500 sm:block">
                Welcome back! Here's what's happening today.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <label className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
              <Search size={17} className="text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search orders..."
                className="w-36 bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </label>
            <button
              aria-label="Notifications"
              className="relative rounded-xl border border-slate-200 p-2.5 hover:bg-slate-50"
            >
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <span className="hidden text-sm font-medium sm:block">Admin</span>
          </div>
        </header>

        <div className="mx-auto max-w-[1600px] space-y-7 p-4 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Overview</h3>
              <p className="mt-1 text-sm text-slate-500">
                Monitor your business performance at a glance.
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-700"
            >
              Export Report
            </button>
          </div>

          <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(({ title, value, change, positive, icon: Icon, color }) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500">{title}</span>
                  <span className={`rounded-xl p-2.5 ${color}`}>
                    <Icon size={20} />
                  </span>
                </div>
                <p className="mt-5 text-3xl font-bold tracking-tight">{value}</p>
                <div className="mt-3 flex items-center gap-1 text-xs">
                  {positive ? (
                    <ArrowUpRight size={16} className="text-emerald-600" />
                  ) : (
                    <ArrowDownRight size={16} className="text-red-500" />
                  )}
                  <span className={positive ? "font-semibold text-emerald-600" : "font-semibold text-red-500"}>
                    {change}
                  </span>
                  <span className="text-slate-400">vs. last month</span>
                </div>
              </article>
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 xl:col-span-2">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold">Revenue Overview</h3>
                  <p className="mt-1 text-sm text-slate-500">Monthly revenue performance</p>
                </div>
                <span className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium">
                  This year
                </span>
              </div>

              <div className="mt-8 flex h-64 items-end gap-2 sm:gap-4">
                {revenue.map((item) => (
                  <div key={item.month} className="flex h-full min-w-0 flex-1 flex-col justify-end gap-3">
                    <div className="flex flex-1 items-end">
                      <div
                        title={`${item.month}: $${item.value * 1000}`}
                        style={{ height: `${item.value}%` }}
                        className={`w-full rounded-t-md transition-all hover:bg-blue-700 ${
                          item.month === "Dec" ? "bg-blue-600" : "bg-blue-100"
                        }`}
                      />
                    </div>
                    <span className="text-center text-[10px] text-slate-400 sm:text-xs">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <h3 className="font-bold">Sales Summary</h3>
              <p className="mt-1 text-sm text-slate-500">Performance this month</p>

              <div className="mt-8 flex items-center justify-center">
                <div
                  className="flex h-48 w-48 items-center justify-center rounded-full"
                  style={{
                    background: "conic-gradient(#2563eb 0% 65%, #a78bfa 65% 85%, #e2e8f0 85% 100%)",
                  }}
                >
                  <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">
                    <span className="text-xs text-slate-500">Total Sales</span>
                    <strong className="mt-1 text-2xl">$24.5k</strong>
                  </div>
                </div>
              </div>

              <div className="mt-7 space-y-4">
                {[
                  { label: "Online Sales", amount: "$15,925", color: "bg-blue-600" },
                  { label: "In-store Sales", amount: "$4,900", color: "bg-violet-400" },
                  { label: "Other", amount: "$3,675", color: "bg-slate-200" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-slate-500">
                      <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                      {item.label}
                    </div>
                    <strong>{item.amount}</strong>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 p-5 sm:p-6">
              <div>
                <h3 className="font-bold">Recent Orders</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Track your latest customer transactions.
                </p>
              </div>
              <span className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">
                {filteredOrders.length} orders
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Order ID</th>
                    <th className="px-6 py-4 font-semibold">Customer</th>
                    <th className="px-6 py-4 font-semibold">Product</th>
                    <th className="px-6 py-4 font-semibold">Amount</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="transition hover:bg-slate-50">
                      <td className="px-6 py-4 font-semibold text-blue-600">{order.id}</td>
                      <td className="px-6 py-4 font-medium">{order.customer}</td>
                      <td className="px-6 py-4 text-slate-500">{order.product}</td>
                      <td className="px-6 py-4 font-semibold">{order.amount}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            order.status === "Completed"
                              ? "bg-emerald-50 text-emerald-700"
                              : order.status === "Pending"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredOrders.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <footer className="pb-3 text-center text-xs text-slate-400">
            DevBoard Analytics · Demo dashboard with sample data
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
