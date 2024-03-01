import Box from "./Box";

describe("Box", () => {
  describe("of", () => {
    it("should create a Box instance with the given value", () => {
      const box = Box.of(5);
      expect(box.unbox()).toBe(5);
    });
  });

  describe("map", () => {
    it("should apply the given function to the value inside the Box", () => {
      const box = Box.of(5);
      const mappedBox = box.map((value) => value + 1);
      expect(mappedBox.unbox()).toBe(6);
    });
  });

  describe("chain", () => {
    it("should apply the given function to the value inside the Box and flatten the result", () => {
      const box = Box.of(5);
      const chainedBox = box.chain((value) => Box.of(value + 1));
      expect(chainedBox.unbox()).toBe(6);
    });
  });

  describe("ap", () => {
    it("should apply the function inside the given Box to the value inside another Box", () => {
      const box = Box.of(5);
      const fnBox = Box.of((value: number) => value + 1);
      const appliedBox = box.ap(fnBox);
      expect(appliedBox.unbox()).toBe(6);
    });
  });

  describe("extend", () => {
    it("should apply the given function to the Box and return a new Box with the result", () => {
      const box = Box.of(5);
      const extendedBox = box.extend((b) => b.value + 1);
      expect(extendedBox.unbox()).toBe(6);
    });
  });

  describe("fantasy-land methods", () => {
    describe("fantasy-land/of", () => {
      it("should create a Box instance with the given value", () => {
        const box = Box["fantasy-land/of"](5);
        expect(box.unbox()).toBe(5);
      });
    });

    describe("fantasy-land/map", () => {
      it("should apply the given function to the value inside the Box", () => {
        const box = Box["fantasy-land/of"](5);
        const mappedBox = box["fantasy-land/map"]((value: number) => value + 1);
        expect(mappedBox.unbox()).toBe(6);
      });
    });

    describe("fantasy-land/chain", () => {
      it("should apply the given function to the value inside the Box and flatten the result", () => {
        const box = Box["fantasy-land/of"](5);
        const chainedBox = box["fantasy-land/chain"]((value: number) =>
          Box["fantasy-land/of"](value + 1),
        );
        expect(chainedBox.unbox()).toBe(6);
      });
    });
    describe("Comonad", () => {
      describe("fantasy-land/extend", () => {
        it("should apply the given function to the Box and return a new Box with the result", () => {
          const box = Box["fantasy-land/of"](5);
          const extendedBox = box["fantasy-land/extend"](
            (b: Box<number>) => b.value + 1,
          );
          expect(extendedBox.unbox()).toBe(6);
        });
      });

      it("should implement fantasy-land/extract", () => {
        const box = Box.of(1);
        expect(box["fantasy-land/extract"]()).toBe(1);
      });

      it("should satisfy the left identity law", () => {
        const box = Box.of(1);
        const left = box["fantasy-land/extend"]((_w: Box<number>) =>
          _w["fantasy-land/extract"](),
        );
        expect(left).toEqual(box);
      });

      it("should satisfy the right identity law", () => {
        const box = Box.of(1);
        const f = (_w: Box<number>) => _w["fantasy-land/extract"]() + 1;
        const right = box["fantasy-land/extend"](f)["fantasy-land/extract"]();
        expect(right).toBe(f(box));
      });
    });
  });
});
