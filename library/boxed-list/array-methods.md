# JavaScript Array Methods Reference

This document provides a comprehensive overview of JavaScript array methods, categorized by their behavior regarding array mutation and return values. It serves as a quick reference guide for understanding how each array method operates and what it returns.

## Methods that return a new array and do not mutate the original array

- concat ― Returns a new array that is the result of merging two or more arrays.
- filter ― Returns a new array with all elements that pass the test implemented by the provided function.
- flat ― Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.
- flatMap ― Returns a new array formed by applying a given function to each element of the array, and then flattening the result by one level.
- map ― Returns a new array with the results of calling a provided function on every element in the calling array.
- slice ― Returns a new array with a shallow copy of a portion of the original array, selected from start to end (end not included).
- toSorted ― Returns a new array with the elements sorted in ascending order.
- toSpliced ― Returns a new array with elements added or removed without modifying the original array.

## Methods that mutate the array in place

- copyWithin ― Modifies the array by copying a sequence of elements within the array to another position in the same array.
- fill ― Modifies the array by filling all the elements from a start index to an end index with a static value.
- pop ― Modifies the array by removing the last element and returns that element.
- push ― Modifies the array by adding one or more elements to the end and returns the new length of the array.
- reverse ― Modifies the array by reversing the order of its elements.
- shift ― Modifies the array by removing the first element and returns that element.
- sort ― Modifies the array by sorting its elements in place and returns the sorted array.
- splice (also returns a new array of deleted elements)
- unshift ― Modifies the array by adding one or more elements to the beginning and returns the new length of the array.

## Methods that do neither

- at ― Returns the element at the specified index.
- entries ― Returns a new Array Iterator object that contains the key/value pairs for each index in the array.
- every ― Tests whether all elements in the array pass the test implemented by the provided function and returns a Boolean value.
- find ― Returns the value of the first element in the array that satisfies the provided testing function.
- findIndex ― Returns the index of the first element in the array that satisfies the provided testing function.
- findLast ― Returns the value of the last element in the array that satisfies the provided testing function.
- findLastIndex ― Returns the index of the last element in the array that satisfies the provided testing function.
- forEach ― Executes a provided function once for each array element.
- includes ― Determines whether an array includes a certain value among its entries, returning true or false.
- indexOf ― Returns the first index at which a given element can be found in the array, or -1 if it is not present.
- join ― Joins all elements of an array into a string and returns this string.
- keys ― Returns a new Array Iterator object that contains the keys for each index in the array.
- lastIndexOf ― Returns the last index at which a given element can be found in the array, or -1 if it is not present.
- reduce ― Executes a reducer function on each element of the array, resulting in a single output value.
- reduceRight ― Executes a reducer function on each element of the array, from right to left, resulting in a single output value.
- some ― Tests whether at least one element in the array passes the test implemented by the provided function and returns a Boolean value.
- values ― Returns a new Array Iterator object that contains the values for each index in the array.
- toLocaleString ― Returns a string representing the elements of the array, using locale-specific conventions.
- toString ― Returns a string representing the elements of the array.

## Array Static Methods

- Array.from ― Creates a new, shallow-copied Array instance from an array-like or iterable object.
- Array.isArray ― Returns true if the value is an array; otherwise, false.
- Array.of ― Creates a new Array instance with a variable number of arguments, regardless of number or type of the arguments.
