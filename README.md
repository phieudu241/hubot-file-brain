# hubot-file-brain
A simple hubot brain for development that saves to a json file. Derived from file-brain.coffee by dustyburwell.

## Install
In your hubot instance, run the following:
```
npm install --save hubot-file-brain
```
and then add `hubot-file-brain` to `external-scripts.json`.

## Usage
When starting Hubot, provide a directory path via the environment variable `FILE_BRAIN_PATH`. This script will save Hubot state into a `brain-dump.json` file in the directory provided.
