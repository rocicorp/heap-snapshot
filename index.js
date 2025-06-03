#!/usr/bin/env node

import CDP from 'chrome-remote-interface';
import fs from 'fs';

async function takeHeapSnapshot(targetUrl) {
  if (!targetUrl) {
    console.error('❌ Error: Target URL is required.');
    console.log('Usage: npx @rocicorp/heap-profile <url>');
    process.exit(1);
  }

  let client;
  try {
    console.log(`🚀 Connecting to ${targetUrl}...`);
    client = await CDP({
      target: targetUrl,
    });
    const { HeapProfiler } = client;

    await HeapProfiler.enable();

    const chunks = [];

    HeapProfiler.on('addHeapSnapshotChunk', ({ chunk }) => {
      chunks.push(chunk);
    });

    console.log('📸 Taking heap snapshot...');
    await HeapProfiler.takeHeapSnapshot({ reportProgress: false });

    await HeapProfiler.disable();
    
    const snapshot = chunks.join('');
    const fileName = `heap-${new Date().toISOString().replace(/[:.]/g, '-')}.heapsnapshot`;
    fs.writeFileSync(fileName, snapshot);
    console.log(`✅ Heap snapshot saved to ${fileName}`);

  } catch (err) {
    console.error('❌ Error taking snapshot:', err.message);
    if (err.message && err.message.includes('ECONNREFUSED')) {
      console.error(`Hint: Ensure Chrome or a Node.js process is running with the debugger open at ${targetUrl}`);
      console.error('For Chrome, start it with a flag like: --remote-debugging-port=9222');
      console.error('For Node.js, start it with a flag like: --inspect=0.0.0.0:9229');
    }
    process.exitCode = 1; // Set exit code to indicate failure
  } finally {
    if (client) {
      try {
        await client.close();
        console.log('🚪 Connection closed.');
      } catch (closeErr) {
        console.error('⚠️ Error closing connection:', closeErr.message);
      }
    }
  }
}

const targetUrl = process.argv[2];
takeHeapSnapshot(targetUrl); 