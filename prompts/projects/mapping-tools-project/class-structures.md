## **System-Agnostic Directives for TypeScript Class Member Ordering**

### **1. Fields**
- **Declare private and protected fields first** to ensure encapsulation.
- **Place public fields after private/protected fields** to maintain visibility hierarchy.
- **Mark read-only fields explicitly with `readonly`**, ensuring they adhere to standard field placement rules.
- **Position static fields before instance fields** within the same visibility level.

### **2. Static Methods**
- **Factory methods (`static of()` or similar) must be positioned immediately after fields** for clarity in instantiation logic.
- **Group static utility methods separately** from factory methods to distinguish their roles.
- **If a static constructor-like function is present, place it at the top of the static method section** for consistency.

### **3. Constructor**
- **Restrict instantiation control by marking constructors as `protected` or `private` where applicable.**
- **Arrange required parameters before optional ones** to ensure proper instantiation flow.
- **Prefer constructor-based Dependency Injection** to centralize dependencies.
- **Declare parameter properties explicitly as `private` or `readonly`** rather than assigning them within the constructor body.

### **4. Lifecycle Methods (if applicable)**
- **Allocate a dedicated section for lifecycle methods** such as Angular lifecycle hooks or React-like lifecycle handlers.
- **Follow logical ordering, placing initialization methods (`onInit`) before cleanup methods (`onDestroy`).**

### **5. Instance Methods**
- **Organize public instance methods before private instance methods** to reflect access levels.
- **Prefix state-mutating methods with verbs** such as `set`, `update`, or `modify` to indicate their effect.
- **Position getter and setter methods below state-mutating methods** for logical structuring.
- **Group business logic methods by functionality** to enhance readability.

### **6. Getters and Setters**
- **Place getters at the bottom of instance methods** for consistency.
- **Ensure setters (if applicable) are located directly above their corresponding getters.**
- **Group computed properties together** at the end of the instance methods section.

### **7. Error Handling Methods**
- **Segment error-handling methods separately** to enhance debugging and maintainability.
- **Position `onError` handlers close to related logic** for direct context reference.

### **8. Async and Promise-Based Methods**
- **Mark async methods explicitly with `async`** for clarity.
- **Ensure Promise-returning methods have descriptive names** that reflect their asynchronous nature (e.g., `fetchData`, `loadSomethingAsync`).
- **Group asynchronous methods separately from synchronous methods** to avoid confusion.

### **9. Overriding and Extensibility**
- **Position overridden methods near their parent class counterparts** to facilitate maintainability.
- **Clearly document methods intended for subclass extension** to guide further development.
- **Mark hooks (template methods) explicitly as `protected`** to indicate their intended usage in subclassing.