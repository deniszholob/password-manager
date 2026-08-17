---
applyTo: 'apps/electron-bridge/**'
description: 'Shared IPC contracts and cross-process utilities'
---

# Purpose of this project (AUTHORITATIVE)

electron-bridge defines the contract between:

- Electron main process
- Electron preload
- Angular renderer

This project is the single source of truth for:

- IPC channel names
- IPC payload types
- Exposed window.electron API shape
- Shared, cross-platform utilities

It contains NO implementation logic.

# Architectural constraints (NON-NEGOTIABLE)

## This project MUST:

- Be importable by:
  - Electron main
  - Electron preload
  - Angular renderer
- Compile cleanly in Node and browser contexts
- Contain only types, enums, constants, and pure utilities

## This project MUST NOT:

- Create Electron windows
- Register IPC handlers
- Call ipcMain or ipcRenderer
- Access the filesystem
- Depend on Angular runtime APIs
- Contain side effects
