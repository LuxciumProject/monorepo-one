# Instructions for AI Agents on URL Inference and Navigation

To ensure AI agents accurately infer URLs and navigate to them safely, follow these guidelines. This approach aligns with best practices for path segmentation and variable naming conventions.

Our approach to structuring the JSON object and the paths is sound, and it aligns well with common best practices for path segmentation and variable naming conventions. Here is a review of our object and the formulas used to infer the links and paths for the files in the repository and local file system.

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

## Ensuring Accurate URL Inference

Avoid using search engines like Bing to infer URLs, as they can lead to unreliable and unsafe results. Instead, infer URLs directly using the repository's structure. Construct the URL based on the username, repository name, branch, directory path, and file name. This method ensures precise access to the required file content, maintaining consistency and safety.

## Conclusion

The JSON object and formulas provide a clear and consistent way to infer the links and paths for files in the repository and local file system. Following these conventions ensures that code is easy to read, maintain, and understand, aligning with best practices for path segmentation and variable naming. This approach promotes consistency, reliability, and safety in accessing file content.
