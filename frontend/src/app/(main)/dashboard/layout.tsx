import Link from "next/link";

export default function DashboardLayout({ children, stats, recent }: {
  children: React.ReactNode;
  stats: React.ReactNode;
  recent: React.ReactNode;
}) {
  return <>
    <h1>Dashboard</h1>
    <p className="row"><Link href="/dashboard">Overview</Link><Link href="/dashboard/settings">Settings</Link></p>
    {children}
    <div className="grid">
      <section className="card">{stats}</section>
      <section className="card">{recent}</section>
    </div>
  </>;
}
