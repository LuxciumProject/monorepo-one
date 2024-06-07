const prices = {
  'fromMtok': 1000000,
  'fromKtok': 1000,
  'toMtok': 0.000001,
  'toKtok': 0.001,

  'Claude 3 Pricing': {
    MTok: 'million tokens. All Claude 3 models support vision and 200,000 token context windows.',
    Haiku: {
      description:
        'Haiku model is designed Light & fast model is designed for quick, low-impact applications.',
      kind: 'Efficient',
      Input: {
        perMTok: '$0.25',
        perKTok: '$0.00025',
      },
      Output: {
        perMTok: '$1.25',
        perKTok: '$0.00125',
      },
    },
    Sonnet: {
      description: 'Sonnet model is designed for high-impact applications.',
      kind: 'Hard-working',
      Input: {
        perMTok: '$3',
        perKTok: '$0.003',
      },
      Output: {
        perMTok: '$15',
        perKTok: '$0.015',
      },
    },
    Opus: {
      description:
        'Opus model is designed for large-scale, high-impact applications.',
      kind: 'Powerful',
      Input: {
        perMTok: '$15',
        perKTok: '$0.015',
      },
      Output: {
        perMTok: '$75',
        perKTok: '$0.075',
      },
    },
  },
  'Legacy Model Pricing': {
    'Claude 2.1': {
      context: '200000',
      Input: {
        perMTok: '$8',
        perKTok: '$0.008',
      },
      Output: {
        perMTok: '$24',
        perKTok: '$0.024',
      },
    },
    'Claude 2.0': {
      context: '100000',
      Input: {
        perMTok: '$8',
        perKTok: '$0.008',
      },
      Output: {
        perMTok: '$24',
        perKTok: '$0.024',
      },
    },
    'Claude Instant': {
      context: '100000',
      Input: {
        perMTok: '$0.80',
        perKTok: '$0.0008',
      },
      Output: {
        perMTok: '$2.40',
        perKTok: '$0.0024',
      },
    },
  },
};

// create a function that will take the price object and that would outpu a simplified version for just claud 3 with onlyt the prices compact and eassy to use in many computations later down the chain
function simplifyClaude3Prices(prices) {
  const simplifiedPrices = {};

  const claude3Pricing = prices['Claude 3 Pricing'];
  const haiku = claude3Pricing.Haiku;
  const sonnet = claude3Pricing.Sonnet;
  const opus = claude3Pricing.Opus;

  simplifiedPrices.HaikuInputPerMTok = parseFloat(haiku.Input.perMTok.slice(1));
  simplifiedPrices.HaikuInputPerKTok = parseFloat(haiku.Input.perKTok.slice(1));
  simplifiedPrices.HaikuOutputPerMTok = parseFloat(
    haiku.Output.perMTok.slice(1)
  );
  simplifiedPrices.HaikuOutputPerKTok = parseFloat(
    haiku.Output.perKTok.slice(1)
  );

  simplifiedPrices.SonnetInputPerMTok = parseFloat(
    sonnet.Input.perMTok.slice(1)
  );
  simplifiedPrices.SonnetInputPerKTok = parseFloat(
    sonnet.Input.perKTok.slice(1)
  );
  simplifiedPrices.SonnetOutputPerMTok = parseFloat(
    sonnet.Output.perMTok.slice(1)
  );
  simplifiedPrices.SonnetOutputPerKTok = parseFloat(
    sonnet.Output.perKTok.slice(1)
  );

  simplifiedPrices.OpusInputPerMTok = parseFloat(opus.Input.perMTok.slice(1));
  simplifiedPrices.OpusInputPerKTok = parseFloat(opus.Input.perKTok.slice(1));
  simplifiedPrices.OpusOutputPerMTok = parseFloat(opus.Output.perMTok.slice(1));
  simplifiedPrices.OpusOutputPerKTok = parseFloat(opus.Output.perKTok.slice(1));

  return simplifiedPrices;
}

const simplifiedClaude3Prices = simplifyClaude3Prices(prices);
console.log(simplifiedClaude3Prices);

// create a function tha would output the object like one would say in english (all lower cased) haiku.input.permtok = 0.25 and so on across all groupings possible like output.perktok, output.permtok, input.perktok, input.permtok and so on... and permtok.output.haiku = 1.25 and so on...
function formatClaude3Prices(prices) {
  const formattedPrices = {};

  const claude3Pricing = prices['Claude 3 Pricing'];
  const haiku = claude3Pricing.Haiku;
  const sonnet = claude3Pricing.Sonnet;
  const opus = claude3Pricing.Opus;

  formattedPrices.haiku = {
    input: {
      permtok: parseFloat(haiku.Input.perMTok.slice(1)),
      perktok: parseFloat(haiku.Input.perKTok.slice(1)),
    },
    output: {
      permtok: parseFloat(haiku.Output.perMTok.slice(1)),
      perktok: parseFloat(haiku.Output.perKTok.slice(1)),
    },
  };

  formattedPrices.sonnet = {
    input: {
      permtok: parseFloat(sonnet.Input.perMTok.slice(1)),
      perktok: parseFloat(sonnet.Input.perKTok.slice(1)),
    },
    output: {
      permtok: parseFloat(sonnet.Output.perMTok.slice(1)),
      perktok: parseFloat(sonnet.Output.perKTok.slice(1)),
    },
  };

  formattedPrices.opus = {
    input: {
      permtok: parseFloat(opus.Input.perMTok.slice(1)),
      perktok: parseFloat(opus.Input.perKTok.slice(1)),
    },
    output: {
      permtok: parseFloat(opus.Output.perMTok.slice(1)),
      perktok: parseFloat(opus.Output.perKTok.slice(1)),
    },
  };

  return formattedPrices;
}

const formattedClaude3Prices = formatClaude3Prices(prices);
console.log(formattedClaude3Prices);

// per.mtok
// per.ktok
// per.output
// per.input
// per.model.haiku (etc)
// create a function that would output an object that would have the prices in the format of per.mtok, per.ktok, per.output, per.input, per.model.haiku (etc) and the values would be the prices in the object and all other like such make it efficient and easy to use in many computations later down the chain
function formatPrices(prices) {
  const formattedPrices = {
    per: { mtok: {}, ktok: {}, output: {}, input: {}, model: {} },
  };
  const claude3Pricing = formatClaude3Prices(prices);
  claude3Pricing;
  // Iterate over each pricing category
  for (const category in prices) {
    if (category !== 'Legacy Model Pricing') {
      const models = prices[category];

      // Iterate over each model in the category
      for (const model in models) {
        const modelData = models[model];

        // Create the model object if it doesn't exist
        if (!formattedPrices[model]) {
          formattedPrices[model] = {};
        }

        // Add the input and output prices to the model object
        formattedPrices[model].input = {};
        formattedPrices[model].output = {};

        if (modelData.Input) {
          formattedPrices[model].input.permtok = parseFloat(
            modelData.Input.perMTok.slice(1)
          );
          formattedPrices[model].input.perktok = parseFloat(
            modelData.Input.perKTok.slice(1)
          );
        }

        if (modelData.Output) {
          formattedPrices[model].output.permtok = parseFloat(
            modelData.Output.perMTok.slice(1)
          );
          formattedPrices[model].output.perktok = parseFloat(
            modelData.Output.perKTok.slice(1)
          );
        }
      }
    }
  }

  return formattedPrices;
}

const formattedPrices_ = formatPrices(prices);
console.log('formattedPrices', formattedPrices_);
// Input Object
const formattedPrices = {
  haiku: {
    input: { permtok: 0.25, perktok: 0.00025 },
    output: { permtok: 1.25, perktok: 0.00125 },
  },
  sonnet: {
    input: { permtok: 3, perktok: 0.003 },
    output: { permtok: 15, perktok: 0.015 },
  },
  opus: {
    input: { permtok: 15, perktok: 0.015 },
    output: { permtok: 75, perktok: 0.075 },
  },
};

// Function to create the desired object
function createFlexiblePriceObject(formattedPrices) {
  const result = {
    per: {
      mtok: {},
      ktok: {},
      input: {},
      output: {},
      model: {},
    },
  };

  for (const [model, data] of Object.entries(formattedPrices)) {
    for (const [type, prices] of Object.entries(data)) {
      for (const [unit, price] of Object.entries(prices)) {
        const unitKey = unit.slice(3); // Extract 'mtok' or 'ktok' from 'permtok' or 'perktok'
        if (!result.per[unitKey][model]) {
          result.per[unitKey][model] = {};
        }
        if (!result.per[type][model]) {
          result.per[type][model] = {};
        }
        if (!result.per.model[model]) {
          result.per.model[model] = {};
        }

        result.per[unitKey][model][type] = price;
        result.per[type][model][unitKey] = price;
        result.per.model[model][type] = result.per.model[model][type] || {};
        result.per.model[model][type][unitKey] = price;
      }
    }
  }
  return result;
}

// Create the output object
const flexiblePriceObject = createFlexiblePriceObject(formattedPrices);
flexiblePriceObject.per.model// Output the result
.console
  .log(JSON.stringify(flexiblePriceObject, null, 2));
