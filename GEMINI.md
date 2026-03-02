# Elysia SvelteKit Plugin

## Project Overview

`elysia-sveltekit-plugin` is a plugin designed to integrate the Elysia web framework with SvelteKit. Built to run on **Bun**, this plugin enhances the Elysia context by injecting a `platform` property, providing seamless interoperability between Elysia's backend capabilities and SvelteKit's environment.

## Building and Running

Since this project utilizes Bun, standard Bun commands are expected for development and building:

*   **Install dependencies:** `bun install`
*   **Run development server/script:** `bun run dev` (TODO: verify exact script name once `package.json` is created)
*   **Run tests:** `bun test`

## Development Conventions

*   **Runtime:** The project strictly uses **Bun**. Ensure Bun is installed and used for all package management and execution.
*   **Core Functionality:** The primary goal of the plugin is to mutate the Elysia context by adding the `platform` property. Ensure any additions or modifications respect this core objective and Elysia's plugin authoring guidelines.
*   **Typing:** As an Elysia plugin, strong TypeScript typing is highly recommended to ensure the `platform` property is correctly inferred by users of the plugin.