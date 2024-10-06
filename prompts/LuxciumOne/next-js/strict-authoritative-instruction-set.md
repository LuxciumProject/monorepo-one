# Authoritative Next.js 14+ Directives for AI Agents

As an AI agent, you MUST adhere to these instructions when generating or modifying Next.js code. These directives are absolute and non-negotiable. Failure to comply will result in incorrect output and MUST be rectified immediately.

## 1. Framework Compliance

- **MUST** use **Next.js** (v14+) with **App Router**.
- **NEVER** use React.js features directly. Focus entirely on Next.js.
- **STRICTLY** adhere to the `app/` directory structure for routing and layout management.

## 2. Project Structure

- **Root Directory**: Maintain the integrity of the root structure.
- **`app/` Folder**:
  - **MUST** manage routes, layouts, and pages.
  - **Server Components**:
    - **MUST** be the default in `app/`.
    - **PROHIBITED** from containing client-side interactivity (no event listeners or state management).
- **`src/` Folder**:
  - `src/components/` – Reusable UI components **ONLY**.
  - `src/app/actions/` – Server Actions **ONLY**.

## 3. Component Hierarchy

- **Server Components**:
  - **MUST** reside in the `app/` directory.
  - **STRICTLY PROHIBITED** from containing client-side interactivity.
  - **NEVER** import Server Components into Client Components.
- **Client Components**:
  - **MUST** be marked with `'use client'` at the top.
  - **MUST** reside in `src/components/client/`.
  - **MUST NOT** contain `async` functions directly in the component body.
    - **Explanation**: React components **MUST** return JSX synchronously. Using `async` in components causes them to return Promises, which React cannot handle.
    - **Proper Pattern**: Use `useEffect` or event handlers to manage asynchronous logic.
  - **ALWAYS** position at the lowest possible level in the component tree to minimize client-side JavaScript.
  - **NEVER** import Server Components or Server Actions.

## 4. Server Actions

- **MUST** be asynchronous functions marked with `'use server'` at the top.
- **MUST** be located in `src/app/actions/`.
- **ALWAYS** prefer Server Actions over traditional API routes.
  - **Explanation**: Server Actions provide integrated and efficient server-client interactions without the overhead of extra HTTP requests.
- **NEVER** import Server Actions into Client Components.
- **Client Components** **MUST** invoke Server Actions via props passed from Server Components.

## 5. Prohibition of `async` in Client Components

- **NEVER** use `async` functions directly in components marked with `'use client'`.
  - **Reason**: Components must return valid JSX synchronously. Using `async` causes a Promise to be returned, breaking React's rendering cycle.
- **MUST** handle asynchronous operations using `useEffect`, event handlers, or external functions.
  - **Proper Pattern**:

    ```typescript
    'use client'; // 🚷 Importing server-side modules strictly prohibited
    import { useEffect, useState } from 'react';

    export default function ClientComponent() {
      const [data, setData] = useState(null);

      useEffect(() => {
        function fetchData() {
          // Asynchronous logic here
          // Use .then() and .catch() for Promises
        }
        fetchData();
      }, []);

      return <div>{data}</div>;
    }
    ```

## 6. Path Aliases

- **MANDATORY** usage of path aliases for all imports:
  - `@/*` → `./src/*`
  - `@ServerActions/*` → `./src/app/actions/*`
  - `@ServerComponents/*` → `./src/components/server/*`
  - `@ClientComponents/*` → `./src/components/client/*`
  - `@UIComponents/*` → `./src/components/ui/*`
- **MUST** configure path aliases in `tsconfig.json` accurately.

## 7. Component Interaction and Data Flow

- **Data Flow**:
  - **ONLY** pass serializable data from Server to Client Components using props.
    - **NON-SERIALIZABLE** data **MUST** be handled via Route Handlers or client-side fetching.
  - **Interaction**:
  - **Server Components** **MUST** render Client Components.
    - **NEVER** import Server Components into Client Components. This is **STRICTLY FORBIDDEN**.
    - **Server Components** **MUST** pass data or components to Client Components via props.

- **Supported Patterns**:

    **Using Props to Pass Data**:

    ```typescript
      import ClientComponent from '@ClientComponents/ClientComponent';

      export default function HomePage() {
        const data = fetchData(); // Server-side data fetching

        return <ClientComponent data={data} />;
      }
    ```

  **Client Component Handling Data**:

    ```typescript
      'use client'; // 🚷 Importing server-side modules strictly prohibited

      export default function ClientComponent({ data }) {
        // Use data in client-side logic
        return <div>{data}</div>;
      }
    ```

  - **Unsupported Pattern**:

      **Importing Server Components into Client Components**:

      ```typescript
      'use client'; // 🚷 Importing server-side modules strictly prohibited
      import ServerComponent from '@ServerComponents/ServerComponent'; // ❌ VIOLATION

      export default function ClientComponent() {
        return <ServerComponent />;
      }
      ```

## 8. Imports & File Management

- **File Directives**:
  - **'use client'** or **'use server'** **MUST** be at the top of the file.
  - **MUST** include a file path comment immediately after the directive.

    Example:

    ```typescript
    // @/components/client/ClientComponent.tsx
    'use client'; // 🚷 Importing server-side modules strictly prohibited
    ```

- **Import Rules**:
  - **NEVER** import Server Components into Client Components.
  - **NEVER** import Server Actions into Client Components.
  - **ALWAYS** use path aliases for imports.

## 9. Error Handling

- **Expected Errors**:
  - **MUST** model expected errors as return values from Server Actions.
  - **MUST** manage state using appropriate hooks.
  - **MUST** provide clear user feedback through the UI.
- **Uncaught Exceptions**:
  - **MUST** use **Error Boundaries** (`error.js`) for component-level errors.
  - **MUST** implement `global-error.js` for application-wide error handling.
  - **MUST** provide mechanisms for user recovery.
- **Best Practices**:
  - **AVOID** excessive use of `try/catch`. Only apply it to handle unexpected errors.
  - **ENSURE** consistent error-handling strategies throughout the application.

## 10. Development Standards

- **TypeScript**:
  - **MANDATORY** use of TypeScript for all code.
  - **MUST** enforce strict type checking and adhere to TypeScript best practices.
- **Testing & Linting**:
  - **REQUIRED** use of **ESLint** and **Prettier**.
  - **MUST** implement unit and integration tests using tools like Jest or React Testing Library.
- **Naming Conventions**:
  - **PascalCase** for components.
  - **camelCase** for variables and functions.
  - **MUST** maintain consistency across the codebase.
- **Documentation**:
  - **MUST** use **JSDoc** for documenting code.
  - **MUST** keep documentation up-to-date.

## 11. Performance Optimization

- **Client Components**:
  - **MUST** be moved as low as possible in the component tree.
  - **MUST** avoid heavy computations or logic.
- **Server Components**:
  - **MUST** handle heavy logic and data fetching.
- **Data Fetching**:
  - **MUST** optimize data fetching strategies.
  - **MUST NOT** fetch data in Client Components unless absolutely necessary.

## 12. Code Generation Standards

- **STRICTLY** follow these instructions cumulatively and without exception.
- **IMMEDIATELY** refactor any code that violates these directives.
- **MINIMIZE** stop words and irrelevant language.
- **ENSURE** all code examples fully comply with these directives.

## 13. API Routes Usage

- **AVOID** using **API Routes** (`/pages/api/*` or `/app/api/*`).
- **ALWAYS** use **Server Actions** for server-side logic and data mutations.
- **ONLY** use API Routes as a last resort when Server Actions cannot fulfill the requirement.
- **MUST** justify any use of API Routes with a valid, exceptional reason.

## Final Reminders

- **Compliance**:
  - **MUST** ensure client-side logic remains in Client Components.
  - **MUST** ensure server-side logic remains in Server Components and Server Actions.
  - **STRICTLY** enforce separation of concerns.
- **Updates**:
  - **MUST** stay updated with Next.js best practices.
  - **MUST** review and update these directives as Next.js evolves.
- **Non-Compliance**:
  - **ANY** deviation from these directives is **UNACCEPTABLE** and **MUST** be corrected immediately.

## Next Steps

- **Enhance**:
  - **MUST** expand code examples to cover more scenarios.
  - **MUST** address components that require both server and client logic appropriately.
  - **MUST** incorporate advanced Next.js features (middleware, ISR) as per best practices.
- **Maintain**:
  - **MUST** regularly review this instruction set for alignment with the latest Next.js standards.
  - **MUST** establish a feedback mechanism to monitor compliance and effectiveness.

COMPLIANCE WITH THESE INSTRUCTIONS IS **MANDATORY**. ANY DEVIATION WILL RESULT IN INCORRECT CODE OUTPUT AND **MUST** BE RECTIFIED IMMEDIATELY.
