# Recipe — cmlabs Frontend Part-time Test

Pre-assessment Test / FE-PT-02-2

Aplikasi web recipe explorer yang dibangun menggunakan Next.js di atas [TheMealDB API](https://www.themealdb.com/).

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + clsx + tailwind-merge
- **Fonts**: Fraunces (display) + DM Sans (body) via `next/font/google`

## Fitur

- **Halaman Ingredients** — Menampilkan seluruh daftar ingredients, dilengkapi fitur search by name di sisi front-end
- **Halaman Ingredient Detail** — Menampilkan daftar meal berdasarkan ingredient yang dipilih, dilengkapi fitur search meal by name di sisi front-end
- **Halaman Meal Detail** — Menampilkan detail meal lengkap: gambar, judul, instruksi, daftar recipe, dan YouTube embed
- Fully responsive (mobile, tablet, desktop)
- Atomic component architecture (atoms → molecules → organisms)
- Server-side data fetching dengan revalidation

## Cara Menjalankan Project

### 1. Clone repository

```bash
git clone https://github.com/<your-username>/cmlabs-frontend-parttime-test.git
cd cmlabs-frontend-parttime-test
```

### 2. Install dependencies

```bash
npm install
```

### 3. Jalankan development server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### 4. Build untuk production

```bash
npm run build
npm run start
```

## Struktur Project

```
src/
├── app/
│   ├── page.tsx                        # Landing / home page
│   ├── layout.tsx                      # Root layout (Navbar + Footer)
│   ├── not-found.tsx                   # Halaman 404
│   ├── ingredients/
│   │   ├── page.tsx                    # Halaman Ingredients (list + search)
│   │   └── [slug]/
│   │       └── page.tsx                # Halaman Ingredient Detail (filter by ingredient)
│   └── meals/
│       └── [id]/
│           └── page.tsx                # Halaman Meal Detail
├── components/
│   ├── atoms/
│   │   ├── Badge.tsx
│   │   ├── SearchInput.tsx
│   │   └── Spinner.tsx
│   ├── molecules/
│   │   ├── Breadcrumb.tsx
│   │   ├── IngredientCard.tsx
│   │   └── MealCard.tsx
│   └── organisms/
│       ├── IngredientGrid.tsx          # Client component (search + grid ingredients)
│       ├── MealGrid.tsx                # Client component (search + grid meals)
│       └── Navbar.tsx
└── lib/
    ├── api.ts                          # Fungsi API ke TheMealDB
    ├── types.ts                        # TypeScript interfaces
    └── utils.ts                        # cn() utility (clsx + tailwind-merge)
```

## API Endpoints

| Nama | URL | Status |
|------|-----|--------|
| List of Ingredients | `https://www.themealdb.com/api/json/v1/1/list.php?i=list` | Wajib |
| Filter by Ingredient | `https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient-name}` | Wajib |
| Detail Meal | `https://www.themealdb.com/api/json/v1/1/lookup.php?i={meal-id}` | Opsional (dikerjakan) |

## Live Demo


