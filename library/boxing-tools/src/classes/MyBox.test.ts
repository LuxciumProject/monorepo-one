import { BaseBox } from './BaseBox';

describe('MyBox', () => {
  describe('of', () => {
    it('should create a new MyBox instance', () => {
      const value: number = 42;
      const box: BaseBox<number> = BaseBox.of(value);

      expect(box).toBeInstanceOf(BaseBox);
      expect(box.boxedValue).toBe(value);
    });
  });

  describe('isBox', () => {
    it('should return true for a MyBox instance', () => {
      const box: BaseBox<number> = BaseBox.of(42);

      expect(BaseBox.isBox(box)).toBe(true);
    });

    it('should return false for a non-MyBox value', () => {
      const value: number = 42;

      expect(BaseBox.isBox(value)).toBe(false);
    });
  });

  describe('isMappable', () => {
    it('should return true for an object with a map function', () => {
      const mappable = { map: () => {} };

      expect(BaseBox.isMappable(mappable)).toBe(true);
    });

    it('should return false for a non-mappable value', () => {
      const value: number = 42;

      expect(BaseBox.isMappable(value)).toBe(false);
    });
  });

  describe('isUnboxable', () => {
    it('should return true for an object with an unbox function', () => {
      const unboxable: { unbox: () => void } = { unbox: () => {} };

      expect(BaseBox.isUnboxable(unboxable)).toBe(true);
    });

    it('should return false for a non-unboxable value', () => {
      const value: number = 42;

      expect(BaseBox.isUnboxable(value)).toBe(false);
    });
  });

  describe('map', () => {
    it('should apply the given function to the boxed value and return a new MyBox instance', () => {
      const value: 42 = 42;
      const box: BaseBox<number> = BaseBox.of(value);
      const fn = (value: number) => value * 2;
      const mappedBox: BaseBox<number> = box.map(fn);

      expect(mappedBox).toBeInstanceOf(BaseBox);
      expect(mappedBox.boxedValue).toBe(value * 2);
    });
  });

  describe('unbox', () => {
    it('should return the boxed value if it is not unboxable', () => {
      const value: number = 42;
      const box: BaseBox<number> = BaseBox.of(value);

      expect(box.unbox()).toBe(value);
    });
  });

  describe('boxedValue', () => {
    it('should return the boxed value', () => {
      const value: number = 42;
      const box: BaseBox<number> = BaseBox.of(value);

      expect(box.boxedValue).toBe(value);
    });
  });
});
describe('MyBox', () => {
  // ...

  describe('unbox', () => {
    it('should return the unboxed value if it is unboxable', () => {
      const value: number = 42;
      const unboxable_L0 = BaseBox.of(value);
      const unboxable_L1 = BaseBox.of(unboxable_L0);
      const unboxable_L2 = BaseBox.of(unboxable_L1);
      type Nested = BaseBox<BaseBox<BaseBox<BaseBox<number>>>>;
      const box: Nested = BaseBox.of(unboxable_L2);

      expect(box.unbox()).toBe(42);
    });

    it('should return the boxed value if it is not unboxable', () => {
      const value: number = 42;
      const box: BaseBox<number> = BaseBox.of(value);

      expect(box.unbox()).toBe(value);
    });

    it('should return the boxed value if it is not a MyBox instance', () => {
      const value: number = 42;
      const box: BaseBox<number> = BaseBox.of(value);

      expect(box.unbox()).toBe(value);
    });
  });

  // ...
});
