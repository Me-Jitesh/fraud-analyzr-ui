export default function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      {title && (
        <h3 className="text-sm font-medium text-gray-500 mb-4">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
