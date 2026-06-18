import fs from 'fs/promises';
import { Buffer } from 'buffer';

const screens = [
  { name: 'letter_drop.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzJiYzQ5YzhjZjJjNjQ4NjY4ZWQyMjI5ZTNkNzE2MGU2EgsSBxCz17uC9hQYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzE3NTI5OTgyNTQ0NDY5NDM3Ng&filename=&opi=89354086' },
  { name: 'learning_path.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2ViMmQ1MjI1N2M1ZjQzMmZhN2Q4ODdmMjJlYmI1MDgzEgsSBxCz17uC9hQYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzE3NTI5OTgyNTQ0NDY5NDM3Ng&filename=&opi=89354086' },
  { name: 'welcome.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2VjZjkzMmU4MDEzMDRkMjQ5NTRlMjZkZmQ2NmY3ZTU5EgsSBxCz17uC9hQYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzE3NTI5OTgyNTQ0NDY5NDM3Ng&filename=&opi=89354086' },
  { name: 'progress.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzYyYTY3Mjg0YjMzODRlZTBhZTIwZTZjZmM1OWQwYWJiEgsSBxCz17uC9hQYAZIBJAoKcHJvamVjdF9pZBIWQhQxMzE3NTI5OTgyNTQ0NDY5NDM3Ng&filename=&opi=89354086' }
];

async function main() {
  for (const screen of screens) {
    console.log(`Downloading ${screen.name}...`);
    const res = await fetch(screen.url);
    const html = await res.text();
    await fs.writeFile(screen.name, html);
    console.log(`Saved ${screen.name}`);
  }
}

main().catch(console.error);
