from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.models.schemas import (
    OutbreakBase,
    StatisticsResponse,
    DiseaseStatistics,
    CountryStatistics,
    ClusterInfo,
    TimelineData
)
from app.services.outbreak_analyzer import OutbreakAnalyzer

router = APIRouter(prefix="/api/v1", tags=["Disease Outbreaks"])

# Inicializar el analizador
analyzer = OutbreakAnalyzer()

@router.get("/outbreaks", response_model=List[OutbreakBase])
async def get_all_outbreaks(
    disease: Optional[str] = Query(None, description="Filter by disease name"),
    severity: Optional[str] = Query(None, description="Filter by severity (low, medium, high, critical)")
):
    """
    Obtiene todos los brotes registrados.
    Puede filtrar por enfermedad y/o severidad.
    """
    try:
        if disease:
            outbreaks = analyzer.get_outbreaks_by_disease(disease)
        elif severity:
            outbreaks = analyzer.get_outbreaks_by_severity(severity)
        else:
            outbreaks = analyzer.get_all_outbreaks()
        
        return outbreaks
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/statistics", response_model=StatisticsResponse)
async def get_statistics():
    """
    Obtiene estadísticas generales de todos los brotes.
    """
    try:
        stats = analyzer.get_statistics()
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/statistics/by-disease", response_model=List[DiseaseStatistics])
async def get_disease_statistics():
    """
    Obtiene estadísticas agrupadas por enfermedad.
    """
    try:
        stats = analyzer.get_disease_statistics()
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/statistics/by-country", response_model=List[CountryStatistics])
async def get_country_statistics():
    """
    Obtiene estadísticas agrupadas por país.
    """
    try:
        stats = analyzer.get_country_statistics()
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/clusters", response_model=List[ClusterInfo])
async def detect_outbreak_clusters(
    radius_km: float = Query(500, description="Radio en kilómetros para detectar clusters")
):
    """
    Detecta clusters geográficos de brotes usando algoritmo DBSCAN.
    Un cluster representa múltiples brotes cercanos geográficamente.
    """
    try:
        clusters = analyzer.detect_clusters(eps_km=radius_km)
        return clusters
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/timeline", response_model=List[TimelineData])
async def get_timeline():
    """
    Obtiene datos de línea temporal de casos y muertes.
    """
    try:
        timeline = analyzer.get_timeline_data()
        return timeline
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/diseases")
async def get_available_diseases():
    """
    Obtiene la lista de enfermedades disponibles en el dataset.
    """
    try:
        diseases = analyzer.df['disease'].unique().tolist()
        return {"diseases": diseases}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
