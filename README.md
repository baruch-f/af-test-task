# Dropdown Component Project

## Overview

This project aims to create a reusable dropdown component in React and TypeScript. The component fetches dropdown items from a provided API, displays user names, and renders a profile card on item click.

## Components

### App Component

The main entry point for the application. It sets up the Redux store, theme provider, and renders the `RootComponent`.

### RootComponent

Defines the application routes using React Router. The default route renders the `NotFoundPage`, and the home route renders the `HomePage`.

### HomePage

Displays a dropdown component populated with user data fetched from the API. It utilizes the `Dropdown` component and the `ProfileCard` component.

### Dropdown Component

A reusable dropdown component that fetches data from an API and renders a list of items. It also handles keyboard navigation for accessibility.

### UserDropdown Component

An extended version of the dropdown component specifically designed for user data. It includes keyboard navigation and user selection functionality.

### ProfileCard Component

Displays detailed information about a selected user. It includes the user's name and avatar.

## Styling

The project uses styled-components for styling, with predefined theme variables provided.

## Testing

The code includes basic testing to demonstrate testing knowledge. Further testing can be implemented for production readiness.

## Considerations

- The component follows the provided design on page 3.
- Accessibility is considered, with keyboard navigation for non-mouse users.
- The code aims for composability over inheritance, promoting reusability.
