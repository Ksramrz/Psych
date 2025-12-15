# RAG System - Document Ingestion Guide

## Overview
The RAG (Retrieval-Augmented Generation) system enhances AI responses by retrieving relevant guidelines, frameworks, and knowledge from a curated knowledge base.

## Document Types

### 1. DSM Guidelines
- Type: `dsm`
- Source: DSM-IV/DSM-5
- Content: Diagnostic criteria, diagnostic features, etc.

### 2. APA Ethical Guidelines
- Type: `apa`
- Source: American Psychological Association
- Content: Ethical principles, standards, guidelines

### 3. Assessment Tools
- Type: `assessment`
- Source: Various (MCMI, MMPI, etc.)
- Content: Assessment tool descriptions, usage guidelines

### 4. Intervention Frameworks
- Type: `intervention`
- Source: Various (CBT, DBT, etc.)
- Content: Intervention approaches, techniques, frameworks

## Ingestion API

### Single Document
```bash
POST /api/rag/ingest
{
  "content": "Document content here...",
  "metadata": {
    "source": "DSM-5",
    "type": "dsm",
    "title": "Major Depressive Disorder"
  }
}
```

### Batch Ingestion
```bash
POST /api/rag/ingest/batch
[
  {
    "content": "Document 1...",
    "metadata": { "source": "...", "type": "dsm" }
  },
  {
    "content": "Document 2...",
    "metadata": { "source": "...", "type": "apa" }
  }
]
```

## Initial Knowledge Base Setup

To set up the initial knowledge base, you'll need to:

1. Prepare documents in the correct format
2. Use the ingestion API to add them
3. Documents will be automatically embedded and stored in the vector database

## Notes

- Embeddings are generated automatically on ingestion
- Documents are searchable via semantic similarity
- The system retrieves top-k most relevant documents for each query
- Retrieved context is included in AI prompts to improve accuracy



