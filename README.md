# POSM Progress Dashboard (Standalone)

A standalone POSM (Point of Sale Materials) deployment progress tracking dashboard extracted from the original survey collection system.

## Overview

This application provides real-time visualization of POSM deployment progress across stores and models. It displays:

- **Overview Statistics**: Total stores, models, POSM items, and overall completion percentage
- **Store Progress**: Individual store completion status and POSM deployment rates
- **Model Analysis**: Progress tracking by product model
- **POSM Type Tracking**: Completion rates by POSM type
- **Interactive Matrix**: Detailed store-by-model deployment matrix

## Features

### 🎯 Real-time Progress Tracking
- Live calculation of deployment completion rates
- Store-level progress monitoring
- Model-specific deployment status
- POSM type completion analysis

### 📊 Interactive Visualizations
- Circular progress indicators
- Color-coded status badges
- Sortable data tables
- React-based POSM deployment matrix

### 🔄 Auto-refresh & Manual Updates
- Automatic data refresh every 5 minutes
- Manual refresh button for immediate updates
- Loading indicators and notifications

### 📱 Responsive Design
- Mobile-friendly interface
- Adaptive grid layouts
- Touch-friendly interactions

## Quick Start

### Prerequisites
- Node.js (v16 or later)
- MongoDB (running instance with existing data)
- Required collections: `displays`, `stores`, `surveyresponses`, `modelposms`

### Installation & Running

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables** (optional):
   ```bash
   # Create .env file if needed
   MONGODB_URI=mongodb://localhost:27017/your-database
   PORT=3000
   ```

3. **Start the application**:
   ```bash
   npm start
   # Or for development with auto-reload:
   npm run dev
   ```

4. **Access the dashboard**:
   Open browser to `http://localhost:3000`

### Building React Components (if modified)

```bash
# Build production version
npm run build:posm-matrix

# Development build with watch mode
npm run build:posm-matrix:dev
```

## Architecture

### Backend Components
- **Express Server** (`server.js`): Minimal server serving dashboard and API
- **Progress Controller** (`src/controllers/progressController.js`): Complex calculation logic
- **MongoDB Models**: Display, Store, SurveyResponse, ModelPosm
- **API Routes**: `/api/progress/*` endpoints

### Frontend Components
- **Progress Dashboard** (`public/progress-dashboard.html`): Main interface
- **Dashboard Logic** (`public/progress-dashboard.js`): Data fetching and rendering
- **POSM Matrix** (`public/dist/posm-matrix.bundle.js`): React component for matrix view
- **Responsive Styling**: TailwindCSS and custom CSS

### Data Flow
1. **Data Collection**: Survey responses stored in MongoDB
2. **Progress Calculation**: Complex matching algorithms compute completion rates
3. **API Endpoints**: Serve calculated progress data
4. **Frontend Visualization**: Real-time dashboard updates

## API Endpoints

### Overview Statistics
```
GET /api/progress/overview
```
Returns total counts and overall completion percentage.

### Store Progress
```
GET /api/progress/stores?page=1&limit=20
```
Returns paginated store progress data.

### Model Progress
```
GET /api/progress/models
```
Returns progress data grouped by product model.

### POSM Type Progress
```
GET /api/progress/posm-types
```
Returns completion rates by POSM type.

### POSM Matrix Data
```
GET /api/progress/posm-matrix?page=1&limit=20&search=&sortBy=storeName&sortOrder=asc
```
Returns matrix data for the interactive grid component.

## Database Schema

The application expects these MongoDB collections:

### displays
```javascript
{
  store_id: String,
  model: String,
  is_displayed: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### stores
```javascript
{
  store_id: String,
  store_name: String,
  region: String,
  province: String,
  channel: String
}
```

### surveyresponses
```javascript
{
  leader: String,
  shopName: String,
  responses: [{
    model: String,
    posmSelections: [{
      posmCode: String,
      posmName: String,
      selected: Boolean
    }]
  }],
  createdAt: Date
}
```

### modelposms
```javascript
{
  model: String,
  posm: String,
  posmName: String
}
```

## Customization

### Adding New Progress Metrics
1. Extend `progressController.js` with new calculation logic
2. Add corresponding API route in `progressRoutes.js`
3. Update frontend to display new metrics

### Styling Changes
- Modify CSS in `progress-dashboard.html` or `styles-admin.css`
- Rebuild with Webpack if changing React components

### Configuration Options
- Database connection: `src/config/database.js`
- Server settings: `src/config/index.js`

## Performance Notes

- **Calculation Complexity**: Progress calculations involve complex matching algorithms
- **Caching**: Consider implementing Redis caching for large datasets
- **Database Indexes**: Ensure proper indexing on store_id, model fields
- **Memory Usage**: Monitor memory usage with large survey datasets

## Troubleshooting

### Common Issues

1. **Dashboard shows no data**: Check MongoDB connection and data availability
2. **React matrix not loading**: Verify webpack bundles are built correctly
3. **Slow calculations**: Check database indexes and consider data filtering
4. **API errors**: Check server logs for detailed error information

### Debug Mode
Enable detailed logging by setting environment variables:
```bash
NODE_ENV=development
DEBUG=progress:*
```

## Removed Features

This standalone version has removed:
- User authentication and login system
- Survey collection interface
- Admin management panels
- User and store management
- File upload capabilities
- Email notifications

Focus is purely on progress visualization and dashboard functionality.

## License

MIT License - see package.json for details.