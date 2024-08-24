### 1. Technologies Used

The frontend leverages modern web technologies to deliver a seamless user experience:

- **Vue.js:** A progressive JavaScript framework for building user interfaces and single-page applications (SPAs).
- **Vue Router:** Manages client-side routing, enabling navigation between different application views.
- **Vuex:** A state management library for Vue.js applications, ensuring consistent data handling across the app.
- **Axios:** A promise-based HTTP client for making requests to the backend APIs.
- **CSS:** Custom stylesheets and CSS libraries for designing the user interface.
- **HTML5:** The markup language used to structure the frontend components.

### 2. Project Setup

To run this project, clone the following repositories:

1. **Frontend Repository:** Contains the frontend application code.
2. **Backend Repository:** Houses the backend server code.
3. **Selenium Test Repository (Optional):** Includes automated tests for the application (if applicable).

**Cloning with Git:**

```bash
git clone https://github.com/pikovets/GeeksSocialNetworkUI.git
git clone https://github.com/pikovets/GeeksSocialNetworkAPI.git
git clone https://github.com/pikovets/GeeksSocialNetworkTests.git  # Optional for tests
```

### 3. Project Structure

The project follows a well-organized structure:

- **assets:** Stores static assets like images, icons, and styles used throughout the application.
- **components:** Reusable Vue.js components that build the user interface (headers, forms, posts, etc.).
- **config:** Configuration files, including API settings and validation rules for form inputs.
- **router:** Defines client-side routing, specifying how users navigate between views (pages) in the application.
- **services:** Encapsulates API service logic, providing methods for interacting with the backend through HTTP requests.
- **views:** Contains the main application views/pages, representing sections like the home page, login, profile, and signup.

### 4. User Interface Walkthrough

**Login Page:**

- Upon entering the application, users are greeted by the login page, where they can enter their credentials ![image](https://github.com/user-attachments/assets/5fddb41a-6d06-4836-ac01-da6f2e61a2e4)
- After successful login, users are redirected to the main page.
- New users can register by clicking the "Sign up" button and navigating to the registration page ![image](https://github.com/user-attachments/assets/de13bf77-5dd2-4bff-9bd7-680025e4d802)

**Main Page:**

- The main page displays the latest posts from the user's friends ![Screenshot from 2024-01-13 17-41-07](https://github.com/user-attachments/assets/e464501e-11a6-4c60-9428-4f8f3687bce3).
- Users can access their profile by clicking on their profile picture or selecting the "Profile" tab.

**Profile Management:**

- The profile page allows users to edit various aspects of their profile, including personal information, profile details, and account security.
![Screenshot from 2024-01-13 17-59-31](https://github.com/user-attachments/assets/0569ed22-44cb-4565-8e9d-994dd80f935b)
![Screenshot from 2024-01-13 17-59-23](https://github.com/user-attachments/assets/15d71e61-f788-491f-a953-73a191e6f9d4)
![Screenshot from 2024-01-13 17-59-46](https://github.com/user-attachments/assets/1c5e05f3-5504-4997-bc90-610aa0000337)


**Friends Management:**

- Users can view their friend list and navigate to individual friend profiles.
![Screenshot from 2024-01-13 17-47-57](https://github.com/user-attachments/assets/de038423-15a6-4207-b327-7f34824f8407)

- The search bar enables searching for other users on the platform.
![Screenshot from 2024-01-13 18-01-17](https://github.com/user-attachments/assets/6843e9ac-2e89-47ff-bd14-546ed3f2411b)

### 5. Running the Application with Docker Compose

The project leverages Docker Compose for a streamlined development environment. The `docker-compose.yml` file defines the required services:

- **Frontend:** The user interface container, built from the frontend code and dependent on the backend service.
- **Backend:** The backend service container, managing data operations and providing API access. Relies on the PostgreSQL database.
- **PostgreSQL:** The database container for persistent data storage.
- **RabbitMQ (Optional):** A message broker for asynchronous communication (if applicable).
- **Chrome and Selenium Hub (Optional):** Create the environment for running automated Selenium tests (if applicable).

**Running the Application:**

1. Build and start all services using Docker Compose:

```bash
docker-compose up --build
```

### 6. Stopping and Cleaning Up

- **Stop containers:**

```bash
docker-compose down
```

- **Remove all containers, networks, and volumes:**

```bash
docker-compose down --volumes --remove-orphans
```
