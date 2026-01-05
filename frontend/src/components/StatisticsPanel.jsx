import { Activity, AlertTriangle, Globe, TrendingUp } from 'lucide-react';

function StatisticsPanel({ statistics }) {
  if (!statistics) return null;

  const mortalityColor = statistics.mortality_rate > 10 ? 'text-red-600' :
                         statistics.mortality_rate > 5 ? 'text-orange-600' :
                         'text-yellow-600';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total de Brotes</p>
            <p className="text-3xl font-bold text-indigo-600">{statistics.total_outbreaks}</p>
          </div>
          <Activity className="w-12 h-12 text-indigo-600 opacity-20" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total de Casos</p>
            <p className="text-3xl font-bold text-blue-600">{statistics.total_cases.toLocaleString()}</p>
          </div>
          <TrendingUp className="w-12 h-12 text-blue-600 opacity-20" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total de Muertes</p>
            <p className="text-3xl font-bold text-red-600">{statistics.total_deaths.toLocaleString()}</p>
          </div>
          <AlertTriangle className="w-12 h-12 text-red-600 opacity-20" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Tasa de Mortalidad</p>
            <p className={`text-3xl font-bold ${mortalityColor}`}>
              {statistics.mortality_rate}%
            </p>
          </div>
          <Globe className="w-12 h-12 text-gray-600 opacity-20" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 col-span-1 md:col-span-2">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Distribución por Severidad</h3>
        <div className="space-y-2">
          {Object.entries(statistics.severity_distribution).map(([severity, count]) => (
            <div key={severity} className="flex items-center justify-between">
              <span className="text-sm capitalize">{severity}:</span>
              <span className="font-bold">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 col-span-1 md:col-span-2">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Enfermedades Activas</h3>
        <div className="flex flex-wrap gap-2">
          {statistics.diseases.map((disease) => (
            <span
              key={disease}
              className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
            >
              {disease}
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-600 mt-3">
          Afectando a {statistics.countries_affected} países
        </p>
      </div>
    </div>
  );
}

export default StatisticsPanel;
