# Research Survey Form

This project is a polished, multi-section survey experience designed to understand how people discover, choose, and value entertainment and leisure experiences. The product presents a guided questionnaire that explores everything from basic demographics and habits to ideal pricing and imagined visit experiences.

## What this product does

The app functions as a customer-research survey interface for a brand called Weekender. It helps collect insights about:

- who the audience is
- how often they engage with paid entertainment venues
- what kinds of outings they enjoy
- how much they spend on entertainment and food
- what would make them more likely to visit a venue
- what pricing feels fair for different experiences

Rather than being a generic form, the experience is designed to feel immersive and modern. It uses clear sections, visual storytelling, expressive imagery, and a conversational flow to keep respondents engaged while still collecting structured research data.

## Main user journey

Visitors move through a series of themed chapters:

1. About you
   - captures age group, gender, occupation, household context, and lifestyle preferences
2. Your outing habits
   - explores recent entertainment activity, spending, and group behavior
3. Imagine the experience
   - invites respondents to describe how they would feel about the venue experience
4. Would you visit?
   - measures likely interest, frequency, and motivation to visit
5. Pricing & discovery
   - gathers opinions on pricing and the factors that influence discovery and purchase intent

Each section contains targeted questions with multiple input types such as radio buttons, checkboxes, text fields, and optional responses.

## Why this app exists

This product is intended for research and product discovery. It is built to:

- collect qualitative and quantitative feedback from potential customers
- help shape understanding of audience preferences
- support decisions about offerings, messaging, and pricing
- create a friendly survey experience that feels less like a form and more like an experience

## How the app works

The application is built as a modern React app using Vite and TanStack Router. The survey content is defined in the route layer and rendered through a rich, interactive UI. The project is structured so that the survey experience can be expanded, localized, or connected to a backend or analytics pipeline later.

### Core capabilities

- guided multi-step survey experience
- visually distinct survey chapters
- support for multiple question types
- optional questions and open-ended responses
- responsive layout for desktop and mobile use
- metadata for SEO and social sharing

## Project structure

- src contains the application source code
- src/routes holds the main pages and survey route definitions
- src/components contains reusable UI building blocks
- src/hooks contains custom React hooks
- src/lib contains helper utilities and shared logic
- src/assets stores images and other static assets

## Technical overview

The app is built with:

- React for UI rendering
- TanStack Router for route-based navigation
- TanStack Query for client-side data management
- Vite for development and build tooling
- a component library for reusable UI primitives

The current implementation is front-end focused, but the survey is designed to be compatible with future integrations such as form submission services, analytics tracking, or a backend datastore.

## Development

To run the project locally:

```bash
npm install
npm run dev
```

To build for production:

```bash
npm run build
```

## Notes for contributors

When working on this project, keep in mind that the product is not just a form. It is a research experience. Good contributions should preserve:

- clarity for survey respondents
- a smooth and pleasant user flow
- strong visual consistency
- accurate and meaningful question structure

If you are extending the survey, make sure new questions fit the existing research goals and maintain a consistent tone and experience across sections.
