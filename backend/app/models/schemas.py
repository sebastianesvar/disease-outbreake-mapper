from pydantic import BaseModel
from typing import List, Dict, Optional
from datetime import datetime

class OutbreakBase(BaseModel):
    id: int
    disease: str
    country: str
    region: str
    latitude: float
    longitude: float
    cases: int
    deaths: int
    date: str
    severity: str

class StatisticsResponse(BaseModel):
    total_outbreaks: int
    total_cases: int
    total_deaths: int
    mortality_rate: float
    diseases: List[str]
    countries_affected: int
    severity_distribution: Dict[str, int]

class DiseaseStatistics(BaseModel):
    disease: str
    total_cases: int
    total_deaths: int
    outbreak_count: int
    mortality_rate: float

class CountryStatistics(BaseModel):
    country: str
    total_cases: int
    total_deaths: int
    outbreak_count: int

class ClusterInfo(BaseModel):
    cluster_id: int
    outbreak_count: int
    total_cases: int
    total_deaths: int
    center_lat: float
    center_lon: float
    diseases: List[str]
    countries: List[str]

class TimelineData(BaseModel):
    date: str
    cases: int
    deaths: int

class FilterParams(BaseModel):
    disease: Optional[str] = None
    severity: Optional[str] = None
    country: Optional[str] = None
