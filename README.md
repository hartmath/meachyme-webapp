# Chyme - Event Industry Messaging App

## Project Overview

**Chyme** is a comprehensive messaging platform designed specifically for the event industry. It combines WhatsApp-style messaging with event management features, social feeds, and professional networking capabilities.

**GitHub Repository**: https://github.com/hartmath/meachyme-webapp.git

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/583aaa4b-c7b4-4cf3-bcfb-c7db9446eb5e) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## 🚀 Key Features

- **💬 WhatsApp-style Messaging**: Real-time messaging with voice messages, reactions, and file sharing
- **📅 Event Management**: Create, manage, and attend events with ticket purchasing
- **📱 Social Feeds**: Twitter-like event updates and industry news
- **👥 Professional Profiles**: Event industry-specific user profiles (vendors, organizers, attendees)
- **🔔 Smart Notifications**: Customizable notification preferences
- **📞 Video/Voice Calls**: Integrated calling functionality
- **🎨 Modern UI**: Mobile-first responsive design with dark/light themes

## 🛠️ Technologies Used

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Tailwind CSS + Shadcn/ui components
- **Backend**: Supabase (Authentication, Database, Real-time)
- **State Management**: React Context + Hooks
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Deployment**: Vercel ready

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/hartmath/meachyme-webapp.git
   cd meachyme-webapp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Supabase**:
   - Create a new Supabase project
   - Run the SQL script from `supabase_setup.sql` in your Supabase SQL Editor
   - Update the Supabase URL and API key in `src/integrations/supabase/client.ts`

4. **Start development server**:
   ```bash
   npm run dev
   ```

## 🚀 Deployment Options

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically with the included `vercel.json` configuration

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Manual Deployment
```bash
npm run build
# Upload the 'dist' folder to your hosting provider
```

## 🔧 Environment Variables

Copy `env.example` to `.env.local` and update with your values:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

## 📱 Mobile App

This web app is designed mobile-first and can be installed as a PWA (Progressive Web App) on mobile devices.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
