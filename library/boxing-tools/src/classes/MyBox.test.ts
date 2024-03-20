import { MyBox } from './MyBox';

describe('MyBox', () => {
  describe('of', () => {
    it('should create a new MyBox instance', () => {
      const value: number = 42;
      const box: MyBox<number> = MyBox.of(value);

      expect(box).toBeInstanceOf(MyBox);
      expect(box.boxedValue).toBe(value);
    });
  });

  describe('isBox', () => {
    it('should return true for a MyBox instance', () => {
      const box: MyBox<number> = MyBox.of(42);

      expect(MyBox.isBox(box)).toBe(true);
    });

    it('should return false for a non-MyBox value', () => {
      const value: number = 42;

      expect(MyBox.isBox(value)).toBe(false);
    });
  });

  describe('isMappable', () => {
    it('should return true for an object with a map function', () => {
      const mappable = { map: () => {} };

      expect(MyBox.isMappable(mappable)).toBe(true);
    });

    it('should return false for a non-mappable value', () => {
      const value: number = 42;

      expect(MyBox.isMappable(value)).toBe(false);
    });
  });

  describe('isUnboxable', () => {
    it('should return true for an object with an unbox function', () => {
      const unboxable: { unbox: () => void } = { unbox: () => {} };

      expect(MyBox.isUnboxable(unboxable)).toBe(true);
    });

    it('should return false for a non-unboxable value', () => {
      const value: number = 42;

      expect(MyBox.isUnboxable(value)).toBe(false);
    });
  });

  describe('map', () => {
    it('should apply the given function to the boxed value and return a new MyBox instance', () => {
      const value: 42 = 42;
      const box: MyBox<number> = MyBox.of(value);
      const fn = (value: number) => value * 2;
      const mappedBox: MyBox<number> = box.map(fn);

      expect(mappedBox).toBeInstanceOf(MyBox);
      expect(mappedBox.boxedValue).toBe(value * 2);
    });
  });

  describe('unbox', () => {
    it('should return the boxed value if it is not unboxable', () => {
      const value: number = 42;
      const box: MyBox<number> = MyBox.of(value);

      expect(box.unbox()).toBe(value);
    });
  });

  describe('boxedValue', () => {
    it('should return the boxed value', () => {
      const value: number = 42;
      const box: MyBox<number> = MyBox.of(value);

      expect(box.boxedValue).toBe(value);
    });
  });
});
describe('MyBox', () => {
  // ...

  describe('unbox', () => {
    it('should return the unboxed value if it is unboxable', () => {
      const value: number = 42;
      const unboxable_L0 = MyBox.of(value);
      const unboxable_L1 = MyBox.of(unboxable_L0);
      const unboxable_L2 = MyBox.of(unboxable_L1);
      type Nested = MyBox<MyBox<MyBox<MyBox<number>>>>;
      const box: Nested = MyBox.of(unboxable_L2);

      expect(box.unbox()).toBe(42);
    });

    it('should return the boxed value if it is not unboxable', () => {
      const value: number = 42;
      const box: MyBox<number> = MyBox.of(value);

      expect(box.unbox()).toBe(value);
    });

    it('should return the boxed value if it is not a MyBox instance', () => {
      const value: number = 42;
      const box: MyBox<number> = MyBox.of(value);

      expect(box.unbox()).toBe(value);
    });
  });

  // ...
});
