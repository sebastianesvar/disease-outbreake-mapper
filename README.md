# 🦠 Disease Outbreak Mapper

An interactive full-stack web application for **visualizing and analyzing disease outbreak patterns** using geospatial data.
Built with **FastAPI** (backend) and **React** (frontend), this tool enables spatial exploration, statistical analysis, and clustering of disease outbreaks in a global context.

Disease Outbreak Mapper • FastAPI • React • Leaflet • MIT License

---

## 🌟 Features

### 🌍 Geospatial Visualization

* Global interactive map with outbreak markers
* Color-coded markers based on **severity**
* Zoom, pan, and navigation controls
* Built with **Leaflet / Mapbox**

### 📊 Epidemiological Dashboard

* Total outbreaks, cases, and deaths
* Disease-based and country-based statistics
* Temporal trends and timelines
* Interactive charts using **Recharts**

### 🔬 Cluster Analysis

* Detection of geographic outbreak clusters
* Identification of **hotspots**
* Cluster radius and aggregation metrics
* Implemented using **DBSCAN (scikit-learn)**

### 🧪 Simulated but Realistic Data

* Publicly shareable CSV dataset
* Realistic coordinates, dates, and case counts
* Common diseases (Dengue, Malaria, COVID-19)
* Designed to resemble real epidemiological datasets

---

## 🛠️ Tech Stack

### Backend

* **FastAPI** – Modern Python web framework for APIs
* **Pandas** – Data manipulation and analysis
* **GeoPandas** – Geospatial data processing
* **Scikit-learn** – Clustering algorithms (DBSCAN)
* **Uvicorn** – ASGI server

### Frontend

* **React** – User interface
* **Vite** – Frontend tooling
* **Leaflet / Mapbox** – Interactive maps
* **Recharts** – Data visualization
* **Tailwind CSS** – Utility-first CSS framework
* **Axios** – HTTP client for API requests

---

## 🚀 Getting Started

### Prerequisites

* Python 3.10+
* Node.js 16+
* npm

---

### Backend Setup

Clone the repository:

```bash
git clone https://github.com/sebastianesvar/disease-outbreake-mapper.git
cd disease-outbreake-mapper/backend
```

Set up Python virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the API server:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8002
```

The API will be available at:
👉 [http://localhost:8002](http://localhost:8002)

Swagger documentation:
👉 [http://localhost:8002/docs](http://localhost:8002/docs)

---

### Frontend Setup

Navigate to frontend directory:

```bash
cd ../frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at:
👉 [http://localhost:5175](http://localhost:5175)

---

## 📖 API Endpoints

| Method | Endpoint                        | Description              |
| ------ | ------------------------------- | ------------------------ |
| GET    | `/api/v1/outbreaks`             | Get all outbreaks        |
| GET    | `/api/v1/diseases`              | Get available diseases   |
| GET    | `/api/v1/statistics`            | Global statistics        |
| GET    | `/api/v1/statistics/by-disease` | Statistics by disease    |
| GET    | `/api/v1/statistics/by-country` | Statistics by country    |
| GET    | `/api/v1/clusters`              | Detect outbreak clusters |
| GET    | `/api/v1/timeline`              | Timeline data            |
| GET    | `/health`                       | Health check             |

---

## 🧪 Example Usage

1. Open the application in your browser
2. Explore the global map to visualize disease outbreaks
3. Filter outbreaks by disease or severity
4. Analyze:

   * Total cases and deaths
   * Temporal trends
   * Geographic clusters
5. Identify outbreak hotspots and spatial patterns

---

## 📊 Data Source

* **Simulated, AI-generated dataset**
* Designed to be **realistic but non-sensitive**
* Fully public and safe to share
* Stored in `backend/data/outbreak_data.csv`

⚠️ **Disclaimer**
This project is intended for **educational and portfolio purposes only** and should not be used for real-world public health decision-making.

---

## 🎯 Future Enhancements

* Real-time data ingestion
* Predictive outbreak modeling
* Authentication and user roles
* Export reports (CSV / JSON)
* Docker-based deployment
* CI/CD pipeline
* Integration with real public health datasets

---

## 👨‍💻 About the Developer

**Sebastián Escobar**
Biologist and Software Analysis & Development Technician (in progress)

This project reflects my interest in working at the intersection of:

* 🧬 Biology & epidemiology
* 📊 Data analysis & visualization
* 💻 Full-stack software development

It is part of my professional portfolio aimed at **biotech, health-tech, and data-driven teams**.

---

## 📄 License

This project is licensed under the **MIT License** — see the `LICENSE` file for details.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to open an issue or submit a pull request.

---

## 📧 Contact

* **GitHub**: [https://github.com/sebastianesvar](https://github.com/sebastianesvar)
* **LinkedIn**: Sebastián Escobar Vargas
* **Email**: [la.pina.software@gmail.com](mailto:la.pina.software@gmail.com)