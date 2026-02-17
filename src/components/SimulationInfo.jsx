export default function SimulationInfo() {
  return (
    <>
      <div>
        <h4 className="font-medium text-blue-600">💳 Pay Simulation</h4>
        <ul className="list-disc ml-5 text-gray-600 space-y-1">
          <li>Simulates a single payment transaction.</li>
          <li>Used to test HIGH_AMOUNT detection logic.</li>
        </ul>
      </div>

      <div>
        <h4 className="font-medium text-blue-600">📦 Bulk Simulation</h4>
        <ul className="list-disc ml-5 text-gray-600 space-y-1">
          <li>Simulates multiple transactions at once.</li>
          <li>Used to test HIGH_VELOCITY scenarios.</li>
        </ul>
      </div>

      <div>
        <h4 className="font-medium text-blue-600">⚙ Custom Simulation</h4>
        <ul className="list-disc ml-5 text-gray-600 space-y-1">
          <li>Allows manual control over transaction data.</li>
          <li>Test specific fraud combinations.</li>
          <li>Best for stress testing fraud rules.</li>
        </ul>
      </div>
    </>
  );
}
