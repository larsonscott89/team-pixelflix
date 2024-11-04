# PixelFlix

![Project Status](https://img.shields.io/badge/status-in%20development-brightgreen)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Firebase](https://img.shields.io/badge/Backend-Firebase-orange)
![Node Version](https://img.shields.io/badge/node-%3E%3D%2014-brightgreen)
![npm](https://img.shields.io/badge/npm-%3E%3D%206-red)
[![Figma Design](https://img.shields.io/badge/design-Figma-blueviolet?logo=figma&logoColor=white)](https://www.figma.com/design/W1OX48y2znw7rEcCNrSRFP/Pixelflix-Figma?node-id=0-1&t=fuN452mP19GmKuvd-1)
[![ClickUp Board](https://img.shields.io/badge/project%20management-ClickUp-purple)](https://app.clickup.com/45044823/v/li/901403477785)
[![Firebase Documentation](https://img.shields.io/badge/docs-Firebase-blue)](https://firebase.google.com/docs)

PixelFlix is a video streaming web application inspired by Netflix, built with React, Firebase, and Firestore. The app provides users with a personalized streaming experience, allowing them to create multiple profiles, bookmark movies and shows, and view trending media. Key features include user authentication, profile management, trending recommendations, and media filtering by categories and genres.

## Requirements

To run PixelFlix locally, you will need the following:

- **Node.js** (version 14 or later)
- **npm** (comes with Node.js)

## Usage

To start using PixelFlix, follow these commands:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/grammerjam/team-pixelflix.git

   ```

2. **Change Directories into pixelflix-app**:

   ```bash
   cd /pixelflix-app

   ```

3. **Install Dependencies**:

   ```bash
   npm i

   ```

4. **Run the Server**:
   ```bash
   npm run dev
   ```

## Technologies Used

**Frontend:** React, HTML, SASS  
**Backend:** Firebase (FireAuth, Firestore, Hosting) (serverless)

## Project Structure

**src/:** Contains all the React component code, stylesheets, and assets for the application.  
**public/:** Houses static files like favicon and any non-JavaScript assets.

## Database Schema

### User

| Field       | Data Type   | Description                                       |
| ----------- | ----------- | ------------------------------------------------- |
| `userId`    | `String`    | Unique identifier for the user (auto-generated)   |
| `email`     | `String`    | User's email address                              |
| `createdAt` | `Timestamp` | Date and time the user was created                |
| `profiles`  | `Array`     | Array of profile objects associated with the user |

### Profile

| Field         | Data Type | Description                                |
| ------------- | --------- | ------------------------------------------ |
| `profileId`   | `Number`  | Unique identifier for the profile          |
| `avatar`      | `String`  | Avatar image identifier for the profile    |
| `avatarColor` | `String`  | Color code for the avatar                  |
| `name`        | `String`  | Name for the profile                       |
| `bookmarks`   | `Array`   | Array of bookmarked items for this profile |

### Bookmark

| Field        | Data Type | Description                                                 |
| ------------ | --------- | ----------------------------------------------------------- |
| `id`         | `String`  | Unique identifier for the video item in the bookmarks array |
| `category`   | `String`  | Type of media (e.g., "Movie" or "TV Show")                  |
| `genre`      | `String`  | Genre of the media (e.g., "Documentary", "Action")          |
| `isTrending` | `Boolean` | Indicates if the media is currently trending                |
| `rating`     | `String`  | Content rating of the media (e.g., "PG", "R")               |
| `thumbnail`  | `String`  | URL to the thumbnail image for the media                    |
| `title`      | `String`  | Title of the media                                          |
| `views`      | `Number`  | Number of views the media has received                      |
| `year`       | `Number`  | Year the media was released                                 |

### Movies-TV

| Field        | Data Type | Description                                        |
| ------------ | --------- | -------------------------------------------------- |
| `id`         | `String`  | Unique identifier for the video item               |
| `category`   | `String`  | Type of media (e.g., "Movie" or "TV Show")         |
| `genre`      | `String`  | Genre of the media (e.g., "Documentary", "Action") |
| `isTrending` | `Boolean` | Indicates if the media is currently trending       |
| `rating`     | `String`  | Content rating of the media (e.g., "PG", "R")      |
| `thumbnail`  | `String`  | URL to the thumbnail image for the media           |
| `title`      | `String`  | Title of the media                                 |
| `views`      | `Number`  | Number of views the media has received             |
| `year`       | `Number`  | Year the media was released                        |

## Useful Resources

- **Figma Design**: Preview the app’s design system in [Figma](https://www.figma.com/design/W1OX48y2znw7rEcCNrSRFP/Pixelflix-Figma?node-id=0-1&t=fuN452mP19GmKuvd-1).
- **Project Management**: View the project’s [ClickUp board](https://app.clickup.com/45044823/v/li/901403477785) for task tracking and collaboration.
- **Firebase Documentation**: Refer to the [Firebase documentation](https://firebase.google.com/docs) to understand how to configure your Firebase and Firestore settings.

---

**Powered by [Grammerhub](http://discord.grammerhub.org)**
