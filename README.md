# @rocicorp/heap-snapshot

For reasons I don't entirely understand the snapshots from the `v8.writeHeapSnapshot()` API that is accessible via `chrome-remote-interface` lack many Zero objects that are found via the `HeapProfiler` interface's dumps.

This tool automates using `HeapProfiler` to create a dump via CLI.

## Usage

1. kill -USR1 <pid-to-profile>
2. The process prints out a message like: `Debugger listening on ws://127.0.0.1:9229/a8712980-d35d-434f-824c-db212b277b5e`
3. `npx @rocicorp/heap-snapshot <that-url>`
