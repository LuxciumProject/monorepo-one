import { BaseBox } from './BaseBox';

describe('BaseBox', () => {
  describe('static of', () => {
    it('should create a BaseBox with the given value', () => {
      const box = BaseBox.of(123);
      expect(box).toBeInstanceOf(BaseBox);
      expect(box.boxedValue).toBe(123);
    });
  });

  describe('static from', () => {
    it('should create a new BaseBox from another BaseBox', () => {
      const box1 = BaseBox.of('abc');
      const box2 = BaseBox.from(box1);
      expect(box2).toBeInstanceOf(BaseBox);
      expect(box2.boxedValue).toBe('abc');
      expect(box2).not.toBe(box1);
    });
  });

  describe('static isBox', () => {
    it('should return true if value is a BaseBox', () => {
      const box = BaseBox.of(1);
      expect(BaseBox.isBox(box)).toBe(true);
    });
    it('should return false if value is not a BaseBox', () => {
      expect(BaseBox.isBox(1)).toBe(false);
    });
  });

  describe('static isMappable', () => {
    it('should return true if value has a map function', () => {
      const box = BaseBox.of(1);
      expect(BaseBox.isMappable(box)).toBe(true);
    });
    it('should return false if value does not have a map function', () => {
      expect(BaseBox.isMappable(1)).toBe(false);
      expect(BaseBox.isMappable({})).toBe(false);
    });
  });

  describe('static isUnboxable', () => {
    it('should return true if value has an unbox function', () => {
      const box = BaseBox.of(1);
      expect(BaseBox.isUnboxable(box)).toBe(true);
    });
    it('should return false if value does not have an unbox function', () => {
      expect(BaseBox.isUnboxable(1)).toBe(false);
      expect(BaseBox.isUnboxable({})).toBe(false);
    });
  });

  describe('static unbox', () => {
    it('should recursively unbox a BaseBox', () => {
      const box = BaseBox.of(BaseBox.of(5));
      expect(BaseBox.unbox(box)).toBe(5);
    });
    it('should return the value if not unboxable', () => {
      expect(BaseBox.unbox(7)).toBe(7);
    });
  });

  describe('map', () => {
    it('should map the boxed value and return a new BaseBox', () => {
      const box = BaseBox.of(2);
      const mapped = box.map(x => x * 10);
      expect(mapped).toBeInstanceOf(BaseBox);
      expect(mapped.boxedValue).toBe(20);
    });
  });

  describe('unbox', () => {
    it('should unbox the value', () => {
      const box = BaseBox.of('hello');
      expect(box.unbox()).toBe('hello');
    });
    it('should recursively unbox nested BaseBoxes', () => {
      const box = BaseBox.of(BaseBox.of('deep'));
      expect(box.unbox()).toBe('deep');
    });
  });

  describe('boxedValue getter', () => {
    it('should return the boxed value', () => {
      const box = BaseBox.of(42);
      expect(box.boxedValue).toBe(42);
    });
  });
});
