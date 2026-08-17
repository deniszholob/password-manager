---
applyTo: 'apps/electron/**'
description: 'Electron main-process architecture, IPC safety, and Nx monorepo best practices'
---

# Role of this project

This project contains the Electron main process only.

## It is responsible for:

- App lifecycle
- Window creation and management
- Native OS integration
- Secure IPC wiring

## It must NOT contain:

- UI logic
- Angular code
- Shared type definitions (those live in electron-bridge)
- Business logic that belongs in the renderer

# Architecture boundaries (CRITICAL)

## Allowed imports

- Node.js built-ins (fs, path, os, etc.)
- Electron APIs (app, BrowserWindow, ipcMain, etc.)
- Types and enums from apps/electron-bridge

## Forbidden imports

- Angular packages
- Renderer-side Electron APIs (ipcRenderer)
- DOM APIs
- UI frameworks
- Direct imports from apps/web

# IPC contract rules (MANDATORY)

- IPC is contract-first
- All IPC channels are defined in apps/electron-bridge
- No string literals for channel names
- No ad-hoc payload shapes

```ts
// ❌ Forbidden
ipcMain.handle('open-file', async (_, path) => { ... });

// ✅ Required
ipcMain.handle(
  ElectronWindowApiMainEvents.OpenFile,
  async (_event, payload: OpenFilePayload) => { ... }
);
```

# Type safety requirements

## Every IPC handler:

- Has typed input
- Has typed return value
- Prefer discriminated unions for complex responses
- Errors must be serialized and returned safely

```ts
export interface OpenFileResult {
  success: boolean;
  error?: string;
}
```

# Security rules (NON-NEGOTIABLE)

- contextIsolation: true
- nodeIntegration: false
- enableRemoteModule: false
- No eval, new Function, or dynamic code execution
- Preload scripts expose minimal APIs only

```ts
new BrowserWindow({
  webPreferences: {
    preload,
    contextIsolation: true,
    nodeIntegration: false,
  },
});
```

# Preload script responsibilities

- Acts as a thin adapter
- Exposes only methods defined in electron-bridge
- No business logic
- No filesystem access beyond delegated IPC

```ts
contextBridge.exposeInMainWorld('electron', {
  openFile: (payload) => ipcRenderer.invoke(ElectronWindowApiRendererEvents.OpenFile, payload),
});
```

# Error handling strategy

- Never throw raw errors across IPC
- Convert errors to safe, serializable objects
- Log detailed errors in main process only

```ts
try {
  ...
} catch (error) {
  return { success: false, error: String(error) };
}
```

# Window & lifecycle management

- Each window has a clear owner and purpose
- No global mutable state unless required
- App lifecycle:
  - app.whenReady()
- Handle macOS activation properly
- Clean shutdown on all platforms

# Platform-specific behavior

- Use path.join and shared utils from electron-bridge
- Never hardcode path separators
- Respect Windows/Linux/macOS differences

# Logging & debugging

- Use structured logging
- Avoid console.log in production paths
- Renderer never logs main-process internals

# Testing rules

- IPC handlers should be testable without a window
- Separate pure logic from Electron APIs
- Mock ipcMain where possible

# Performance rules

- Avoid blocking I/O in IPC handlers
- Use async filesystem APIs
- Debounce expensive operations

# What Copilot should optimize for

When generating Electron code:

- Prefer clarity over cleverness
- Prefer type safety over flexibility
- Prefer explicit IPC contracts
- Prefer composition over globals

# Common anti-patterns (AVOID)

- Bidirectional IPC without clear ownership
- Passing large objects over IPC
- Using Electron APIs in shared libraries
- Duplicating channel names across files

# Related instruction sets

- Renderer logic → angular.instructions.md
- IPC contracts → electron-bridge.instructions.md
- Repo rules → nx.instructions.md
