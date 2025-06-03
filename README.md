# @rocicorp/heap-snapshot

It is often the case that we need to get a heap snapshot from running `zero-cache` processes.

Online guides and documentation suggest using the `chrome-remote-interface` package and then calling `v8.writeHeapSnapshot()`.

Doing this for `zero-cache` yields much smaller snapshots than those you get if you connect to the node process in Chrome's devtools and get a snapshot that way. These smaller snapshots lack many core classes of zero-cache such as `ViewSyncer`.

I do not understand why but ChatGPT suggests that the implementation of `v8.writeHeapSnapshot()` is different and simpler than the `HeapProfiler` class that Chrome itself uses, and misses some "uncommon" allocation patterns 😬.

This tool automates using the lower-level `HeapProfiler` class to create a dump that contains all of `zero-cache`'s objects.

## Usage

1. `kill -USR1 <pid-to-snapshot>`
2. The targetted process prints out a message like: `Debugger listening on ws://127.0.0.1:9229/a8712980-d35d-434f-824c-db212b277b5e`
3. `npx @rocicorp/heap-snapshot <that-url>`
