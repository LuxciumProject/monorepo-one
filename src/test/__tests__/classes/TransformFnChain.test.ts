import { addFirstFunction, ChainTranformFunctions } from '../../../classes';

describe('TransformFnChain', () => {
  it('should be a function', () => {
    expect(typeof ChainTranformFunctions).toBe('function');
  });

  it('should be a constructor', done => {
    expect(ChainTranformFunctions.prototype.constructor).toBe(
      ChainTranformFunctions
    );
    done();
  });

  it('should be a constructor that has a addFirstFunction static method', done => {
    expect(ChainTranformFunctions.addFirstFunction).toBeInstanceOf(Function);
    done();
  });

  it('should be a constructor that has a prototype that has a map method', done => {
    expect(ChainTranformFunctions.prototype.addFunction).toBeInstanceOf(
      Function
    );
    done();
  });

  it('should be a constructor that has a prototype that has a map method', done => {
    expect(ChainTranformFunctions.prototype.addLastFunction).toBeInstanceOf(
      Function
    );
    done();
  });
});

describe('TransformFnChain instance', () => {
  it('should be a constructor that has an addFirstFunction method', done => {
    const fn = jest.fn;
    expect(ChainTranformFunctions.addFirstFunction(fn)).toBeInstanceOf(
      ChainTranformFunctions
    );
    done();
  });

  it('should be compatible with this example', done => {
    const addFirstFunction = ChainTranformFunctions.addFirstFunction;
    const chain1 = addFirstFunction<number, number>(x => x + 2);
    const chain2 = chain1.addFunction<number, number>(x => x * 2);
    const chain3 = chain2.addFunction<number, number>(x => x + 3);
    const transformFnTuple = chain3.addLastFunction<number, number>(x => x * 5);
    expect(transformFnTuple.length).toBe(4);
    done();
  });

  it('should expose its fisrt function as the `firstFunction`', done => {
    const addFirstFunction = ChainTranformFunctions.addFirstFunction;
    const chain1 = addFirstFunction<number, number>(x => x + 2);
    expect(chain1.firstFunction(12, 0, [12])).toBe(14);
    done();
  });

  it('should expose its fisrt function as the `firstFunction` in any cases', done => {
    const addFirstFunction = ChainTranformFunctions.addFirstFunction;
    const chain1 = addFirstFunction<number, number>(x => x + 2);
    const chain2 = chain1.addFunction<number, number>(x => x / 2);
    expect(chain2.firstFunction(12, 0, [12])).toBe(14);
    done();
  });

  it('should expose its last function as the `lastFunction` when only one function', done => {
    const addFirstFunction = ChainTranformFunctions.addFirstFunction;
    const chain1 = addFirstFunction<number, number>(x => x * 2);
    expect(chain1.lastFunction(12, 0, [12])).toBe(24);
    done();
  });

  it('should expose its last function as the `lastFunction` when more than one function', done => {
    const addFirstFunction = ChainTranformFunctions.addFirstFunction;
    const chain1 = addFirstFunction<number, number>(x => x + 2);
    const chain2 = chain1.addFunction<number, number>(x => x / 2);
    expect(chain2.lastFunction(12, 0, [12])).toBe(6);
    done();
  });

  it('should have a `addLastFunction` method that unwrap the value', done => {
    function func01(x: number): number {
      return x + 2;
    }
    function func02(x: number): number {
      return x / 2;
    }
    function func03(x: number): number {
      return x * 5;
    }

    const chain1 = addFirstFunction<number, number>(func01);
    const chain2 = chain1.addFunction<number, number>(func02);
    const transformFnTuple = chain2.addLastFunction<number, number>(func03);
    expect(transformFnTuple).toStrictEqual([func01, func02, func03]);
    done();
  });
});

/*
 * ```ts
 * const addFirstFunction = TransformFnChain.addFirstFunction
 * const chain1 = addFirstFunction<number, number>((x) => x + 2);
 * const chain2 = chain1.addFunction<number, number>((x) => x * 2);
 * const chain3 = chain2.addFunction<number, number>((x) => x + 3);
 * const transformFnTuple = chain3.addLastFunction<number, number>((x) => x * 5);
 * ```
 */
