export default function Card({ title, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      {title && (
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      )}
      {children}
    </div>
  );
}
