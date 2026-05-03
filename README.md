# 🗂 File Explorer

A Windows Explorer-style file manager web application with a recursive folder tree on the left panel and folder/file contents on the right panel.

<img width="1624" height="968" alt="image file explorer" src="https://github.com/user-attachments/assets/56fab390-5d38-4354-a8c5-b921a04e50c6" />


---

## 🧰 Tech Stack

| Layer    | Technology                              |
| -------- | --------------------------------------- |
| Frontend | Vue 3, TypeScript, Vite, Composition API |
| Backend  | Bun, Elysia, TypeScript                 |
| Database | PostgreSQL                              |
| ORM      | Prisma                                  |

---

## 🐳 Quick Start — Docker (Recommended)

> Make sure **Docker Desktop** is running before proceeding.

### Frontend

```bash
git clone <fe-repo-url>
cd fe
docker compose up --build
```

Open → [http://localhost:5173](http://localhost:5173)

### Backend

```bash
git clone <be-repo-url>
cd be
docker compose up --build
```

API running at → [http://localhost:3000](http://localhost:3000)

> The BE Docker setup runs migrations and seeds automatically on startup.

---

## 🛠 Manual Setup

### Prerequisites

Install **Bun** if you haven't:

```bash
curl -fsSL https://bun.sh/install | bash
```

---

### Backend

```bash
git clone <be-repo-url>
cd be
```

**1. Install dependencies**

```bash
bun install
```

**2. Configure environment**

```bash
cp .env.example .env
```

Edit `.env` and fill in your PostgreSQL connection:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/paybridge
FRONTEND_URL=http://localhost:5173
```

**3. Run migrations**

```bash
bunx prisma migrate dev --name init
# or
bunx --bun prisma migrate dev
```

**4. Seed the database**

```bash
bunx prisma db seed
```

**5. Start the server**

```bash
bun --watch src/main.ts
```

API running at → [http://localhost:3000](http://localhost:3000)

---

### Frontend

```bash
git clone <fe-repo-url>
cd fe
```

**1. Install dependencies**

```bash
bun install
```

**2. Configure environment**

```bash
cp .env.example .env
```

`.env` content:

```env
VITE_API_URL=/api/v1
```

**3. Start dev server**

```bash
bun dev
```

Open → [http://localhost:5173](http://localhost:5173)

---

## 🔌 API Endpoints

| Method | Endpoint                      | Description                        |
| ------ | ----------------------------- | ---------------------------------- |
| GET    | `/api/v1/folders/tree`        | Get full folder tree               |
| GET    | `/api/v1/folders/:id/children`| Get direct subfolders of a folder  |
| GET    | `/api/v1/folders/:id/files`   | Get files inside a folder          |

---
