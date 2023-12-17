# Tech Test Brief

## Overview

This application displays and searches through the payouts to users. The table is available at the root URL of the application.

## Technical Requirements

### General

- The application must be developed using TypeScript.
- Utilise Styled Components for styling the components in accordance with the Figma designs.
- We often find the need to make slight alterations to the designs - please use your best judgement to make the necessary adjustments, particularly adding a column for usernames.
- Implement a search functionality that allows for searching payouts based on various criteria, including username. Please see the API Integration section for more details, and as above tweak the designs as you see fit.
- Implement pagination functionality that allows for navigating through the payouts. Please see the API Integration section for more details, and as above tweak the designs as you see fit.

### API Integration

The project is using the following APIs. These are the dependencies for this project to work.

1. **Payouts Endpoint**

   **Endpoint:** `https://theseus-staging.lithium.ventures/api/v1/analytics/tech-test/payouts`

   **Method:** GET

   **Description:** This endpoint retrieves a list of payouts. Each payout object contains the following fields:

   - `dateAndTime`: A string representing the date and time of the payout.
   - `status`: A string indicating the status of the payout (Pending or Completed).
   - `value`: A string representing the value of the payout.
   - `username`: A string representing the username associated with the payout.

    This endpoint also includes the following metadata:

   `"metadata": {"page": number, "limit": number, "totalCount": number}`

   You can attach the following query parameters to the endpoint to facilitate pagination:

   page: The page number to retrieve.
   limit: The number of payouts to retrieve per page.

2. **Search Endpoint**

   **Endpoint:** `https://theseus-staging.lithium.ventures/api/v1/analytics/tech-test/search?query=SEARCH_TERM`

   **Method:** GET

   **Description:** This endpoint allows for searching payouts by username. Implement a functionality that facilitates user search with a keen focus on optimizing the user experience whilst considering performance.

#### Note: These APIs don't have any authentication in place. The app doesn't send any auth data.

## Project structure
            - Root
                - medley-test (React App)
                    - public (assets)
                    - src (source code)
                        - Index.tsx (react entry point)
                        - App.tsx (applicaton entry point)
                        - shared (code shared between modules. These are generalizable enought)
                            - styled-components (General styled components)
                             --------- Component Files -----------
                        - modules (Application modules. Directory is grouped by feature)
                            - {module-name}
                                - models (Data structures, interfaces etc.)
                                - services (Services to interact with API and do background tasks)
                                - view (React components)
                                    - {Component to integrate everything for the page}.tsx
                                    - subdirectories for smaller and finer components

This structure doesn't include tests, but they can be included inside the modules. Any integration test would have a separate folder at the root of the react app.
Shared folder ensures that we are making reusable components and are avoiding any unnecessary duplication of code.

## Approach
- The Application loads the page and for the first time. It loads the data with 10 as page size and 1 as page number. The limit is taken as 10 to ensure that the API call is lighter and the page loading is faster.
- On the paginated API call we are also setting the total count of the data which helps us ensure we don't make a call to a page that doesn't exist.
- There are two buttons for navigating through pages and one dropdown to select the page size. These are minimally styled at the moment.
- There is a search bar which sets the query to be searched on. The code waits for a second before making a call so that we avoid unnecessary calls while the user is still typing.
- Whenever these calls are made the payout data is set again with the set state function. This would be reflected on the table to which the data is fed.

## Tech stack
The tech stack is minimal, you only require
1. Reactjs
2. Styled components

I have kept it minimal and not used any design system either.

## Running the project
From this directory
```
    $ cd medley-test
    $ npm i
    $ npm run start
```

This will start the server at [localhost:3000](http://localhost:3000/)
