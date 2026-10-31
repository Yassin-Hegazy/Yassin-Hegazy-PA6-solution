export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <main className="shell" style={{ maxWidth: 560 }}>{children}</main>;
}
