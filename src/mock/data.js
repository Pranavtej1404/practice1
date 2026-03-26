export const mockTags = [
  'React', 'Frontend', 'Design', 'Architecture', 'CSS', 'Vite', 'State Management', 'Performance'
];

export const mockArticles = [
  {
    id: '1',
    title: 'Getting Started with Vite and React',
    excerpt: 'A comprehensive guide to modern React development using Vite as our build tool.',
    content: `# Getting Started with Vite and React
    
Vite is a modern build tool that aims to provide a faster and leaner development experience for modern web projects.

## Why Vite?
- **Fast Cold Starts**: No bundling required during development.
- **HMR**: Instant Hot Module Replacement.
- **Rich Features**: Out-of-the-box support for TypeScript, JSX, CSS and more.

### Setup Instructions
Run the following command to scaffold a new React project:

\`\`\`bash
npm create vite@latest my-react-app -- --template react
\`\`\`

You'll be amazed by how fast the dev server starts!
`,
    author: {
      id: 'a1',
      name: 'Sarah Drasner',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Drasner&background=2563eb&color=fff'
    },
    date: '2023-10-15T10:00:00Z',
    tags: ['React', 'Vite', 'Frontend'],
    readTime: 5
  },
  {
    id: '2',
    title: 'Advanced Tailwind CSS Techniques',
    excerpt: 'Learn how to build complex, responsive layouts with utility-first CSS.',
    content: `# Advanced Tailwind CSS
    
Tailwind CSS has revolutionized how we style web applications. Let's look at some advanced patterns.

## The Power of Arbitrary Values
Sometimes you need a specific value that isn't in your design system:

\`\`\`html
<div class="top-[117px] bg-[#bada55]">...</div>
\`\`\`

## Using \`@apply\` Responsibly
While \`@apply\` is useful, it should be used sparingly. Use it for:
1. Reusable component styles (like buttons)
2. Third-party library overrides
3. Custom base styles

> **Pro Tip:** Always prefer utility classes in your markup when possible. It makes maintenance easier.
`,
    author: {
      id: 'a2',
      name: 'Adam Wathan',
      avatar: 'https://ui-avatars.com/api/?name=Adam+Wathan&background=10b981&color=fff'
    },
    date: '2023-10-18T14:30:00Z',
    tags: ['CSS', 'Design', 'Frontend'],
    readTime: 8
  },
  {
    id: '3',
    title: 'Frontend Architecture Patterns 2024',
    excerpt: 'Overview of scalable frontend architectures used in large enterprise applications.',
    content: `# Frontend Architecture Patterns

Building scalable frontend applications requires careful planning and the right architectural choices.

## Feature-Sliced Design

Organize your code by domain/feature rather than technical concerns (like 'components', 'reducers', etc).

### Example Structure
- \`src/features/auth/\`
- \`src/features/articles/\`
- \`src/features/dashboard/\`

This makes it easier to locate related code and safely remove deprecated features.
`,
    author: {
      id: 'user1',
      name: 'Demo User',
      avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=6366f1&color=fff'
    },
    date: '2023-10-20T09:15:00Z',
    tags: ['Architecture', 'React'],
    readTime: 12
  },
  {
    id: '4',
    title: 'State Management Checklist',
    excerpt: 'When to use Context vs Redux vs Zustand vs React Query.',
    content: `# State Management in React

The React ecosystem has many options for state management. How do you choose?

## 1. Local State (useState/useReducer)
Use for: UI state (modals, form inputs, toggles).

## 2. React Context
Use for: Global UI state (theme, user auth) that doesn't change often.

## 3. Server State (React Query / SWR)
Use for: Cached server data, pagination, optimistic updates.

## 4. Complex Client State (Zustand / Redux)
Use for: Complex workflows, heavy client-side data manipulation.
`,
    author: {
      id: 'a3',
      name: 'Dan Abramov',
      avatar: 'https://ui-avatars.com/api/?name=Dan+Abramov&background=f43f5e&color=fff'
    },
    date: '2023-10-22T16:45:00Z',
    tags: ['State Management', 'React'],
    readTime: 6
  },
  {
    id: '5',
    title: 'Optimizing React Performance',
    excerpt: 'Actionable tips to keep your React applications running smoothly at 60fps.',
    content: `# Optimizing React Performance

Performance is a feature. Here are key ways to optimize your React apps.

## Memoization
Use \`useMemo\` and \`useCallback\` to prevent unnecessary re-computations and re-renders, but **don't overuse them**.

\`\`\`javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
\`\`\`

## Code Splitting
Use \`React.lazy\` and \`Suspense\` to split your bundles and load code only when needed.

## Measure First
Always use the React Profiler before optimizing to ensure you're fixing real bottlenecks.
`,
    author: {
      id: 'a1',
      name: 'Sarah Drasner',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Drasner&background=2563eb&color=fff'
    },
    date: '2023-10-25T11:20:00Z',
    tags: ['Performance', 'React'],
    readTime: 9
  },
  {
    id: '6',
    title: 'My Journey into Design Systems',
    excerpt: 'How we built our internal component library to ensure UI consistency.',
    content: `# Building a Design System

A design system is more than just a component library. It's the unifying language for a product team.

## Key Principles
1. **Consistency**: Use the same tokens for colors, spacing, and typography.
2. **Accessibility**: Every component must meet WCAG standards.
3. **Flexibility**: Components should be composable.

We achieved this by leveraging Tailwind CSS as our underlying token system while exposing a clean API via React components.
`,
    author: {
      id: 'user1',
      name: 'Demo User',
      avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=6366f1&color=fff'
    },
    date: '2023-10-28T08:30:00Z',
    tags: ['Design', 'CSS'],
    readTime: 7
  }
];
