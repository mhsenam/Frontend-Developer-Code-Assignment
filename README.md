# Smart Insurance Application Portal

A modern React application for managing insurance applications. This project provides a user-friendly interface for customers to apply for different insurance products and track their submissions.

## Features

- Dynamic form rendering based on form schema received from the API
- Form validation with yup schema validation
- Form field dependencies (conditional fields)
- Submissions list view with sorting, filtering, and pagination
- Responsive design for mobile and desktop

## Tech Stack

- React.js with TypeScript
- Material UI for components and styling
- Tailwind CSS for utility classes
- React Router for navigation
- React Hook Form for form management
- Yup for schema validation
- Axios for API communication

## Project Structure

```
src/
├── components/
│   ├── Common/            # Shared components (Navbar, Footer, Layout)
│   ├── FormRenderer/      # Components for rendering dynamic forms
│   └── ListView/          # Components for displaying data in table format
├── context/               # React context for state management
├── hooks/                 # Custom React hooks
├── pages/                 # Page components for each route
├── services/              # API and other service functions
└── utils/                 # Utility functions and helpers
```

## Installation and Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser

## API Integration

The application connects to the backend API at `https://assignment.devotel.io` with the following endpoints:

- `GET /api/insurance/forms` - Get available form schemas
- `POST /api/insurance/forms/submit` - Submit a form
- `GET /api/insurance/forms/submissions` - Get list of submitted forms

## Development Guide

### Adding New Form Fields

To support new field types in the form renderer, add a new case in the `renderFieldByType` function in `FormField.tsx`.

### Adding New Features

1. Create components in the appropriate directory
2. Add any needed API calls to the `api.ts` service
3. Create or update page components as needed
4. Update routing in `App.tsx` if adding new pages

## License

This project is licensed under the MIT License. 