# DhanVarsha

DhanVarsha is an intelligent platform for Indian stock market analysis, built with Next.js, ShadCN UI, and Genkit. This application provides real-time stock data, AI-powered insights, and a clean interface for managing your portfolio.

## Features

- **Dashboard:** View major market indices and top stocks at a glance.
- **Real-time Data:** Live updates for stock prices and market changes.
- **AI-Powered Insights:** Generate summaries and sentiment analysis for any stock.
- **Trading Simulation:** Practice buying and selling stocks with a simulated trade panel.
- **Customizable Profile:** Manage your user settings and appearance, including a dark mode.

## Getting Started

Follow these instructions to set up the project on your local machine for development and testing.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 20.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/dhanvarsha.git
    cd dhanvarsha
    ```
    *(Replace `your-username` with your GitHub username)*

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    or if you use yarn:
    ```bash
    yarn install
    ```

3.  **Set up environment variables:**
    This project uses Genkit for AI features. To use Google's Gemini models, you'll need a Google AI API key.

    - Create a file named `.env` in the root of the project.
    - Add your API key to the `.env` file:
      ```
      GOOGLE_API_KEY=your_api_key_here
      ```
    - You can get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).


### Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    ```

2.  **Open your browser:**
    Navigate to [http://localhost:9002](http://localhost:9002) to see the application running.

## Available Scripts

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Lints the codebase for errors.
- `npm run typecheck`: Runs TypeScript to check for type errors.
