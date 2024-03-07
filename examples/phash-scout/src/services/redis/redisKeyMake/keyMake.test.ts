import { makeRedisKeys } from '.';
import { keyMake } from './keyMake';

export function __test__() {
  console.log('\n\n----------\n\n');

  console.log(makeRedisKeys.stringKey('stringKey', 'ID:stringKey'));
  console.log(makeRedisKeys.listKey('listKey', 'ID:listKey'));
  console.log(makeRedisKeys.setKey('setKey', 'ID:setKey'));
  console.log(makeRedisKeys.hashesKey('hashesKey', 'ID:hashesKey'));
  console.log(makeRedisKeys.pHashKey('pHashKey', 'ID:pHashKey'));
  console.log(makeRedisKeys.sortedKey('sortedKey', 'ID:sortedKey'));
  console.log(makeRedisKeys.streamKey('streamKey', 'ID:streamKey'));
  console.log(makeRedisKeys.geospatialKey('geospatialKey', 'ID:geospatialKey'));
  console.log(
    makeRedisKeys.hyperloglogKey('hyperloglogKey', 'ID:hyperloglogKey')
  );
  console.log(makeRedisKeys.bitmapKey('bitmapKey', 'ID:bitmapKey'));
  console.log(makeRedisKeys.bitfieldKey('bitfieldKey', 'ID:bitfieldKey'));

  console.log(makeRedisKeys.stringKey('stringKey_01')('stringKey_02', null));
  console.log(makeRedisKeys.listKey('listKey_01')('listKey_02', null));
  console.log(makeRedisKeys.setKey('setKey_01')('setKey_02', null));
  console.log(makeRedisKeys.hashesKey('hashesKey_01')('hashesKey_02', null));
  console.log(makeRedisKeys.pHashKey('pHashKey_01')('pHashKey_02', null));
  console.log(makeRedisKeys.sortedKey('sortedKey_01')('sortedKey_02', null));
  console.log(makeRedisKeys.streamKey('streamKey_01')('streamKey_02', null));
  console.log(
    makeRedisKeys.geospatialKey('geospatialKey_01')('geospatialKey_02', null)
  );

  console.log(
    makeRedisKeys.hyperloglogKey('hyperloglogKey_01')('hyperloglogKey_02', null)
  );
  console.log(makeRedisKeys.bitmapKey('bitmapKey_01')('bitmapKey_02', null));
  console.log(
    makeRedisKeys.bitfieldKey('bitfieldKey_01')('bitfieldKey_02', null)
  );
  console.log('\n\n----------\n\n');
  const alX_01 = keyMake('key0', null);
  const alX_02 = keyMake('key0')('key1', null);
  const alX_03 = keyMake('key0')('key1')('key2', null);
  console.log('alX_01:', alX_01);
  console.log('alX_02:', alX_02);
  console.log('alX_03:', alX_03);
  console.log('\n\n----------\n\n');

  keyMake(); // *           ?^ KeyMake
  keyMake(undefined); // *           ?^ KeyMake
  keyMake(null); // *           ?^ KeyMake
  keyMake('keyString1'); // *           ?^ KeyMake
  keyMake('keyString1')(); // *           ?^ KeyMake
  keyMake('keyString1')(undefined); // *           ?^ KeyMake
  keyMake('keyString1')(null); // *           ?^ KeyMake
  keyMake('keyString1', 'id1'); // %           ?^ string
  keyMake('keyString1', 'id1', 'id2'); // %           ?^ string
  keyMake('keyString1')('keyString2'); // *           ?^ KeyMake
  keyMake('keyString1')('keyString2', 'id1'); // %           ?^ string
  keyMake('keyString1')('keyString2', 'id1', 'id2'); // %           ?^ string
  keyMake('keyString1')('keyString2')('keyString3'); // *           ?^ KeyMake
  keyMake('keyString1')('keyString2')('keyString3')(); // *           ?^ KeyMake
  keyMake('keyString1')('keyString2')('keyString3')(undefined); // *           ?^ KeyMake
  keyMake('keyString1')('keyString2')('keyString3')(null); // *           ?^ KeyMake
  keyMake('keyString1')('keyString2')('keyString3', 'id1'); // %           ?^ string
  keyMake('keyString1')('keyString2')('keyString3', 'id1', 'id2'); // %           ?^ string

  // console.log('a_001 (?^ KeyMake):', a_001);
  // console.log('a_002 (?^ KeyMake):', a_002);
  // console.log('a_003 (?^ KeyMake):', a_003);
  // console.log('a_004 (?^ KeyMake):', a_004);
  // console.log('a_005 (?^ KeyMake):', a_005);
  // console.log('a_006 (?^ KeyMake):', a_006);
  // console.log('a_007 (?^ KeyMake):', a_007);
  // console.log('a_008 (?^ string):', a_008);
  // console.log('a_009 (?^ string):', a_009);
  // console.log('a_010 (?^ KeyMake):', a_010);
  // console.log('a_011 (?^ string):', a_011);
  // console.log('a_012 (?^ string):', a_012);
  // console.log('a_013 (?^ KeyMake):', a_013);
  // console.log('a_014 (?^ KeyMake):', a_014);
  // console.log('a_015 (?^ KeyMake):', a_015);
  // console.log('a_016 (?^ KeyMake):', a_016);
  // console.log('a_017 (?^ string):', a_017);
  // console.log('a_018 (?^ string):', a_018);
  // console.log('\n\n----------\n\n');
}

describe('first', () => {
  it('description', () => {
    const testValue = keyMake(); // *           ?^ KeyMake
    expect(testValue('terminalKey', 'id1')).toBe('R:terminalKey#id1');
  });
  it('description', () => {
    const testValue = keyMake(undefined); // *           ?^ KeyMake
    expect(testValue('terminalKey', 'id1')).toBe('R:terminalKey#id1');
  });
  it('description', () => {
    const testValue = keyMake(null); // *           ?^ KeyMake
    expect(testValue('terminalKey', 'id1')).toBe('R:terminalKey#id1');
  });
  it('description', () => {
    const testValue = keyMake('keyString1'); // *           ?^ KeyMake
    expect(testValue('terminalKey', 'id1')).toBe(
      'R:keyString1:terminalKey#id1'
    );
  });
  it('description', () => {
    const testValue = keyMake('keyString1')(); // *           ?^ KeyMake
    expect(testValue('terminalKey', 'id1')).toBe(
      'R:keyString1:terminalKey#id1'
    );
  });
  it('description', () => {
    const testValue = keyMake('keyString1')(undefined); // *           ?^ KeyMake
    expect(testValue('terminalKey', 'id1')).toBe(
      'R:keyString1:terminalKey#id1'
    );
  });
  it('description', () => {
    const testValue = keyMake('keyString1')(null); // *           ?^ KeyMake
    expect(testValue('terminalKey', 'id1')).toBe(
      'R:keyString1:terminalKey#id1'
    );
  });
  it('description', () => {
    const testValue = keyMake('keyString1', 'id1'); // %           ?^ string
    expect(testValue).toBe('R:keyString1#id1');
  });
  it('description', () => {
    const testValue = keyMake('keyString1', 'id1', 'id2'); // %           ?^ string
    expect(testValue).toBe('R:keyString1#id1:id2');
  });
  it('description', () => {
    const testValue = keyMake('keyString1')('keyString2'); // *           ?^ KeyMake
    expect(testValue('terminalKey', 'id1')).toBe(
      'R:keyString1:keyString2:terminalKey#id1'
    );
  });
  it('description', () => {
    const testValue = keyMake('keyString1')('keyString2', 'id1'); // %           ?^ string
    expect(testValue).toBe('R:keyString1:keyString2#id1');
  });
  it('description', () => {
    const testValue = keyMake('keyString1')('keyString2', 'id1', 'id2'); // %           ?^ string
    expect(testValue).toBe('R:keyString1:keyString2#id1:id2');
  });
  it('description', () => {
    const testValue = keyMake('keyString1')('keyString2')('keyString3'); // *           ?^ KeyMake
    expect(testValue('terminalKey', 'id1')).toBe(
      'R:keyString1:keyString2:keyString3:terminalKey#id1'
    );
  });
  it('description', () => {
    const testValue = keyMake('keyString1')('keyString2')('keyString3')(); // *           ?^ KeyMake
    expect(testValue('terminalKey', 'id1')).toBe(
      'R:keyString1:keyString2:keyString3:terminalKey#id1'
    );
  });
  it('description', () => {
    const testValue =
      keyMake('keyString1')('keyString2')('keyString3')(undefined); // *           ?^ KeyMake
    expect(testValue('terminalKey', 'id1')).toBe(
      'R:keyString1:keyString2:keyString3:terminalKey#id1'
    );
  });
  it('description', () => {
    const testValue = keyMake('keyString1')('keyString2')('keyString3')(null); // *           ?^ KeyMake
    expect(testValue('terminalKey', 'id1')).toBe(
      'R:keyString1:keyString2:keyString3:terminalKey#id1'
    );
  });
  it('description', () => {
    const testValue = keyMake('keyString1')('keyString2')('keyString3', 'id1'); // %           ?^ string
    expect(testValue).toBe('R:keyString1:keyString2:keyString3#id1');
  });
  it('description', () => {
    const testValue = keyMake('keyString1')('keyString2')(
      'keyString3',
      'id1',
      'id2'
    ); // %           ?^ string
    expect(testValue).toBe('R:keyString1:keyString2:keyString3#id1:id2');
  });
});

describe('second', () => {
  it('description', () => {
    const testValue = keyMake(); // *           ?^ KeyMake
    expect(testValue('terminalKey', null)).toBe('R:@terminalKey');
  });
  it('description', () => {
    const testValue = keyMake(undefined); // *           ?^ KeyMake
    expect(testValue('terminalKey', null)).toBe('R:@terminalKey');
  });
  it('description', () => {
    const testValue = keyMake(null); // *           ?^ KeyMake
    expect(testValue('terminalKey', null)).toBe('R:@terminalKey');
  });
  it('description', () => {
    const testValue = keyMake('keyString1'); // *           ?^ KeyMake
    expect(testValue('terminalKey', null)).toBe('R:@keyString1:terminalKey');
  });
  it('description', () => {
    const testValue = keyMake('keyString1')(); // *           ?^ KeyMake
    expect(testValue('terminalKey', null)).toBe('R:@keyString1:terminalKey');
  });
  it('description', () => {
    const testValue = keyMake('keyString1')(undefined); // *           ?^ KeyMake
    expect(testValue('terminalKey', null)).toBe('R:@keyString1:terminalKey');
  });
  it('description', () => {
    const testValue = keyMake('keyString1')(null); // *           ?^ KeyMake
    expect(testValue('terminalKey', null)).toBe('R:@keyString1:terminalKey');
  });
  it('description', () => {
    const testValue = keyMake('keyString1', null); // %           ?^ string
    expect(testValue).toBe('R:@keyString1');
  });
  it('description', () => {
    const testValue = keyMake('keyString1', null); // %           ?^ string
    expect(testValue).toBe('R:@keyString1');
  });
  it('description', () => {
    const testValue = keyMake('keyString1')('keyString2'); // *           ?^ KeyMake
    expect(testValue('terminalKey', null)).toBe(
      'R:@keyString1:keyString2:terminalKey'
    );
  });
  it('description', () => {
    const testValue = keyMake('keyString1')('keyString2', null); // %           ?^ string
    expect(testValue).toBe('R:@keyString1:keyString2');
  });
  it('description', () => {
    const testValue = keyMake('keyString1')('keyString2', null); // %           ?^ string
    expect(testValue).toBe('R:@keyString1:keyString2');
  });
  it('description', () => {
    const testValue = keyMake('keyString1')('keyString2')('keyString3'); // *           ?^ KeyMake
    expect(testValue('terminalKey', null)).toBe(
      'R:@keyString1:keyString2:keyString3:terminalKey'
    );
  });
  it('description', () => {
    const testValue = keyMake('keyString1')('keyString2')('keyString3')(); // *           ?^ KeyMake
    expect(testValue('terminalKey', null)).toBe(
      'R:@keyString1:keyString2:keyString3:terminalKey'
    );
  });
  it('description', () => {
    const testValue =
      keyMake('keyString1')('keyString2')('keyString3')(undefined); // *           ?^ KeyMake
    expect(testValue('terminalKey', null)).toBe(
      'R:@keyString1:keyString2:keyString3:terminalKey'
    );
  });
  it('description', () => {
    const testValue = keyMake('keyString1')('keyString2')('keyString3')(null); // *           ?^ KeyMake
    expect(testValue('terminalKey', null)).toBe(
      'R:@keyString1:keyString2:keyString3:terminalKey'
    );
  });
  it('description', () => {
    const testValue = keyMake('keyString1')('keyString2')('keyString3', null); // %           ?^ string
    expect(testValue).toBe('R:@keyString1:keyString2:keyString3');
  });
  it('description', () => {
    const testValue = keyMake('keyString1')('keyString2')('keyString3', null); // %           ?^ string
    expect(testValue).toBe('R:@keyString1:keyString2:keyString3');
  });
});

describe('third', () => {
  it('description', () => {
    const testValue = makeRedisKeys.stringKey('stringKey', 'ID:stringKey');
    expect(testValue).toBe('R:KEY:stringKey#ID:stringKey');
  });
  it('description', () => {
    const testValue = makeRedisKeys.listKey('listKey', 'ID:listKey');
    expect(testValue).toBe('R:LIST:listKey#ID:listKey');
  });
  it('description', () => {
    const testValue = makeRedisKeys.setKey('setKey', 'ID:setKey');
    expect(testValue).toBe('R:SET:setKey#ID:setKey');
  });
  it('description', () => {
    const testValue = makeRedisKeys.hashesKey('hashesKey', 'ID:hashesKey');
    expect(testValue).toBe('R:HASH:hashesKey#ID:hashesKey');
  });
  it('description', () => {
    const testValue = makeRedisKeys.pHashKey('pHashKey', 'ID:pHashKey');
    expect(testValue).toBe('R:P_HASH:pHashKey#ID:pHashKey');
  });
  it('description', () => {
    const testValue = makeRedisKeys.sortedKey('sortedKey', 'ID:sortedKey');
    expect(testValue).toBe('R:SORTED:sortedKey#ID:sortedKey');
  });
  it('description', () => {
    const testValue = makeRedisKeys.streamKey('streamKey', 'ID:streamKey');
    expect(testValue).toBe('R:STREAM:streamKey#ID:streamKey');
  });
  it('description', () => {
    const testValue = makeRedisKeys.geospatialKey(
      'geospatialKey',
      'ID:geospatialKey'
    );
    keyMake('keyString1')('keyString2')('keyString3')(undefined);
    expect(testValue).toBe('R:GEOSPATIAL:geospatialKey#ID:geospatialKey');
  });
  it('description', () => {
    const testValue = makeRedisKeys.hyperloglogKey(
      'hyperloglogKey',
      'ID:hyperloglogKey'
    );
    expect(testValue).toBe('R:HYPERLOGLOG:hyperloglogKey#ID:hyperloglogKey');
  });
  it('description', () => {
    const testValue = makeRedisKeys.bitmapKey('bitmapKey', 'ID:bitmapKey');
    expect(testValue).toBe('R:BITMAP:bitmapKey#ID:bitmapKey');
  });
  it('description', () => {
    const testValue = makeRedisKeys.bitfieldKey(
      'bitfieldKey',
      'ID:bitfieldKey'
    );
    expect(testValue).toBe('R:BITFIELD:bitfieldKey#ID:bitfieldKey');
  });
});

describe('fourth', () => {
  it('description', () => {
    const testValue = makeRedisKeys.stringKey('stringKey')(
      'stringKey_02',
      null
    );
    expect(testValue).toBe('R:@KEY:stringKey:stringKey_02');
  });
  it('description', () => {
    const testValue = makeRedisKeys.listKey('listKey')('listKey_02', null);
    expect(testValue).toBe('R:@LIST:listKey:listKey_02');
  });
  it('description', () => {
    const testValue = makeRedisKeys.setKey('setKey')('setKey_02', null);
    expect(testValue).toBe('R:@SET:setKey:setKey_02');
  });
  it('description', () => {
    const testValue = makeRedisKeys.hashesKey('hashesKey')(
      'hashesKey_02',
      null
    );
    expect(testValue).toBe('R:@HASH:hashesKey:hashesKey_02');
  });
  it('description', () => {
    const testValue = makeRedisKeys.pHashKey('pHashKey')('pHashKey_02', null);
    expect(testValue).toBe('R:@P_HASH:pHashKey:pHashKey_02');
  });
  it('description', () => {
    const testValue = makeRedisKeys.sortedKey('sortedKey')(
      'sortedKey_02',
      null
    );
    expect(testValue).toBe('R:@SORTED:sortedKey:sortedKey_02');
  });
  it('description', () => {
    const testValue = makeRedisKeys.streamKey('streamKey')(
      'streamKey_02',
      null
    );
    expect(testValue).toBe('R:@STREAM:streamKey:streamKey_02');
  });
  it('description', () => {
    const testValue = makeRedisKeys.geospatialKey('geospatialKey')(
      'geospatialKey_02',
      null
    );
    keyMake('keyString1')('keyString2')('keyString3')(undefined);
    expect(testValue).toBe('R:@GEOSPATIAL:geospatialKey:geospatialKey_02');
  });
  it('description', () => {
    const testValue = makeRedisKeys.hyperloglogKey('hyperloglogKey')(
      'hyperloglogKey_02',
      null
    );
    expect(testValue).toBe('R:@HYPERLOGLOG:hyperloglogKey:hyperloglogKey_02');
  });
  it('description', () => {
    const testValue = makeRedisKeys.bitmapKey('bitmapKey')(
      'bitmapKey_02',
      null
    );
    expect(testValue).toBe('R:@BITMAP:bitmapKey:bitmapKey_02');
  });
  it('description', () => {
    const testValue = makeRedisKeys.bitfieldKey('bitfieldKey')(
      'bitfieldKey_02',
      null
    );
    expect(testValue).toBe('R:@BITFIELD:bitfieldKey:bitfieldKey_02');
  });
});
/*
(makeRedisKeys.stringKey('stringKey');
(makeRedisKeys.listKey('listKey', 'ID:listKey'));
(makeRedisKeys.setKey('setKey', 'ID:setKey'));
(makeRedisKeys.hashesKey('hashesKey', 'ID:hashesKey'));
(makeRedisKeys.pHashKey('pHashKey', 'ID:pHashKey'));
(makeRedisKeys.sortedKey('sortedKey', 'ID:sortedKey'));
(makeRedisKeys.streamKey('streamKey', 'ID:streamKey'));
(makeRedisKeys.geospatialKey('geospatialKey', 'ID:geospatialKey'));
(makeRedisKeys.hyperloglogKey('hyperloglogKey', 'ID:hyperloglogKey'));
(makeRedisKeys.bitmapKey('bitmapKey', 'ID:bitmapKey'));
(makeRedisKeys.bitfieldKey('bitfieldKey', 'ID:bitfieldKey'));
 */
