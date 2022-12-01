import { SettledIso } from '../../types';

/**
 * Usage of isSettledIso(<contender>) has been deprecated in favor of
 * isSettled(<contender>). It will throw a `SyntaxError` if you try
 * to use it.
 *
 * @remarks
 * The SyntaxError object represents an error when trying to
 * interpret syntactically invalid code. It is thrown when the
 * JavaScript engine encounters tokens or token order that does not
 * conform to the syntax of the language when parsing code.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError| SyntaxError} _on mozilla.org_
 *
 *  @public
 *  @deprecated
 */
export function isSettledIso<T>(contender: any): contender is SettledIso<T> {
  void contender;
  // return isSettledRight<T>(contender) || isSettledLeft(contender);

  throw new SyntaxError(
    'usage of isSettledIso(<contender>) has been deprecated in favor of isSettled(<contender>)'
  );
}
