# Angular Firebase Messages App

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Project Overview

This Angular 19 application demonstrates the integration of Firebase with NGRX for state management and Angular Material for the user interface. The app allows users to view and add messages that are stored in Firebase Firestore.

### Key Features

- **Material Toolbar**: Navigation between Home and Messages pages
- **Lazy-loaded Messages Module**: Improves initial load time by loading the Messages feature only when needed
- **NGRX State Management**: Manages application state with actions, reducers, and effects
- **Firestore Integration**: Stores and retrieves messages from Firebase
- **Angular Material UI**: Modern, responsive design with Material components

### Project Structure

```
├── src/
│   ├── app/
│   │   ├── home/              # Home component (landing page)
│   │   ├── messages/          # Lazy-loaded messages feature
│   │   │   ├── components/    # Message-related components
│   │   │   ├── models/        # Message data model
│   │   │   └── store/         # NGRX store for messages
│   │   └── shared/            # Shared modules and components
│   ├── environments/          # Environment configuration
│   └── assets/                # Static assets
└── firebase.json             # Firebase configuration
```

## Firebase Deployment

To deploy the application to Firebase Hosting:

1. Build the application for production:
```bash
ng build
```

2. Deploy to Firebase:
```bash
firebase deploy
```

## Environment Setup

Make sure your `environment.ts` file contains the Firebase configuration details:

```typescript
export const environment = {
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_PROJECT_ID.appspot.com',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID'
  },
  production: false
};
```
