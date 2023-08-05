Let's create a class that meets your requirements. We'll have a private constructor, two factory methods (one for creating an instance from another class that can unbox, and one for creating an instance from the outside world), and the unbox and map methods. The class will hold a value that is a list and is iterable. The map method will be similar to the array's map method, with an optional third value that is an array. The of method will be modified to take multiple items of the same type.

```sh
function of<TVal>(...values: TVal[]): ClassName<TVal> {
    return new ClassName(values.flat());
  }
```