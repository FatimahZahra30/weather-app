# Weather App

A responsive weather single-page application built with Vue 3, TypeScript and Vite based on the provided Figma design.

## Features

* Search for cities and airports
* Location suggestions using the OpenWeatherMap API
* Current weather information
* Hourly and daily forecasts
* Saved weather locations
* Profile information with editable form fields
* Client-side form validation
* Responsive layout
* Web Share API integration
* Loading and error states

## Tech Stack

* Vue 3
* TypeScript
* Vite
* Vue Router
* OpenWeatherMap API
* CSS
* Web Share API
* LocalStorage

## Project Setup

### Requirements

* Node.js
* npm

### Installation

Clone the repository and install the dependencies:

```bash
npm install
```

Create a `.env` file in the project root and add the OpenWeatherMap API key:

```env
VITE_OPENWEATHER_API_KEY=your_api_key
```

Start the development server:

```bash
npm run dev
```

The application will then be available at the local development URL provided by Vite.

### Web Sharing Testing

The Web Share API should be tested in a supported browser such as Chrome or Safari. It may not be available in the VS Code integrated browser.

### Build

To create a production build:

```bash
npm run build
```

## Project Structure

The project follows Atomic Design principles for component organization.

```text
src/
├── api/
│   └── weather.ts
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
├── pages/
├── router/
├── utils/
└── main.ts
```

* **Atoms** — basic reusable UI elements such as buttons, inputs, and icons.
* **Molecules** — combinations of atoms such as the search bar and weather cards.
* **Organisms** — larger reusable interface sections.
* **Templates** — page-level layouts that compose the UI components.
* **Pages** — views responsible for connecting application state, API data, and templates.

## Architecture

API-related functionality is contained in `src/api/weather.ts`, while reusable UI is separated into the component hierarchy.

Vue Router handles navigation between the weather overview, weather details, and profile pages.

The application uses Vue's Composition API for reactive state and component logic.

Saved locations are stored in `localStorage` so they persist between sessions.

## API Integration

The application uses the OpenWeatherMap API for:

* Weather data
* Forecast data
* Location search

API requests use `async/await` and include loading and error handling.

The API data is transformed into application-specific TypeScript types before being passed to components.

## State Management

The application uses Vue's Composition API and reactive state instead of an external state-management library.

Reactive state is used for application data such as:

* Search queries and suggestions
* Weather information
* Loading and error states
* Saved locations
* Profile information

## TypeScript

TypeScript is used throughout the application.

Interfaces and type annotations are used for API data, component props, emitted events, weather information, location results, and application state.

For example:

```ts
interface WeatherLocation {
  location: string
  lat: number
  lon: number
  time: string
  description: string
  temperature: number
  high: number
  low: number
  isNight: boolean
}
```

## Form Validation

The profile form includes client-side validation for:

* Required name
* Required email
* Email format
* Required phone number
* Phone number length

Validation errors are displayed next to the relevant fields.

## Web Share API

The Web Share API is used on the weather details page.

The Share Weather action shares the selected location and its current weather information through the browser or device's native sharing interface.

A fallback message is provided when the Web Share API is unavailable.

## Responsive Design

The application uses CSS Flexbox and responsive sizing to support different screen sizes.

BEM-style class naming is used throughout the application, for example:

```text
.weather-detail-page
.search-bar__input
.search-bar__suggestion
```

The UI follows the provided Figma prototype, including its layout, spacing, typography, colours, cards, search interactions and weather information.

## Accessibility

Semantic HTML elements are used where appropriate, including `main`, `section`, `article`, `button`, and form inputs.

Icon-only controls use accessible labels where necessary.

Interactive elements are implemented using buttons and include focus-visible styling for keyboard navigation.

## Error Handling

Loading and error states are provided for asynchronous weather and location requests.

Failed API requests display an appropriate error message rather than leaving the interface in an incomplete state.

Search suggestions are cleared when the search query is empty or when no locations are found.

## Performance

Weather data for saved locations is loaded asynchronously using `Promise.all()`.

Reusable Vue components are used to reduce duplicated UI and logic.

## Testing

No automated test suite has been added for this practical test.

The application was manually tested during development, including:

* Location searching
* Selecting search results
* Loading weather data
* Saving and removing locations
* Weather detail navigation
* Profile editing and validation
* Web Share API behaviour
* Empty and error states
* Responsive layouts

## Git Practices

Git commits follow a conventional commit style.

Examples:

```text
feat: added weather location card
feat: added location search
feat: integrated weather API
fix: resolved search suggestion glitch
fix: corrected weather card spacing
chore: setup API key
```

## Environment Variables

The OpenWeatherMap API key is stored in a `.env` file and is not committed to the repository.

The required variable is:

```env
VITE_OPENWEATHER_API_KEY=your_api_key
```
