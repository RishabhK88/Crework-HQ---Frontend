***
# Trello-Style Task Management Application - Frontend

This repository contains the frontend code for a web-based task management application similar to Trello, built using Next.js, TypeScript, Axios, Redux Toolkit, Tailwind CSS, and react-beautiful-dnd.

The above application was built as a part of [Main Repo](https://github.com/RishabhK88/CreworkHQ-Taskboard) for [assignment](https://crework.notion.site/Assignment-Trello-Style-Task-Management-Application-0bcb3b4db4504d6199b803704e561e87) by [Crework](https://www.crework.club/)

## Features

1. **User Authentication:**
    * Signup and login functionality using email and password.
    * Secure user session management.

2. **Task Board:**
    * Upon logging in, users see their personal task board.
    * The board has four columns: "To Do", "In Progress", “Under Review” and "Completed".

3. **Task Management:**
    * Users can create new tasks in any column.
    * Each task can have:
         * A Title (mandatory)
         * A Description (optional)
         * Status (mandatory, automatically filled when created in a specific section) - To Do, In Progress, Under Review, Completed
         * Priority (optional) - Values: Low, Medium, Urgent
         * Deadline (optional)
    * Users can edit and delete tasks after creation.

4. **Drag and Drop Functionality:**
    * Implemented using `react-beautiful-dnd` to move tasks between columns.
    * The task's status updates automatically when moved to a different column.

## Tech Stack

* **Frontend:** [Next.js](https://nextjs.org/) with [TypeScript](https://www.typescriptlang.org/)
* **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/usage/nextjs)
* **API Fetching:** [Axios](https://www.npmjs.com/package/axios)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Drag and Drop:** [react-beautiful-dnd](https://www.npmjs.com/package/react-beautiful-dnd)

## Setup Instructions

### Prerequisites

* Node.js
* npm

### Clone the Repository

```
git clone https://github.com/RishabhK88/Crework-HQ---Frontend.git
cd Crework-HQ---Frontend
```

### Install Dependencies

```
npm install
```

### Setup Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```
NEXT_PUBLIC_BACKEND_URL=<your-backend-api-url>
```

### Run the Application

```
npm run dev
```

## Folder Structure

* **/app**: Contains Next.js pages.
* **/components**: Reusable UI components.
* **/store**: Redux Toolkit store configuration.
* **/slices**: Redux Toolkit slices configuration.
* **/styles**: Global and component-specific styles using Tailwind CSS.
* **/assets**: Images, Icons & Illustrations.

***
