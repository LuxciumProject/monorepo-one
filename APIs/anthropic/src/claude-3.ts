const MTOK = 1000000;

let inttok = 5000;
let outtok = 2500;

const haiku_in = 0.25;
const haiku_out = 1.25;
const sonnet_out = 15;
const sonnet_in = 3;
const opus_out = 75;
const opus_in = 15;

const haiku = {
  in: haiku_in / MTOK,
  out: haiku_out / MTOK,
};

const sonnet = {
  in: sonnet_in / MTOK,
  out: sonnet_out / MTOK,
};

const opus = {
  in: opus_in / MTOK,
  out: opus_out / MTOK,
};

const inputCost = {
  haiku: haiku.in * MTOK,
  sonnet: sonnet.in * MTOK,
  opus: opus.in * MTOK,
};

const outputCost = {
  haiku: haiku.out * MTOK,
  sonnet: sonnet.out * MTOK,
  opus: opus.out * MTOK,
};

const claude3 = {
  rawValues: {
    haiku_in,
    haiku_out,
    sonnet_out,
    sonnet_in,
    opus_out,
    opus_in,
  },
  haiku,
  sonnet,
  opus,
  inputCost,
  outputCost,
};

const shellExample = `
curl https://api.anthropic.com/v1/messages \\
     --header "x-api-key: $ANTHROPIC_API_KEY" \\
     --header "anthropic-version: 2023-06-01" \\
     --header "content-type: application/json" \\
     --data \\
'{
    "model": "claude-3-opus-20240229",
    "max_tokens": 1024,
    "messages": [
        {"role": "user", "content": "Hello, world"}
    ]
}'
`;

const responseExample = `
{
  "content": [
    {
      "text": "Hi! My name is Claude.",
      "type": "text"
    }
  ],
  "id": "msg_013Zva2CMHLNnXjNJJKqJ2EF",
  "model": "claude-3-opus-20240229",
  "role": "assistant",
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "type": "message",
  "usage": {
    "input_tokens": 10,
    "output_tokens": 25
  }
}
`;
