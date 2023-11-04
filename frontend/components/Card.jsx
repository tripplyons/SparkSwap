export default function Card({children, title}) {
  return (
    <div className="border border-gray-400 rounded-lg p-4">
      {title && <div className="font-bold mb-4">{title}</div>}
      {children}
    </div>
  );
}
