import {
  Cog6ToothIcon,
  CreditCardIcon,
  BoltIcon,
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export default function SimulationInfo() {
  return (
    <div
      className="bg-white/70 backdrop-blur-md border border-gray-200 
                    rounded-xl p-2 shadow-sm"
    >
      <details className="group p-4">
        <summary
          className="cursor-pointer font-semibold text-gray-800 
                            flex justify-between items-center list-none"
        >
          <div className="flex items-center gap-2 text-sm">
            <Cog6ToothIcon className="w-5 h-5 text-gray-600" />
            SIMULATION USER MANUAL
          </div>

          <ChevronDownIcon
            className="w-5 h-5 text-gray-500 transition-transform duration-300 
                       group-open:rotate-180"
          />
        </summary>

        <div className="mt-6 space-y-6">
          {/* Pay */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CreditCardIcon className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium text-blue-600">Pay Simulation</h4>
            </div>
            <ul className="list-disc ml-7 text-gray-600 space-y-1 text-sm">
              <li>Makes a single transaction</li>
              <li>Used to test HIGH_AMOUNT detection logic</li>
            </ul>
          </div>

          {/* Quick Load */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BoltIcon className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium text-blue-600">Quick Load</h4>
            </div>
            <ul className="list-disc ml-7 text-gray-600 space-y-1 text-sm">
              <li>Simulates 10 rapid transactions</li>
              <li>Used to test HIGH_VELOCITY scenarios</li>
            </ul>
          </div>

          {/* Custom Load */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AdjustmentsHorizontalIcon className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium text-blue-600">Custom Load</h4>
            </div>
            <ul className="list-disc ml-7 text-gray-600 space-y-1 text-sm">
              <li>Allows custom number of transactions</li>
              <li>Best for stress testing fraud rules</li>
            </ul>
          </div>

          {/* ML Scoring Strategy */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ChartBarIcon className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium text-blue-600">ML Based Risk Score</h4>
            </div>
            <ul className="list-disc ml-7 text-gray-600 space-y-1 text-sm">
              <li>
                Used Logistic Regression based risk scoring model to calculate a
                real time fraud probability score (0–100)
              </li>
              <li>
                Uses transaction amount, velocity and historical patterns as
                input features
              </li>
            </ul>
          </div>
        </div>
      </details>
    </div>
  );
}
