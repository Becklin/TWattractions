# Taiwan Attractions Posts

This project is a website that showcases popular attractions and
destinations in Taiwan. It is built using Next.js and is hosted on
Vercel.

## Features

- Home page with featured attractions and recent posts
- Dynamic pages for individual attractions with details, photos
- Search functionality to filter attractions
- User authentication and authorization for creating and managing
  attraction posts and reviews
- Admin dashboard for managing attraction posts and user accounts

## Getting Started

1.  Clone the repository to your local machine:

<!-- -->

    git clone https://github.com/Becklin/TWattractions.git

2.  Install dependencies for the frontend:

<!-- -->

    cd taiwan-attractions
    npm install

3.  Configure the environment variables in `.env.local` to point to your
    backend API endpoint:

<!-- -->

    NEXT_PUBLIC_API_URL=http://your-api-endpoint.com

4.  Start the frontend server:

<!-- -->

    npm run dev

5.  Open your browser and go to `http://localhost:3000` to see the
    website.

## Deployment

To deploy the website on Vercel, follow these steps:

1.  Create a new project on Vercel and link it to your GitHub
    repository.

2.  Set up environment variables for the backend API endpoint and admin
    credentials in the Vercel project settings:

<!-- -->

    NEXT_PUBLIC_API_URL=http://your-api-endpoint.com
    NEXT_PUBLIC_GOOGLE_MAP_API_KEY
    NEXT_PUBLIC_FRONTEND_URL

3.  Push the changes to your GitHub repository, and Vercel will
    automatically build and deploy the website.

## Contributing

Contributions to this project are welcome! If you have any suggestions
or find any bugs, please create an issue or pull request.
