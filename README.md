# @rocicorp/heap-snapshot

Takes a better snapshot of the v8 heap of a running process than what you get from `v8.writeSnapshot()`.

## Usage

1. kill -USR1 <pid-to-profile>
2. The process prints out a message like: `Debugger listening on ws://127.0.0.1:9229/a8712980-d35d-434f-824c-db212b277b5e`
3. `npx @rocicorp/heap-snapshot <that-url>`
