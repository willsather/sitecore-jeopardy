# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `pnpm run dev` - Start development server
- `pnpm run build` - Build the application for production
- `pnpm run start` - Start production server
- `pnpm run lint` - Check code style and linting issues with Biome
- `pnpm run lint:fix` - Fix auto-fixable linting issues
- `npx tsc --noEmit` - Check TypeScript compilation without emitting files

## Architecture

This is a Next.js 15 AI Cloud Jeopardy game application built with:

- **Framework**: Next.js 15 with App Router
- **State Management**: Zustand with persistence to sessionStorage
- **UI Components**: Radix UI primitives with shadcn/ui styling
- **Styling**: Tailwind CSS with custom CSS variables
- **Linting**: Biome for code formatting and linting
- **TypeScript**: Strict type checking enabled

### Key Components

- **Game State** (`lib/game-state.ts`): Zustand store managing player name, score, current question, game data, and question tracking with Sets for answered/correct/incorrect questions
- **Question Modal** (`components/question-modal.tsx`): Displays questions with multiple choice options and handles answer selection
- **Question Data** (`data/questions.json`): Static JSON containing categories and questions with `options` arrays and `correctAnswer` indices
- **App Flow**: Home page (name entry) → Questions page (game board) → Game Over page (results)

### Data Structure Mismatch

The Question interface in `game-state.ts` expects an `answer` string field, but `questions.json` uses `options` array with `correctAnswer` index. The QuestionModal expects `options` and `correctAnswer` properties that don't exist in the current Question interface.

### State Management

Game state is persisted to sessionStorage with custom serialization to handle Set objects (converted to/from arrays for storage). The store manages navigation between pages using `window.location.href`.

### Known Issues

- TypeScript errors due to Question interface mismatch with actual data structure
- Linting warnings for array index keys in React components
- Game flow relies on direct window navigation rather than Next.js routing
