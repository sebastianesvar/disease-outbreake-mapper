import { MapContainer, TileLayer, CircleMarker, Popup, Circle } from 'react-leaflet';
import { AlertCircle, MapPin, Skull, Users } from 'lucide-react';

function OutbreakMap({ outbreaks, clusters, showClusters }) {
  const getSeverityColor = (severity) => {
    const colors = {
      low: '#22c55e',
      medium: '#eab308',
      high: '#f97316',
      critical: '#ef4444'
    };
    return colors[severity] || '#6b7280';
  };

  const getMarkerRadius = (cases) => {
    // Escala logarítmica para mejor visualización
    return Math.min(Math.log(cases) * 3 + 5, 25);
  };

  return (
    <div className="h-full w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Clusters */}
        {showClusters && clusters.map((cluster) => (
          <Circle
            key={`cluster-${cluster.cluster_id}`}
            center={[cluster.center_lat, cluster.center_lon]}
            radius={50000} // 50km
            pathOptions={{
              color: '#8b5cf6',
              fillColor: '#8b5cf6',
              fillOpacity: 0.2,
              weight: 2,
              dashArray: '5, 5'
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-purple-600 mb-2">
                  Cluster #{cluster.cluster_id}
                </h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Brotes:</strong> {cluster.outbreak_count}</p>
                  <p><strong>Casos:</strong> {cluster.total_cases}</p>
                  <p><strong>Muertes:</strong> {cluster.total_deaths}</p>
                  <p><strong>Enfermedades:</strong> {cluster.diseases.join(', ')}</p>
                  <p><strong>Países:</strong> {cluster.countries.join(', ')}</p>
                </div>
              </div>
            </Popup>
          </Circle>
        ))}

        {/* Brotes individuales */}
        {outbreaks.map((outbreak) => (
          <CircleMarker
            key={outbreak.id}
            center={[outbreak.latitude, outbreak.longitude]}
            radius={getMarkerRadius(outbreak.cases)}
            pathOptions={{
              color: getSeverityColor(outbreak.severity),
              fillColor: getSeverityColor(outbreak.severity),
              fillOpacity: 0.7,
              weight: 2
            }}
          >
            <Popup>
              <div className="p-3 min-w-[250px]">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <h3 className="font-bold text-lg">{outbreak.disease}</h3>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <span><strong>{outbreak.region}, {outbreak.country}</strong></span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>{outbreak.cases} casos</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Skull className="w-4 h-4 text-red-600" />
                    <span>{outbreak.deaths} muertes</span>
                  </div>
                  
                  <div className="mt-2 pt-2 border-t">
                    <p className="text-xs text-gray-600">
                      Fecha: {new Date(outbreak.date).toLocaleDateString('es-ES')}
                    </p>
                    <p className="text-xs">
                      Severidad: <span className={`font-bold ${
                        outbreak.severity === 'critical' ? 'text-red-600' :
                        outbreak.severity === 'high' ? 'text-orange-600' :
                        outbreak.severity === 'medium' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {outbreak.severity.toUpperCase()}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

export default OutbreakMap;
