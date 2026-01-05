import { useState, useEffect } from 'react';
import { MapIcon, Loader2, AlertTriangle } from 'lucide-react';
import { 
  getAllOutbreaks, 
  getStatistics, 
  getDiseaseStatistics,
  getClusters,
  getAvailableDiseases 
} from './services/api';
import OutbreakMap from './components/OutbreakMap';
import StatisticsPanel from './components/StatisticsPanel';
import DiseaseCharts from './components/DiseaseCharts';
import Filters from './components/Filters';

function App() {
  const [outbreaks, setOutbreaks] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [diseaseStats, setDiseaseStats] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [availableDiseases, setAvailableDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filtros
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [selectedSeverity, setSelectedSeverity] = useState(null);
  const [showClusters, setShowClusters] = useState(false);

  // Cargar datos iniciales
  useEffect(() => {
    loadData();
  }, []);

  // Recargar brotes cuando cambian los filtros
  useEffect(() => {
    loadOutbreaks();
  }, [selectedDisease, selectedSeverity]);

  // Cargar clusters cuando se activa el toggle
  useEffect(() => {
    if (showClusters && clusters.length === 0) {
      loadClusters();
    }
  }, [showClusters]);

  const loadData = async () => {
    setLoading(true);
    setError('');

    try {
      const [outbreaksData, statsData, diseaseStatsData, diseasesData] = await Promise.all([
        getAllOutbreaks(),
        getStatistics(),
        getDiseaseStatistics(),
        getAvailableDiseases()
      ]);

      setOutbreaks(outbreaksData);
      setStatistics(statsData);
      setDiseaseStats(diseaseStatsData);
      setAvailableDiseases(diseasesData);
    } catch (err) {
      setError('Error al cargar los datos. Asegúrate de que el backend está corriendo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadOutbreaks = async () => {
    try {
      const data = await getAllOutbreaks(selectedDisease, selectedSeverity);
      setOutbreaks(data);
    } catch (err) {
      console.error('Error loading outbreaks:', err);
    }
  };

  const loadClusters = async () => {
    try {
      const data = await getClusters(500);
      setClusters(data);
    } catch (err) {
      console.error('Error loading clusters:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Cargando datos de brotes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Error</h2>
          <p className="text-gray-600 text-center mb-4">{error}</p>
          <button
            onClick={loadData}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapIcon className="w-12 h-12 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">
              Disease Outbreak Mapper
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Visualización y análisis de patrones de brotes de enfermedades con datos geoespaciales
          </p>
        </header>

        {/* Statistics Panel */}
        <div className="mb-8">
          <StatisticsPanel statistics={statistics} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar con filtros */}
          <div className="lg:col-span-1">
            <Filters
              availableDiseases={availableDiseases}
              selectedDisease={selectedDisease}
              setSelectedDisease={setSelectedDisease}
              selectedSeverity={selectedSeverity}
              setSelectedSeverity={setSelectedSeverity}
              showClusters={showClusters}
              setShowClusters={setShowClusters}
            />

            <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Leyenda</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span>Severidad: Baja</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <span>Severidad: Media</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                  <span>Severidad: Alta</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <span>Severidad: Crítica</span>
                </div>
                {showClusters && (
                  <div className="flex items-center gap-2 pt-2 border-t mt-2">
                    <div className="w-4 h-4 rounded-full border-2 border-purple-500 border-dashed"></div>
                    <span>Clusters detectados</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-4" style={{ height: '600px' }}>
              <OutbreakMap 
                outbreaks={outbreaks} 
                clusters={clusters}
                showClusters={showClusters}
              />
            </div>
          </div>
        </div>

        {/* Gráficos de enfermedades */}
        <div className="mt-8">
          <DiseaseCharts diseaseStats={diseaseStats} />
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600 text-sm">
          <p>
            💡 Datos simulados con fines demostrativos • Proyecto desarrollado con FastAPI + React + Leaflet
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
