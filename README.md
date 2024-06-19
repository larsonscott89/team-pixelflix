# PixelFlix: A video streaming app with React, Firebase, and Firestore
This project is a collaborative effort to build PixelFlix, a streaming service web application inspired by Netflix.

## Technologies Used
**Frontend:** React, HTML, SASS  
**Backend:** Firebase, Firestore (serverless)

## Project Structure
**src/:** Contains all the React component code, stylesheets, and assets for the application.  
**public/:** Houses static files like favicon and any non-JavaScript assets.

# Database Design (ERD)
!["Alternative Text"](PixelFlix%20ERD.png)

# Schema Documentation
### User Model
##### The user model stores information about each user in your application.

## Schema
### email: String
##### Description: The user's email address.
##### Example: "fake@fake.com"
##### Constraints: Must be a valid email format.

### password: String
##### Description: The user's password.
##### Example: "password123"
##### Constraints: Minimum 8 characters, should be hashed before storing.

### profiles: Array
##### Description: List of profiles associated with the user's account.
##### Constraints: Each user can have multiple profiles.
##### Profile Schema (within User Model)

### avatar: String
##### Description: URL to the avatar image for the profile.
##### Example: "avatar_img_1"
##### Constraints: Must be a valid URL pointing to the avatar image.

### profileId: Number
##### Description: Unique identifier for the profile.
##### Example: 1
##### Constraints: Must be unique within the user's profiles.

### username: String
##### Description: Username for the profile.
##### Example: "username123"
##### Constraints: Must be unique within the user's profiles.
##### Media Model (Movies/TV Shows)
##### The media model stores information about each movie or TV show.

## Schema
### category: String
##### Description: Indicates whether the media is a movie or a TV show.
##### Example: "Movie"
##### Constraints: Should be either "Movie" or "TV Show".

### genre: String
##### Description: The genre of the media.
##### Example: "Documentary"
##### Constraints: Should be one of the predefined genres (e.g., Action, Comedy, Documentary, etc.).

### isTrending: Boolean
##### Description: Indicates whether the media is currently trending.
##### Example: true
##### Constraints: Must be either true or false.

### rating: String
##### Description: The rating of the media (e.g., G, PG, PG-13, R).
##### Example: "PG"
##### Constraints: Should be one of the predefined ratings.

### thumbnail: String
##### Description: URL to the thumbnail image for the media.
##### Example: "https://firebasestorage.googleapis.com/v0/b/pixelflix-88050.appspot.com/o/botton-gear.jpg?alt=media&token=c516b28c-cd08-4ab5-8022-9bd216549bd5"
##### Constraints: Must be a valid URL pointing to the thumbnail image.

### title: String
##### Description: The title of the media.
##### Example: "Bottom Gear"
##### Constraints: Must be a non-empty string.

### views: Number
##### Description: The number of views the media has received.
##### Example: 0
##### Constraints: Must be a non-negative integer.

### year: Number
##### Description: The year the media was released.
##### Example: 2021
##### Constraints: Must be a valid year (e.g., 4-digit number).


## Figma Design
!["Alternative Text"](Design%20System%20Figma.png)

## Setting Up PixelFlix
**Prerequisites:** Ensure you have Node.js (version 14 or later) and npm installed on your development machine.  
**Clone the Repository:** Use git to clone this repository to your local machine.  
**Install Dependencies:** Navigate to the project directory and run npm install to install all required dependencies.

### Running PixelFlix Locally
**Firebase Configuration:** Create a Firebase project and configure it with the application. Follow the Firebase documentation for setting up a web app and creating a Firestore database. Replace the placeholder values in the code with your actual Firebase project configuration.  
**Start the Development Server:** Run npm start in your terminal. This will start a local development server and open PixelFlix in your web browser (usually at http://localhost:3000).

## Project Management
We're using ClickUp to manage our project tasks, collaborate, and track progress.  
### Refer to the ClickUp board for detailed information on tasks, assignments, and discussions:

**ClickUp Board Link:** https://app.clickup.com/45044823/v/li/901403477785
______________________________
**Powered by [Grammerhub](http://discord.grammerhub.org)**

