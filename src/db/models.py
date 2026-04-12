"""SQLAlchemy models for Brand Autopsy DB."""

from datetime import datetime, date
from sqlalchemy import (
    create_engine, Column, Integer, String, Text, SmallInteger, Date,
    DateTime, Numeric, ForeignKey, CheckConstraint, Index, event,
)
from sqlalchemy.orm import declarative_base, relationship, sessionmaker
import os

Base = declarative_base()

DB_URL = os.getenv("DATABASE_URL", "sqlite:///data/brand_autopsy.db")


class Brand(Base):
    __tablename__ = "brands"

    id = Column(Integer, primary_key=True)
    ticker = Column(String(10), unique=True, nullable=False)
    name = Column(String(200), nullable=False)
    name_ko = Column(String(200))
    sector = Column(String(100))
    industry = Column(String(100))
    market_cap_b = Column(Numeric(10, 2))
    hq_country = Column(String(50))
    website_url = Column(String(500))
    tagline = Column(Text)
    brand_promise = Column(Text)
    positioning = Column(Text)
    archetype_primary = Column(String(50))
    archetype_secondary = Column(String(50))
    slogan = Column(String(300))
    analysis_date = Column(Date, nullable=False, default=date.today)
    analysis_version = Column(Integer, default=1)
    status = Column(String(20), default="draft")
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    voice_matrix = relationship("VoiceMatrix", back_populates="brand", uselist=False)
    colors = relationship("ColorPalette", back_populates="brand", order_by="ColorPalette.sort_order")
    typography = relationship("Typography", back_populates="brand")
    keywords = relationship("Keyword", back_populates="brand")
    competitors = relationship("Competitor", back_populates="brand", foreign_keys="Competitor.brand_id")
    channels = relationship("ChannelPlaybook", back_populates="brand")
    layers = relationship("LayerDocument", back_populates="brand", order_by="LayerDocument.layer_num")
    design_rules = relationship("DesignRule", back_populates="brand")


class VoiceMatrix(Base):
    __tablename__ = "voice_matrices"

    id = Column(Integer, primary_key=True)
    brand_id = Column(Integer, ForeignKey("brands.id"), unique=True)
    formal_casual = Column(SmallInteger)
    authority_peer = Column(SmallInteger)
    emotional_rational = Column(SmallInteger)
    restrained_bold = Column(SmallInteger)

    brand = relationship("Brand", back_populates="voice_matrix")

    __table_args__ = (
        CheckConstraint("formal_casual BETWEEN 1 AND 10"),
        CheckConstraint("authority_peer BETWEEN 1 AND 10"),
        CheckConstraint("emotional_rational BETWEEN 1 AND 10"),
        CheckConstraint("restrained_bold BETWEEN 1 AND 10"),
    )

    @property
    def as_vector(self) -> list[float]:
        return [self.formal_casual, self.authority_peer,
                self.emotional_rational, self.restrained_bold]


class ColorPalette(Base):
    __tablename__ = "color_palettes"

    id = Column(Integer, primary_key=True)
    brand_id = Column(Integer, ForeignKey("brands.id"))
    role = Column(String(50))
    color_name = Column(String(100))
    hex = Column(String(7), nullable=False)
    lab_l = Column(Numeric(6, 2))
    lab_a = Column(Numeric(6, 2))
    lab_b = Column(Numeric(6, 2))
    usage_desc = Column(Text)
    sort_order = Column(SmallInteger, default=0)

    brand = relationship("Brand", back_populates="colors")


class Typography(Base):
    __tablename__ = "typography"

    id = Column(Integer, primary_key=True)
    brand_id = Column(Integer, ForeignKey("brands.id"))
    role = Column(String(50))
    font_name = Column(String(100))
    weight = Column(String(50))
    size_rule = Column(String(200))
    lang = Column(String(10), default="en")

    brand = relationship("Brand", back_populates="typography")


class Keyword(Base):
    __tablename__ = "keywords"

    id = Column(Integer, primary_key=True)
    brand_id = Column(Integer, ForeignKey("brands.id"))
    type = Column(String(10), nullable=False)  # must / ban
    word = Column(String(100), nullable=False)
    reason = Column(Text)

    brand = relationship("Brand", back_populates="keywords")


class Competitor(Base):
    __tablename__ = "competitors"

    id = Column(Integer, primary_key=True)
    brand_id = Column(Integer, ForeignKey("brands.id"))
    competitor_id = Column(Integer, ForeignKey("brands.id"), nullable=True)
    competitor_name = Column(String(200))
    relationship_type = Column(String(50))
    differentiator = Column(Text)

    brand = relationship("Brand", back_populates="competitors", foreign_keys=[brand_id])


class ChannelPlaybook(Base):
    __tablename__ = "channel_playbooks"

    id = Column(Integer, primary_key=True)
    brand_id = Column(Integer, ForeignKey("brands.id"))
    channel = Column(String(50))
    tone_desc = Column(Text)
    frequency = Column(String(100))
    kpi = Column(Text)
    spec_width = Column(Integer)
    spec_height = Column(Integer)
    notes = Column(Text)

    brand = relationship("Brand", back_populates="channels")


class LayerDocument(Base):
    __tablename__ = "layer_documents"

    id = Column(Integer, primary_key=True)
    brand_id = Column(Integer, ForeignKey("brands.id"))
    layer_num = Column(SmallInteger, nullable=False)
    layer_name = Column(String(50))
    content_md = Column(Text, nullable=False)
    word_count = Column(Integer)
    created_at = Column(DateTime, default=datetime.now)

    brand = relationship("Brand", back_populates="layers")


class DesignRule(Base):
    __tablename__ = "design_rules"

    id = Column(Integer, primary_key=True)
    brand_id = Column(Integer, ForeignKey("brands.id"))
    type = Column(String(20))  # principle / prohibition
    rule_text = Column(Text, nullable=False)

    brand = relationship("Brand", back_populates="design_rules")


# Indexes
Index("idx_brands_sector", Brand.sector)
Index("idx_colors_hex", ColorPalette.hex)


def get_engine(url: str | None = None):
    return create_engine(url or DB_URL, echo=False)


def get_session(url: str | None = None):
    engine = get_engine(url)
    return sessionmaker(bind=engine)


def init_db(url: str | None = None):
    engine = get_engine(url)
    Base.metadata.create_all(engine)
    return engine
