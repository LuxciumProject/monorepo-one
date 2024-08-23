# Instructions for AI Agents on URL Inference and Navigation

To ensure AI agents accurately infer URLs and navigate to them safely, follow these guidelines. This approach aligns with best practices for path segmentation and variable naming conventions.

In this document, we will review use the package.json as an example to demonstrate how to infer the links and paths for files in the repository and local file system. From this it will be possible to infer the links and paths for any file in the repository and local file system. obviously the directoryPath, fileName, and localBasePath will change for each file you want to infer the links and paths for.

Our approach to structuring the JSON object and the paths is sound, and it aligns well with common best practices for path segmentation and variable naming conventions. Here is a review of our object and the formulas used to infer the links and paths for the files in the repository and local file system.

## Ensuring Accurate URL Inference

Avoid using search engines like Bing to infer URLs, as they can lead to unreliable and unsafe results. Instead, infer URLs directly using the repository's structure. Construct the URL based on the username, repository name, branch, directory path, and file name. This method ensures precise access to the required file content, maintaining consistency and safety.

## JSON Object

The JSON object structure provides consistent information for constructing URLs and paths. It includes details such as the username, repository name, branch, directory path, file name, and relevant domains.

```json
{
  "username": "LuxciumProject",
  "repository": "monorepo-one",
  "branchName": "principal",
  "directoryPath": "frontend/home",
  "fileName": "package.json",
  "localBasePath": "/projects/monorepo-one",
  "github": {
    "domain": "github.com",
    "blob": "blob"
  },
  "rawGithubContent": {
    "domain": "raw.githubusercontent.com"
  }
}
```

## Formulas

Use these formulas to construct URLs and paths based on the JSON object.

### GitHub Blob URL

To construct a URL for viewing a file on GitHub:

**Formula:**

```
https://${github.domain}/${username}/${repository}/${github.blob}/${branchName}/${directoryPath}/${fileName}
```

**Example:**

```
https://github.com/LuxciumProject/monorepo-one/blob/principal/frontend/home/package.json
```

### Raw GitHub Content URL

To construct a URL for accessing the raw content of a file:

**Formula:**

```
https://${rawGithubContent.domain}/${username}/${repository}/${branchName}/${directoryPath}/${fileName}
```

**Example:**

```
https://raw.githubusercontent.com/LuxciumProject/monorepo-one/principal/frontend/home/package.json
```

### Local Path

To construct a local file path:

**Formula:**

```
${localBasePath}/${directoryPath}/${fileName}
```

**Example:**

```
/projects/monorepo-one/frontend/home/package.json
```

## Strategy for URL Inference

To avoid the pitfalls of unreliable search engine inferences, AI agents should directly construct URLs using predefined structures. This method utilizes specific repository details to form accurate web addresses, enhancing security and reliability in accessing file content.

### Direct Navigation and URL Translation

To facilitate seamless content access, automatically translate URLs containing `tree` to `blob`. This ensures direct navigation to file contents without manual URL adjustment.

**Rule:**
Automatically translate URLs containing `tree` to `blob`.

**Example:**

- **Original**: `https://github.com/LuxciumProject/monorepo-one/tree/principal/frontend/home`
- **Translated**: `https://github.com/LuxciumProject/monorepo-one/blob/principal/frontend/home`

This translation enhances efficiency and consistency when accessing files directly from GitHub.

## Detailed Explanation

To reconcile the local path with the two GitHub URL formulas, we need to map the local path components to the components used in the URL formulas. We will then create a generalized approach to derive any of the three paths (local, GitHub Blob URL, and Raw GitHub Content URL) from any given one.

### Components of Paths

1. **Local Path**: `/projects/monorepo-one/frontend/home/package.json`
2. **GitHub Blob URL**: `https://github.com/LuxciumProject/monorepo-one/blob/principal/frontend/home/package.json`
3. **Raw GitHub Content URL**: `https://raw.githubusercontent.com/LuxciumProject/monorepo-one/principal/frontend/home/package.json`

### Mapping Components

- **Local Path**:

  - localBasePath: /projects/monorepo-one
  - directoryPath: frontend/home
  - fileName: package.json

- **GitHub Blob URL**:

  - baseUrl: `https://github.com/${username}/${repository}`
  - branchName: principal
  - directoryPath: frontend/home
  - fileName: package.json
  - fullUrl: `https://github.com/${username}/${repository}/blob/${branchName}/${directoryPath}/${fileName}`

- **Raw GitHub Content URL**:
  - baseUrl: `https://raw.githubusercontent.com/${username}/${repository}`
  - branchName: principal
  - directoryPath: frontend/home
  - fileName: package.json
  - fullUrl: `https://raw.githubusercontent.com/${username}/${repository}/${branchName}/${directoryPath}/${fileName}`

### Generalization Approach

1. **Extract Components from Local Path**:

   - Given the local path: `/projects/monorepo-one/frontend/home/package.json`
     - localBasePath: `/projects/monorepo-one`
     - directoryPath: `frontend/home`
     - fileName: `package.json`
   - Combine directoryPath and fileName from local path with username, repository, and branchName to form the URLs.

2. **Construct GitHub Blob URL**:

`https://github.com/${username}/${repository}/blob/${branchName}/${directoryPath}/${fileName}`

3. **Construct Raw GitHub Content URL**:

`https://raw.githubusercontent.com/${username}/${repository}/${branchName}/${directoryPath}/${fileName}`

#### Examples

- **Given Local Path**:

  - Local Path: /projects/monorepo-one/frontend/home/package.json
  - Extracted Components:
    - localBasePath: /projects/monorepo-one
    - directoryPath: frontend/home
    - fileName: package.json

- **Derived GitHub Blob URL**:
  `https://github.com/LuxciumProject/monorepo-one/blob/principal/frontend/home/package.json`

- **Derived Raw GitHub Content URL**:
  `https://raw.githubusercontent.com/LuxciumProject/monorepo-one/principal/frontend/home/package.json`

### Summary

You can convert between the contextual information or based on a local path provided by the user to generate a corresponding GitHub URL systematically. This approach ensures accurate URL inference and navigation, enhancing the efficiency and reliability of AI agents in accessing file content.

**Process**:

- Extract directoryPath and fileName from local path.
- Use constants username, repository, and branchName.
- Apply formulas to derive GitHub URLs.

## Conclusion

The JSON object and formulas provide a clear and consistent way to infer the links and paths for files in the repository and local file system. Following these conventions ensures that code is easy to read, maintain, and understand, aligning with best practices for path segmentation and variable naming. This approach promotes consistency, reliability, and safety in accessing file content.

By adhering to these structured approaches and detailed mappings, AI agents can efficiently navigate and retrieve content from repositories. This protocol ensures that URL inferences are both accurate and aligned with best practices, thereby maintaining the integrity and security of data access.
