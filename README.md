***
# Trello-Style Task Management Application - Frontend

This repository contains the frontend code for a web-based task management application similar to Trello, built using Next.js, TypeScript, Axios, Redux Toolkit, Tailwind CSS, and react-beautiful-dnd.

## Features

1. **User Authentication:**
    - Signup and login functionality using email and password.
    - Secure user session management.

2. **Task Board:**
    - Upon logging in, users see their personal task board.
    - The board has four columns: "To-Do", "In Progress", “Under Review” and "Completed".

3. **Task Management:**
    - Users can create new tasks in any column.
    - Each task can have:
        - A title (mandatory)
        - A description (optional)
        - Status (mandatory, automatically filled when created in a specific section)
        - Priority (optional, with values: Low, Medium, Urgent)
        - Deadline (optional)
    - Users can edit and delete tasks after creation.

4. **Drag and Drop Functionality:**
    - Implemented using `react-beautiful-dnd` to move tasks between columns.
    - The task's status updates automatically when moved to a different column.

## Tech Stack

- **Frontend:** Next.js with TypeScript
- **State Management:** Redux Toolkit
- **API Fetching:** Axios
- **Styling:** Tailwind CSS
- **Drag and Drop:** react-beautiful-dnd

## Setup Instructions

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)

### Clone the Repository

```

git clone repositoryurl
cd repositorydirectory

```

### Install Dependencies

```

npm install

```

### Setup Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```

NEXT\_PUBLIC\_API\_URL=your-backend-api-url

```

### Run the Application

```

npm run dev

```

## Folder Structure

- **/pages**: Contains Next.js pages.
- **/components**: Reusable UI components.
- **/redux**: Redux Toolkit slices and store configuration.
- **/styles**: Global and component-specific styles using Tailwind CSS.
- **/utils**: Utility functions and API calls.

## Key Dependencies

- **Next.js**: Framework for server-rendered React applications.
- **TypeScript**: Typed JavaScript for better development experience.
- **Redux Toolkit**: State management library.
- **Axios**: Promise-based HTTP client for API fetching.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **react-beautiful-dnd**: Drag and drop functionality for React.

## Available Scripts

- `npm run dev`: Runs the app in the development mode.
- `npm run build`: Builds the app for production.
- `npm run start`: Runs the built app in production mode.

## Contact

For any questions or feedback, please reach out to  rishabhrare8@gmail.com
***