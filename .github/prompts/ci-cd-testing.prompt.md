<!-- .github/prompts/ci-cd-testing.prompt.md -->

# CI/CD and Testing Guidelines

## Automated Testing

- **Maintain 90%+ test coverage**.
- Use **Jest** for unit tests and **integration testing**.
- Ensure **tests are isolated**—mock dependencies when necessary.

## CI/CD Pipelines

- Use **GitHub Actions** for running tests and building projects.
- Validate PRs with **pre-commit hooks**.

## Deployment Guidelines

- Always deploy from **main or release branches**.
- Implement **rollback strategies** in case of failed deployments.
