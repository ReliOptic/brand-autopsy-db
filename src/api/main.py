"""Brand Autopsy FastAPI application."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.brands import router as brands_router
from .routes.compare import router as compare_router
from .routes.analytics import router as analytics_router

app = FastAPI(title="Brand Autopsy API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(brands_router)
app.include_router(compare_router)
app.include_router(analytics_router)


@app.get("/")
def root() -> dict:
    return {"message": "Brand Autopsy API", "docs": "/docs"}
