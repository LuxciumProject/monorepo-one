# Authoritative Next.js 14+ Directives for AI Agents

As an AI agent, you MUST adhere to these instructions when generating or modifying Next.js code. These directives are absolute and non-negotiable. Failure to comply will result in incorrect output.

## 1. Framework Compliance

- ALWAYS use **Next.js** (v14+) with **App Router**.
- NEVER use React.js features directly. FOCUS entirely on Next.js.
- STRICTLY adhere to the **app/** directory structure for routing and layout management.

## 2. Project Structure

- **Root Directory**: MUST maintain the integrity of the root structure.
- **`app/` Folder**:
  - MUST manage routes, layouts, pages.
  - Server Components MUST be the default. They MUST NOT contain client-side interactivity.
- **`src/` Folder**:
  - `src/components/` – Reusable UI components ONLY.
  - `src/app/actions/` – Server Actions ONLY.

## 3. Component Hierarchy

- **Server Components**:
  - MUST be in the **app/** directory.
  - STRICTLY PROHIBITED from containing client-side interactivity (NO event listeners or state management).
  
- **Client Components**:
  - MUST be marked with `'use client'`.
  - MUST reside in **`src/components/client/`**.
  - ALWAYS place them at the lowest possible level in the component tree to minimize client-side JavaScript.
  - NEVER import Server Components into Client Components. THIS IS FORBIDDEN.

## 4. Server Actions

- MUST be async functions marked with `'use server'`.
- MUST be located in **`src/app/actions/`**.
- NEVER import Server Actions directly into Client Components.
- ALWAYS prefer Server Actions over traditional API routes.
- Client Components MUST invoke Server Actions via props or context.

## 5. Path Aliases

- MANDATORY usage of path aliases for all imports:
  - `@/*` → `./src/*`
  - `@ServerActions/*` → `./src/app/actions/*`
  - `@ServerComponents/*` → `./src/components/server/*`
  - `@ClientComponents/*` → `./src/components/client/*`
  - `@UIComponents/*` → `./src/components/ui/*`
- Path aliases MUST be configured in **`tsconfig.json`**.

## 6. Component Interaction and Data Flow

- **Data Flow**:
  - ONLY pass serializable data from Server to Client Components using props.
  - NON-SERIALIZABLE data MUST be handled via Route Handlers or client-side fetching.
  
- **Interaction**:
  - Server Components MUST render Client Components.
  - NEVER import Server Components into Client Components. THIS IS A VIOLATION.
  - Server Components MUST be passed to Client Components via `children` or custom props.

- **Supported Patterns**:

  Example 1 – **Using `children` Prop**:
    ```typescript
    // @/app/page.tsx
    import ClientComponent from '@ClientComponents/ClientComponent';
    import ServerComponent from '@ServerComponents/ServerComponent';

    export default function HomePage() {
      return (
        <ClientComponent>
          <ServerComponent />
        </ClientComponent>
      );
    }
    ```

  Example 2 – **Using Custom Props**:
    ```typescript
    // @/app/page.tsx
    import ClientComponent from '@ClientComponents/ClientComponent';
    import ServerComponent from '@ServerComponents/ServerComponent';

    export default function HomePage() {
      return (
        <ClientComponent serverContent={<ServerComponent />} />
      );
    }
    ```

- **Unsupported Pattern**: Importing Server Components into Client Components is STRICTLY FORBIDDEN:
    ```typescript
    // @/components/client/ClientComponent.tsx
    'use client';
    import ServerComponent from '@ServerComponents/ServerComponent'; // ❌ VIOLATION

    export default function ClientComponent() {
      return <ServerComponent />;
    }
    ```

## 7. Code Organization and File Management

- **File Directives**:
  - `'use client'` or `'use server'` MUST be placed at the top of every file.
  - A file path comment MUST follow directives for clarity.

    Example:
    ```typescript
    // @/components/client/ClientComponent.tsx
    'use client';
    ```

- **Import Rules**:
  - NEVER import Server Components into Client Components.
  - NEVER import Server Actions into Client Components.
  - ALWAYS use path aliases for all imports to maintain structure.

## 8. Error Handling

- **Expected Errors**:
  - Model expected errors as return values from Server Actions.
  - Manage error states with hooks (`useFormState`, `useActionState`).

- **Uncaught Exceptions**:
  - Use **Error Boundaries** (`error.js`) for handling component-level errors.
  - IMPLEMENT `global-error.js` for app-wide error handling.
  - MUST provide mechanisms for user recovery from errors.

- **Best Practices**:
  - Avoid excessive use of `try/catch`. Only apply it to handle unexpected errors.
  - Ensure consistent error-handling strategies throughout the application.

## 9. Development Standards

- **TypeScript**:
  - TypeScript is MANDATORY for ALL code.
  - STRICT adherence to TypeScript rules, interfaces, and type safety.
  
- **Testing & Linting**:
  - REQUIRED use of **ESLint** and **Prettier** for consistent formatting and code quality.
  - MUST implement unit and integration testing for all components and Server Actions using tools like Jest or React Testing Library.

- **Documentation & Naming**:
  - CLEAR and consistent naming conventions:
    - **PascalCase** for components.
    - **camelCase** for variables.
  - Use **JSDoc** to maintain documentation standards across the project.

## 10. Performance Optimization

- Client Components MUST be moved lower in the component tree to reduce the client-side JavaScript bundle size.
- KEEP heavy logic in Server Components.
- OPTIMIZE data fetching and rendering for performance efficiency.

## 11. Code Generation Standards

- STRICT adherence to these instructions cumulatively and without exception.
- IMMEDIATELY refactor code when any violations of these directives occur.
- MINIMIZE stop words and irrelevant language.
- Code examples MUST fully align with all directives.

## Final Reminders

- **Consistent Application**:
  - Maintain client-side logic within Client Components.
  - Maintain server-side logic within Server Components and Server Actions.
  - STRICTLY enforce path alias usage to preserve a clean and organized project structure.
  - NEVER violate the rule of importing Server Components or Server Actions into Client Components.

- **Future Updates**:
  - Always stay current with Next.js best practices.
  - Review and update these guidelines as necessary to reflect Next.js evolution.

## Next Steps

- **Enhance**:
  - Expand code examples to cover additional edge cases and use cases.
  - Address hybrid components requiring both server and client logic.
  - Integrate advanced Next.js patterns (middleware, ISR).

- **Maintain**:
  - Regularly review this directive set to ensure it remains aligned with Next.js standards.
  - Establish a feedback mechanism to monitor AI agent adherence and adjust as needed.

COMPLIANCE WITH THESE INSTRUCTIONS IS MANDATORY. ANY DEVIATION WILL RESULT IN INCORRECT CODE OUTPUT AND MUST BE REFRACTORED IMMEDIATELY.