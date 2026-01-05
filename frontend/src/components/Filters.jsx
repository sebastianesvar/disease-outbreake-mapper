import { Filter, X } from 'lucide-react';

function Filters({ 
  availableDiseases, 
  selectedDisease, 
  setSelectedDisease,
  selectedSeverity,
  setSelectedSeverity,
  showClusters,
  setShowClusters
}) {
  const severityOptions = ['low', 'medium', 'high', 'critical'];

  const clearFilters = () => {
    setSelectedDisease(null);
    setSelectedSeverity(null);
  };

  const hasActiveFilters = selectedDisease || selectedSeverity;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-800">Filtros</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
          >
            <X className="w-4 h-4" />
            Limpiar
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Filtro por enfermedad */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enfermedad
          </label>
          <select
            value={selectedDisease || ''}
            onChange={(e) => setSelectedDisease(e.target.value || null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">Todas las enfermedades</option>
            {availableDiseases.map((disease) => (
              <option key={disease} value={disease}>
                {disease}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por severidad */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Severidad
          </label>
          <select
            value={selectedSeverity || ''}
            onChange={(e) => setSelectedSeverity(e.target.value || null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">Todas las severidades</option>
            {severityOptions.map((severity) => (
              <option key={severity} value={severity}>
                {severity.charAt(0).toUpperCase() + severity.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Toggle para clusters */}
        <div className="pt-4 border-t">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showClusters}
              onChange={(e) => setShowClusters(e.target.checked)}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">
              Mostrar clusters geográficos
            </span>
          </label>
          <p className="mt-1 text-xs text-gray-500">
            Los clusters muestran agrupaciones de brotes cercanos
          </p>
        </div>
      </div>
    </div>
  );
}

export default Filters;
