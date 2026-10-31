import Counter from "../../_components/Counter";

export default function PlaygroundTemplate({ children }: { children: React.ReactNode }) {
  return <div className="card">
    <h2>Template (new instance on navigation)</h2>
    <Counter label="Template counter (resets)" />
    {children}
  </div>;
}
