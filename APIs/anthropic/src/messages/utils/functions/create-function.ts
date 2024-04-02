/*
Defining functions
Functions are defined by providing Claude with a description of the function wrapped in XML tags. The description should include:

The function name
A plaintext explanation of what the function does
The expected parameters, their types, and descriptions
The return values and types
Any exceptions that can be raised
*/

// <tool_description>
// <tool_name>get_weather</tool_name>
// <description>
// Retrieves the current weather for a specified location.
// Returns a dictionary with two fields:
// - temperature: float, the current temperature in Fahrenheit
// - conditions: string, a brief description of the current weather conditions
// Raises ValueError if the provided location cannot be found.
// </description>
// <parameters>
// <parameter>
// <name>location</name>
// <type>string</type>
// <description>The city and state, e.g. San Francisco, CA</description>
// </parameter>
// </parameters>
// </tool_description>

/*
Some tips for writing good function descriptions:

Be clear and concise, but provide enough detail for Claude to understand when the function should be used
Specify the types of the parameters and return values
Mention any relevant exceptions that can be raised
Use plaintext descriptions, not code syntax

***

# Example tool use prompt
Here is a full example of a prompt that provides Claude with two functions and a question that requires using them:

## System message

In this environment you have access to a set of tools you can use to answer the user's question.

You may call them like this:
<function_calls>
<invoke>
<tool_name>$TOOL_NAME</tool_name>
<parameters>
<$PARAMETER_NAME>$PARAMETER_VALUE</$PARAMETER_NAME>
...
</parameters>
</invoke>
</function_calls>

Here are the tools available:
<tools>
<tool_description>
<tool_name>get_current_stock_price</tool_name>
<description>Gets the current stock price for a company. Returns float: The current stock price. Raises ValueError: if the input symbol is invalid/unknown.</description>
<parameters>
<parameter>
<name>symbol</name>
<type>string</type>
<description>The stock symbol of the company to get the price for.</description>
</parameter>
</parameters>
</tool_description>

<tool_description>
<tool_name>get_ticker_symbol</tool_name>
<description>Gets the stock ticker symbol for a company searched by name. Returns str: The ticker symbol for the company stock. Raises TickerNotFound: if no matching ticker symbol is found.</description>
<parameters>
<parameter>
<name>company_name</name>
<type>string</type>
<description>The name of the company.</description>
</parameter>
</parameters>
</tool_description>
</tools>


## User's question

User	What is the current stock price of General Motors?

## Possible Assistant's answer

?Here is how Claude would respond:

<scratchpad>
To answer this question, I will need to:

1. Get the ticker symbol for General Motors using the get_ticker_symbol() function.
2. Use the returned ticker symbol to get the current stock price using the get_current_stock_price() function.
</scratchpad>

<function_calls>
<invoke>
<tool_name>get_ticker_symbol</tool_name>
<parameters>
<company_name>General Motors</company_name>
</parameters>
</invoke>
</function_calls>

## Function result (via User message)

?Claude first calls get_ticker_symbol to retrieve the ticker symbol for General Motors. We can recognize that Claude wants to call a function via the </function calls> stop sequence. We extract the relevant data from between the relevant XML tags and run the function on Claude's behalf. Then we pass the results back to Claude in <function_results> tags.

<function_results>
<result>
<tool_name>get_ticker_symbol</tool_name>
<stdout>
GM
</stdout>
</result>
</function_results>

## Function call (via Assistant message)

?Now that it knows the ticker symbol, Claude will subsequently decide that it has to call get_current_stock_price and get the current price.

<function_calls>
<invoke>
<tool_name>get_current_stock_price</tool_name>
<parameters>
<symbol>GM</symbol>
</parameters>
</invoke>
</function_calls>

## Function result (via User message)

?We pass back these results as well.

<function_results>
<result>
<tool_name>get_current_stock_price</tool_name>
<stdout>
38.50
</stdout>
</result>
</function_results>

## Final answer (via Assistant message)

?With this whole conversation chain providing Claude all the details it needs, Claude will be able to provide the user an answer as its final output.

<answer>
The current stock price of General Motors is $38.50.
</answer>


<tool_description>
<tool_name>get_ticker_symbol</tool_name>
<description>Gets the stock ticker symbol for a company searched by name. Returns str: The ticker symbol for the company stock. Raises TickerNotFound: if no matching ticker symbol is found.</description>
<parameters>
<parameter>
<name>company_name</name>
<type>string</type>
<description>The name of the company.</description>
</parameter>
</parameters>
</tool_description>
</tools>
 */

export function createToolElement<Text extends string>(
  tag: Text
): <Content extends string>(
  content: Content
) => `<${Text}>${Content}</${Text}>` {
  return <Content extends string>(content: Content) => {
    return `<${tag}>${content}</${tag}>`;
  };
}

const createElement = {
  tool_description: createToolElement('tool_description'),
  tool_name: createToolElement('tool_name'),
  description: createToolElement('description'),
  parameters: createToolElement('parameters'),
  parameter: createToolElement('parameter'),
  name: createToolElement('name'),
  type: createToolElement('type'),
  return: createToolElement('return'),
  exceptions: createToolElement('exceptions'),
  exception: createToolElement('exception'),
};

export function createTool<
  ToolName extends string = string,
  Description extends string = string,
  ReturnType extends string = string,
  Exceptions extends string = string,
>(
  name: ToolName,
  description: Description,
  parameters: { name: string; type: string; description: string }[],
  returnType: ReturnType,
  exceptions: Exceptions[]
) {
  const paramList = parameters
    .map(
      param => `<parameter>
<name>${param.name}</name>
<type>${param.type}</type>
<description>${param.description}</description>
</parameter>`
    )
    .join('');

  // const exceptions = ['ValueError' , 'TypeError'] as const;
  const exceptionList = exceptions
    .map(<Text extends string>(exception: Text) =>
      createElement.exception<typeof exception>(exception)
    )
    .join('');

  const result = createElement.tool_description(
    `${createElement.tool_name<typeof name>(name)}${createElement.description<typeof description>(description)}${createElement.parameters<typeof paramList>(paramList)}${createElement.return(createElement.type<typeof returnType>(returnType))}${createElement.exceptions<typeof exceptionList>(exceptionList)}`
  );
  return result;
  //   `
  // <tool_description>
  //   <tool_name>${name}</tool_name>
  //   <description>
  //     ${description}
  //   </description>
  //   <parameters>
  //     ${paramList}
  //   </parameters>
  //   <return>
  //     <type>${returnType}</type>
  //   </return>
  //   <exceptions>
  //     ${exceptionList}
  //   </exceptions>
  // </tool_description>`;
}

export const get_weather = createTool(
  'get_weather',
  'Retrieves the current weather for a specified location. Returns a dictionary with two fields: - temperature: float, the current temperature in Fahrenheit - conditions: string, a brief description of the current weather conditions Raises ValueError if the provided location cannot be found.',
  [
    {
      name: 'location',
      type: 'string',
      description: 'The city and state, e.g. San Francisco, CA',
    },
  ],
  'dict',
  ['ValueError']
);
