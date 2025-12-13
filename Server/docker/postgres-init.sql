-- PostgreSQL initialization script
-- This script runs when the PostgreSQL container is first created
-- Enables pgvector extension for vector similarity search

CREATE EXTENSION IF NOT EXISTS vector;

