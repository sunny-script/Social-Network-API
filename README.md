# Social Network API

## Description
This project involves building an API from scratch for a social network web application where users can share thoughts, react to friends' thoughts, and create a friend list. The API utilizes Express.js for routing, a MongoDB database, and the Mongoose ODM.

## User Story
```
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria
- GIVEN a social network API
  - WHEN I enter the command to invoke the application
    - THEN my server is started and the Mongoose models are synced to the MongoDB database
  - WHEN I open API GET routes in Insomnia for users and thoughts
    - THEN the data for each of these routes is displayed in a formatted JSON
  - WHEN I test API POST, PUT, and DELETE routes in Insomnia
    - THEN I can successfully create, update, and delete users and thoughts in my database
  - WHEN I test API POST and DELETE routes in Insomnia
    - THEN I can successfully create and delete reactions to thoughts and add and remove friends to a user's friend list

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript

## Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd social-network-api
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Users
#### Routes
- `GET /api/users` - Retrieve all users
- `GET /api/users/:id` - Retrieve a single user by ID, including thoughts and friend data
- `POST /api/users` - Create a new user
  ```json
  {
    "username": "lernantino",
    "email": "lernantino@gmail.com"
  }
  ```
- `PUT /api/users/:id` - Update a user by ID
- `DELETE /api/users/:id` - Remove a user by ID (Bonus: Removes associated thoughts)

#### Friend Management
- `POST /api/users/:userId/friends/:friendId` - Add a friend
- `DELETE /api/users/:userId/friends/:friendId` - Remove a friend

### Thoughts
#### Routes
- `GET /api/thoughts` - Retrieve all thoughts
- `GET /api/thoughts/:id` - Retrieve a single thought by ID
- `POST /api/thoughts` - Create a new thought
  ```json
  {
    "thoughtText": "This is a sample thought",
    "username": "lernantino"
  }
  ```
- `PUT /api/thoughts/:id` - Update a thought by ID
- `DELETE /api/thoughts/:id` - Remove a thought by ID

#### Reactions
- `POST /api/thoughts/:thoughtId/reactions` - Add a reaction
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId` - Remove a reaction

## Models

### User Model
| Field      | Type    | Properties                     |
|-----------|--------|--------------------------------|
| username  | String | Unique, Required, Trimmed     |
| email     | String | Unique, Required, Valid Email |
| thoughts  | Array  | References Thought model      |
| friends   | Array  | References User model        |

- **Virtuals**: `friendCount` (returns the number of friends a user has)

### Thought Model
| Field      | Type    | Properties                                    |
|-----------|--------|-----------------------------------------------|
| thoughtText | String | Required, Between 1-280 characters         |
| createdAt  | Date   | Default: current timestamp, Formatted getter |
| username   | String | Required                                     |
| reactions  | Array  | Uses `reactionSchema`                        |

- **Virtuals**: `reactionCount` (returns the number of reactions a thought has)

### Reaction Schema (Subdocument)
| Field         | Type   | Properties                                    |
|--------------|-------|-----------------------------------------------|
| reactionId   | ObjectId | Default: new ObjectId                     |
| reactionBody | String  | Required, Max 280 characters               |
| username     | String  | Required                                   |
| createdAt    | Date    | Default: current timestamp, Formatted getter |

## Walkthrough Video
[Click here to watch the walkthrough video - shows all routes except for post new thought and delete reaction](https://drive.google.com/file/d/1RJfpxSMxXwVyeskwmprVnVTSrSQ8dVo6/view)
[Click here to watch the follow up video that shows post new thought working correctly](https://drive.google.com/file/d/1lWlNuWw6_Tns3CMba8XQShPaGgi6sKbC/view)

## Screenshots
Get all Users
![get all users](<Screenshot 2025-02-06 113408.png>)
Get all Thoughts
![get all thoughts](<Screenshot 2025-02-06 113358.png>)

## License
This project is licensed under the MIT License.

## Contact
For questions or issues, please open an issue in the repository.

## Credit
A huge thank you to my classmates, tutors, and TAs who helped me to get unstuck and learn!