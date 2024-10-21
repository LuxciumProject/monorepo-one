// @/decorators/utils/FantasyLand.ts
/**
 * Decorator that assigns the decorated method to the Fantasy Land specific key on the class prototype.
 *
 * @param methodName - The name of the Fantasy Land method to assign the decorated method to.
 * @returns A decorator function.
 * @example
 * class MyClass {
 *    @FantasyLand('of')
 *    public static of<TVal>(value: TVal): MyClass<TVal> {
 *      return new MyClass<TVal>(value);
 *    }
 * }
 * @internal
 */

export function FantasyLand<T>(methodName: string) {
  /**
   * @param target - The class prototype.
   * @param _propertyKey - The name of the decorated method.
   * @param descriptor - The property descriptor of the decorated method.
   * @internal
   */
  return function (
    target: T,
    _propertyKey: PropertyKey,
    descriptor: PropertyDescriptor
  ): void {
    // Assign the method to the Fantasy Land specific key on the class prototype
    Object.defineProperty<T>(target, `fantasy-land/${methodName}`, {
      value: descriptor.value,
      writable: true,
      configurable: true,
      enumerable: false,
    });
  };
}
