export default function SimulationInfo() {
  return (
    <div
      className="bg-white/70 backdrop-blur-md border border-gray-200 
                    rounded-xl p-2 shadow-sm"
    >
      <details className="group p-4">
        <summary
          className="cursor-pointer font-semibold text-gray-700 
                            flex justify-between items-center"
        >
          📘 SIMULATION USER MANUAL
          <span
            className="transition-transform duration-300 
                           group-open:rotate-180"
          >
            ▼
          </span>
          l̥
        </summary>

        <div className="mt-6 space-y-6">
          <div>
            <h4 className="font-medium text-blue-600">💳 Pay Simulation</h4>
            <ul className="list-disc ml-5 text-gray-600 space-y-1 text-sm">
              <li>Makes a single payment</li>
              <li>Used to test HIGH_AMOUNT detection logic</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-blue-600">📦 Quick Load</h4>
            <ul className="list-disc ml-5 text-gray-600 space-y-1 text-sm">
              <li>Simulates 10 Rapid transactions at once</li>
              <li>Used to test HIGH_VELOCITY scenarios</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-blue-600">⚙ Custom Load</h4>
            <ul className="list-disc ml-5 text-gray-600 space-y-1 text-sm">
              <li>Allows custom number of transactions</li>
              <li>Best for stress testing fraud rules</li>
            </ul>
          </div>
        </div>
      </details>
    </div>
  );
}
