**Comprehensive Next.js Guidelines**

**1. Framework and Project Structure**

- **Framework Usage:**
  - Use **Next.js** with the **App Router** in the `app/` directory (v14+).
  - Focus solely on Next.js features; do not use React.js directly.

- **Project Structure:**
  - **Root Folder:** Project's root directory.
  - **`app/` Folder:**
    - Manages navigation, routes, layouts, and pages.
    - Contains Server Components by default.
  - **`src/` Folder:**
    - **`src/components/`** - Reusable UI components.
    - **`src/app/actions/`** - Server Actions.

**2. Component Types and Their Usage**

- **Server Components:**
  - Default in Next.js; rendered on the server.
  - Located in the `app/` directory.
  - Handle rendering and data fetching.
  - Do not include client-side interactivity (no event listeners or state management).

- **Client Components:**
  - Marked with `'use client'` at the top.
  - Located in `src/components/client/`.
  - Handle client-side logic (event handling, state management).
  - Keep as low as possible in the component tree to minimize client-side JavaScript.

**3. Server Actions**

- **Definition and Usage:**
  - Asynchronous functions marked with `'use server'` at the top.
  - Located in `src/app/actions/`.
  - Handle server-side tasks like form submissions, data mutations, and API interactions.
  - **Key Difference:** Server Actions are not components; they are functions.

- **Best Practices:**
  - Use Server Actions instead of traditional API routes.
  - Do not import Server Actions into Client Components directly.
  - Client Components can invoke Server Actions via props or context.

**4. Path Aliases**

- **Purpose:**
  - Provide a clean structure to differentiate between server and client code.
  - Simplify import statements for better readability.

- **Aliases:**
  - `"@/*": ["./src/*"]` - Default path alias.
  - `"@ServerActions/*": ["./src/app/actions/*"]` - Server-only actions.
  - `"@ServerComponents/*": ["./src/components/server/*"]` - Server-only components.
  - `"@ClientComponents/*": ["./src/components/client/*"]` - Client-only components.
  - `"@UIComponents/*": ["./src/components/ui/*"]` - UI building blocks.

**5. Component Interaction and Data Flow**

- **Data Passing:**
  - Pass data from Server to Client Components using serializable props.
  - Avoid passing non-serializable data; use Route Handlers or libraries for client-side fetching if necessary.

- **Interleaving Components:**
  - Server Components can render Client Components by importing them.
  - Do not import Server Components into Client Components.
  - Pass Server Components to Client Components via `children` or custom props.

- **Supported Patterns:**
  - **Using `children` Prop:**

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

  - **Using Custom Props:**

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

- **Unsupported Patterns:**
  - Importing Server Components directly into Client Components.

    ```typescript
    // @/components/client/ClientComponent.tsx
    'use client'; // 🚷 Importing server-side modules strictly prohibited
    import ServerComponent from '@ServerComponents/ServerComponent'; // ❌ Unsupported

    export default function ClientComponent() {
      return <ServerComponent />;
    }
    ```

**6. Import and File Management**

- **File Directives and Comments:**
  - Place the `'use client'` or `'use server'` directive at the top when necessary.
  - Include a file path comment using `// @/...` immediately after directives.
    - Example: `// @/components/client/ClientComponent.tsx`
  - Use path aliases in import statements for clarity.

- **Import Rules:**
  - Do not import Server Components into Client Components.
  - Do not import Server Actions into Client Components directly.
  - Ensure imports adhere to the separation of concerns.

**7. Error Handling**

- **Expected Errors:**
  - Model as return values from Server Actions.
  - Manage state with hooks (e.g., `useFormState`, `useActionState`).
  - Provide clear feedback to users through the UI.

- **Uncaught Exceptions:**
  - Use Error Boundaries (`error.js`) to catch errors in components.
  - Implement `global-error.js` for application-wide error handling in production.
  - Provide mechanisms for users to recover from errors.

- **Best Practices:**
  - Avoid overusing `try/catch`; reserve for truly unexpected errors.
  - Maintain consistent error handling strategies throughout the application.

**8. Development Practices**

- **Performance Optimization:**
  - Move Client Components down the tree to reduce client-side bundle size.
  - Keep heavy logic in Server Components.
  - Optimize data fetching and rendering.

- **TypeScript Usage:**
  - Use TypeScript for all code to ensure type safety.

- **Testing and Linting:**
  - Use ESLint and Prettier for code quality.
  - Implement unit and integration tests, especially for component interactions.

- **Documentation and Naming:**
  - Maintain clear and consistent naming conventions.
  - Keep comprehensive documentation for project structure and component usage.

**9. Code Generation Standards**

- **For AI Agents:**
  - Always follow the instructions cumulatively and incrementally.
  - Apply the separation of concerns strictly when generating code.
  - Enforce import rules and refactor any violations immediately.
  - Minimize stop words and irrelevant language to optimize for AI processing.
  - Ensure that code examples adhere to these guidelines.

---

**Final Reminders:**

- Consistently apply these refined instructions in all future code generation, refactoring, and rewriting tasks.

- Remember to:

  - Keep client-side logic in Client Components and server-side logic in Server Components and Server Actions.

  - Use the defined path aliases to maintain an organized and clean codebase.

  - Avoid importing Server Components or Actions into Client Components; instead, pass necessary data or components via props.

  - Adhere to the separation of concerns to optimize performance and maintainability.

- Stay updated with Next.js best practices and integrate them into your development process.

By following these guidelines, the AI agent will generate Next.js code that is efficient, maintainable, and aligned with both industry standards and your specific project preferences.
