# Global English Grammar Diagnostic Tool

A web-based assessment application that delivers personalized 50-question grammar tests with multi-language support (English, Vietnamese, Spanish, Chinese).

## Project Structure

```
.
├── frontend/          # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── locales/
│   └── package.json
├── backend/           # Node.js + Express + Prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── models/
│   ├── prisma/
│   └── package.json
└── doc/              # Documentation
    ├── prd.md
    └── design_specification.md
```

## Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Internationalization**: react-i18next
- **Styling**: CSS Modules

### Backend
- **Runtime**: Node.js + Express
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **API**: RESTful

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Diagnostic_Grammar_Test
```

2. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

3. **Install Backend Dependencies**
```bash
cd ../backend
npm install
```

4. **Set up Database**
```bash
# Copy environment file
cp .env.example .env

# Edit .env with your database credentials
# Then run migrations
npx prisma migrate dev
npx prisma db seed
```

### Development

**Run Frontend** (in `frontend/` directory):
```bash
npm run dev
# Runs on http://localhost:5173
```

**Run Backend** (in `backend/` directory):
```bash
npm run dev
# Runs on http://localhost:3000
```

## Features

- ✅ 50-question grammar diagnostic test
- ✅ Multi-language UI support (EN, VI, ES, ZH)
- ✅ Localized error explanations
- ✅ Personalized study plan generation
- ✅ Integration with eJOY and Grammar for IELTS
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Full accessibility (WCAG AA)

## Documentation

- [Product Requirements Document](./doc/prd.md)
- [Design Specification](./doc/design_specification.md)
- [Implementation Plan](./.gemini/antigravity/brain/*/implementation_plan.md)
- [Task Breakdown](./.gemini/antigravity/brain/*/task.md)

## License

Proprietary - All Rights Reserved
