# Node Worker Thread Usage

This project demonstrates how to use **Node.js Worker Threads** to handle CPU-intensive tasks without blocking the main event loop.  
It shows the difference between a normal non-blocking request and a blocking request that is offloaded to worker threads.

---

## ✨ Features
- Express server with two endpoints:
  - **`/none_blocking`** → Simple request that responds immediately.
  - **`/blocking`** → Heavy computation handled by multiple worker threads.
- Workload is divided among multiple threads for faster execution.
- Prevents blocking of the main event loop while running CPU-heavy operations.

---

## 📦 Installation

```bash
npm install


        ┌───────────────┐
        │   Client      │
        └──────┬────────┘
               │ Request /blocking
               ▼
        ┌───────────────┐
        │  Main Thread  │
        └──────┬────────┘
               │ Spawns workers
   ┌───────────┼───────────┬───────────┐
   ▼           ▼           ▼           ▼
Worker 1   Worker 2   Worker 3   Worker 4
   │           │           │           │
   └─────Results──────────Results──────┘
               │
               ▼
        ┌───────────────┐
        │   Combine     │
        │   Results     │
        └──────┬────────┘
               ▼
        ┌───────────────┐
        │   Response    │
        └───────────────┘






# Non-blocking
curl http://localhost:8000/none_blocking
# Output: Hello World from node

# Blocking with workers
curl http://localhost:8000/blocking
# Output: Counter is <calculated number>
