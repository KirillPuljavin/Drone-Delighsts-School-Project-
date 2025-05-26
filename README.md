# Drone Delights – Drone-Based Food Delivery Application

## Overview

Drone Delights is a modern web application that enables users to order food and have it delivered via autonomous drones. The project focuses on delivering a streamlined user experience for food selection, order management, and payment, supported by a lightweight backend.

## Setup Instructions

1. Clone the repository
2. Install dependencies using `npm install`
3. Start json-server with `npx json-server --watch db.json --port 3001`
4. Start the development server with `npm run dev`

## Purpose

This application demonstrates full-stack development of a responsive, design-driven, single-page application. The project includes both functional implementation and UI/UX design best practices and is intended as a professional portfolio piece.

## Features

- Fully responsive user interface for desktop and mobile
- Browseable and filterable food menu
- Dynamic cart with quantity control and order overview
- Payment form supporting simulated payment methods (Swish and credit card)
- Order confirmation with full summary
- State management for cart and user interaction
- RESTful API integration with json-server
- Modular component architecture using a modern frontend framework

## Technologies Used

- **Frontend**: React (or Vue 3)
- **Routing**: React Router (or Vue Router)
- **Backend**: json-server (mock REST API)
- **Design & Prototyping**: Figma
- **Version Control**: Git and GitHub
- **Development Tools**: Node.js, npm/yarn, ESLint/Prettier

## System Architecture

- Component-based UI architecture
- Decoupled frontend/backend with RESTful communication
- Static JSON database simulating menu, orders, and user data
- Local state management for user interactions
- Form validation and controlled inputs for secure and smooth UX

## Backend Endpoints

- `GET /products` – fetch all menu items
- `GET /products?type=[type]` – filter menu items by type
- `POST /orders` – submit an order
- `GET /users` – retrieve user accounts (optional for login)
- `POST /users` – register new user (optional)
