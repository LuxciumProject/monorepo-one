<!-- .github/prompts/documentation.prompt.md -->

# Documentation Best Practices

## Code Comments

- Use **TSDoc** in TypeScript:

  ```typescript
  /**
   * Gets a user by ID.
   * @param userId - The user's unique identifier.
   * @returns The user object.
   */
  function getUserById(userId: string): User {}
