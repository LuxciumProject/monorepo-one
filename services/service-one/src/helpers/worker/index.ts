export {};

/*


    const redisQueryResult = redisQuery(
      RC,
      'key',
      fullPath,
      immediateZalgo(calculatedValue)
    );


export async function getCachedPhash(
  RC: any,
  k_FullPath: string,
  getValueFnct: (fullPath: string) => Promise<string>
) {
  const K = `'cachedPhash:${k_FullPath}'`;
  const R = await RC;

  let value: Promise<string> | string = (await R.GET(K)) as string;
  if (value !== null && value.toString().length < 10) {
    return immediateZalgo(value);
  }


  value = commands.bigstr_phash_from_file(k_FullPath);
  SET(R, K, value);
  return immediateZalgo(value);
}

msg => { // .. dosomething }
      URL: https://www.jsonrpc.org/specification
      5.1 Error object
When a rpc call encounters an error, the Response Object MUST contain the error member with a value that is a Object with the following members:

code
A Number that indicates the error type that occurred.
This MUST be an integer.
message
A String providing a short description of the error.
The message SHOULD be limited to a concise single sentence.
data
A Primitive or Structured value that contains additional information about the error.
This may be omitted.
The value of this member is defined by the Server (e.g. detailed error information, nested errors etc.).
The error codes from and including -32768 to -32000 are reserved for pre-defined errors. Any code within this range, but not defined explicitly below is reserved for future use. The error codes are nearly the same as those suggested for XML-RPC at the following url: http://xmlrpc-epi.sourceforge.net/specs/rfc.fault_codes.php

code	message	meaning
-32700	Parse error	Invalid JSON was received by the server.
An error occurred on the server while parsing the JSON text.
-32600	Invalid Request	The JSON sent is not a valid Request object.
-32601	Method not found	The method does not exist / is not available.
-32602	Invalid params	Invalid method parameter(s).
-32603	Internal error	Internal JSON-RPC error.
-32000 to -32099	Server error	Reserved for implementation-defined server-errors.
The remainder of the space is available for application defined errors.
       */
