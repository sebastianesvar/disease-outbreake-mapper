import pandas as pd
import numpy as np
from typing import List, Dict
from sklearn.cluster import DBSCAN
from pathlib import Path

class OutbreakAnalyzer:
    """Clase para analizar brotes de enfermedades"""

    def __init__(self):
        self.data_path = Path(__file__).parent.parent.parent / "data" / "outbreak_data.csv"
        self.df = pd.read_csv(self.data_path)
        self.df["date"] = pd.to_datetime(self.df["date"])

    def _serialize_dates(self, df: pd.DataFrame) -> pd.DataFrame:
        df = df.copy()
        df["date"] = df["date"].dt.strftime("%Y-%m-%d")
        return df

    def get_all_outbreaks(self) -> List[Dict]:
        df = self._serialize_dates(self.df)
        return df.to_dict("records")

    def get_outbreaks_by_disease(self, disease: str) -> List[Dict]:
        filtered = self.df[self.df["disease"].str.lower() == disease.lower()]
        filtered = self._serialize_dates(filtered)
        return filtered.to_dict("records")

    def get_outbreaks_by_severity(self, severity: str) -> List[Dict]:
        filtered = self.df[self.df["severity"].str.lower() == severity.lower()]
        filtered = self._serialize_dates(filtered)
        return filtered.to_dict("records")

    def get_statistics(self) -> Dict:
        return {
            "total_outbreaks": len(self.df),
            "total_cases": int(self.df["cases"].sum()),
            "total_deaths": int(self.df["deaths"].sum()),
            "mortality_rate": round(
                (self.df["deaths"].sum() / self.df["cases"].sum()) * 100, 2
            ),
            "diseases": self.df["disease"].unique().tolist(),
            "countries_affected": self.df["country"].nunique(),
            "severity_distribution": self.df["severity"].value_counts().to_dict(),
        }

    def get_disease_statistics(self) -> List[Dict]:
        disease_stats = self.df.groupby("disease").agg({
            "cases": "sum",
            "deaths": "sum",
            "id": "count",
        }).reset_index()

        disease_stats.columns = [
            "disease",
            "total_cases",
            "total_deaths",
            "outbreak_count",
        ]

        disease_stats["mortality_rate"] = round(
            (disease_stats["total_deaths"] / disease_stats["total_cases"]) * 100, 2
        )

        return disease_stats.to_dict("records")

    def get_country_statistics(self) -> List[Dict]:
        country_stats = self.df.groupby("country").agg({
            "cases": "sum",
            "deaths": "sum",
            "id": "count",
        }).reset_index()

        country_stats.columns = [
            "country",
            "total_cases",
            "total_deaths",
            "outbreak_count",
        ]

        return country_stats.to_dict("records")

    def detect_clusters(self, eps_km: float = 500) -> List[Dict]:
        coords = np.radians(self.df[["latitude", "longitude"]].values)

        earth_radius_km = 6371.0
        eps_rad = eps_km / earth_radius_km

        db = DBSCAN(eps=eps_rad, min_samples=2, metric="haversine")
        self.df["cluster"] = db.fit_predict(coords)

        clusters = []
        for cluster_id in self.df["cluster"].unique():
            if cluster_id == -1:
                continue

            cluster_data = self.df[self.df["cluster"] == cluster_id]

            clusters.append({
                "cluster_id": int(cluster_id),
                "outbreak_count": len(cluster_data),
                "total_cases": int(cluster_data["cases"].sum()),
                "total_deaths": int(cluster_data["deaths"].sum()),
                "center_lat": float(cluster_data["latitude"].mean()),
                "center_lon": float(cluster_data["longitude"].mean()),
                "diseases": cluster_data["disease"].unique().tolist(),
                "countries": cluster_data["country"].unique().tolist(),
            })

        return clusters

    def get_timeline_data(self) -> List[Dict]:
        timeline = self.df.groupby("date").agg({
            "cases": "sum",
            "deaths": "sum",
        }).reset_index()

        timeline["date"] = timeline["date"].dt.strftime("%Y-%m-%d")

        return timeline.to_dict("records")
