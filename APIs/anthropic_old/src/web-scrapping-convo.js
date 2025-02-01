const Groq = require('groq-sdk');

const groq = new Groq();
async function main() {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          ' \n<tr class="">\n  <td\n    class="border-b-[0.5px] border-token-border-medium align-top pr-4 last:pr-0 [tr:last-child_&amp;]:border-b-0 text-left">\n    <div class="flex min-h-[40px] items-center [tr[data-disabled=true]_&amp;]:opacity-50"><a\n        href="/c/3587a1e8-45e4-4ae6-976d-652dbeca079d" rel="noreferrer"\n        class="inline-flex items-center gap-2 align-top text-blue-500 dark:text-blue-400"><svg\n          xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"\n          class="icon-md flex-shrink-0">\n          <path fill="currentColor" fill-rule="evenodd"\n            d="M12 4a8 8 0 0 0-5.687 13.627 1 1 0 0 1 .147 1.217L5.766 20H12a8 8 0 1 0 0-16M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10H4a1 1 0 0 1-.857-1.515l1.218-2.03A9.96 9.96 0 0 1 2 12"\n            clip-rule="evenodd"></path>\n        </svg>🫥🫨 Problem Cause Identification</a></div>\n  </td>\n  <td\n    class="border-b-[0.5px] border-token-border-medium align-top pr-4 last:pr-0 [tr:last-child_&amp;]:border-b-0 text-left">\n    <div class="flex min-h-[40px] items-center [tr[data-disabled=true]_&amp;]:opacity-50">5 août 2024</div>\n  </td>\n  <td\n    class="border-b-[0.5px] border-token-border-medium align-top pr-4 last:pr-0 [tr:last-child_&amp;]:border-b-0 text-right">\n    <div class="flex min-h-[40px] items-center [tr[data-disabled=true]_&amp;]:opacity-50 justify-end">\n      <div class="text-md flex items-center justify-end gap-2"><span class="" data-state="closed"><button\n            aria-label="Désarchiver la conversation"\n            class="cursor-pointer text-[18px] text-token-text-tertiary hover:text-token-text-secondary">Restore</button></span><span class="" data-state="closed"><button aria-label="Supprimer la conversation"\n            class="text-token-text-tertiary hover:text-token-text-secondary">Trash</button></span></div>\n    </div>\n  </td>\n</tr>',
      },
      {
        role: 'user',
        content:
          'The code provided was giving you the context where many tr are located inside the tbody I would like you to provide me the console code (chrome console javascript) to get the length (amount of or quantity of tr elements) before we do anything lets make sure we do have one (no more or no less tbody element)',
      },
      {
        role: 'assistant',
        content:
          "To get the length of `tr` elements inside the `tbody` using Chrome Console JavaScript, you can use the following code:\n\n```javascript\nconst tbody = document.querySelector('tbody');\nconst trLength = tbody.getElementsByTagName('tr').length;\nconsole.log(trLength);\n```\n\nThis code will select the first `tbody` element in the page, then count and log the number of `tr` elements inside it. You can replace `document.querySelector('tbody')` with the specific selector if you want to select a different `tbody` element.",
      },
      {
        role: 'user',
        content:
          "I do not want to use declared variables please lets continue from this bellow:\n\ndocument.getElementsByTagName('tbody').length\n1\ndocument.getElementsByTagName('tbody')[0].getElementsByTagName('tr').length\n3222\n\n",
      },
    ],
    model: 'mixtral-8x7b-32768',
    temperature: 1,
    max_tokens: 1024,
    top_p: 1,
    stream: true,
    stop: null,
  });

  for await (const chunk of chatCompletion) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

main();
