## Project Overview

This is a Node.js web application that serves a standalone POSM (Point of Sale Materials) deployment progress tracking dashboard. It uses an Express.js backend to serve the dashboard and a set of APIs for fetching progress data. The frontend is built with HTML, CSS, and JavaScript, with a React component for an interactive data matrix. The data is stored in a MongoDB database.

The application's main purpose is to provide real-time visualization of POSM deployment progress across different stores and models. It calculates and displays various metrics, including overview statistics, store-level progress, model-specific analysis, and POSM type tracking.

## Building and Running

### Prerequisites
- Node.js (v16 or later)
- MongoDB (running instance with existing data)

### Installation

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Set up environment variables by creating a `.env` file in the root of the project with the following content:
    ```
    MONGODB_URI=mongodb://localhost:27017/your-database
    PORT=3000
    ```

### Running the Application

-   **Development:**
    ```bash
    npm run dev
    ```
-   **Production:**
    ```bash
    npm start
    ```

### Building React Components

-   **Production Build:**
    ```bash
    npm run build:posm-matrix
    ```
-   **Development Build (with watch mode):**
    ```bash
    npm run build:posm-matrix:dev
    ```

## Development Conventions

### Linting and Formatting

-   **Lint:**
    ```bash
    npm run lint
    ```
-   **Lint and fix:**
    ```bash
    npm run lint:fix
    ```
-   **Format:**
    ```bash
    npm run format
    ```
-   **Check formatting:**
    ```bash
    npm run format:check
    ```

### API Endpoints

-   **Overview Statistics:**
    -   `GET /api/progress/overview`
-   **Store Progress:**
    -   `GET /api/progress/stores`
-   **Model Progress:**
    -   `GET /api/progress/models`
-   **POSM Type Progress:**
    -   `GET /api/progress/posm-types`
-   **POSM Matrix Data:**
    -   `GET /api/progress/posm-matrix`
-   **Region Progress:**
    -   `GET /api/progress/regions`
-   **Progress Timeline:**
    -   `GET /api/progress/timeline`
