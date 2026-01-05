from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router

app = FastAPI(
    title="Disease Outbreak Mapper API",
    description="API for visualizing and analyzing disease outbreak patterns using geospatial data",
    version="1.0.0",
)

# CORS (correct for a specific frontend origin + credentials)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5175",
        "http://127.0.0.1:5175",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(router)


@app.get("/")
async def root():
    return {
        "message": "Welcome to Disease Outbreak Mapper API",
        "version": "1.0.0",
        "documentation": "/docs",
        "endpoints": {
            "outbreaks": "/api/v1/outbreaks",
            "statistics": "/api/v1/statistics",
            "clusters": "/api/v1/clusters",
            "timeline": "/api/v1/timeline",
        },
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
