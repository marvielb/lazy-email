#!/bin/sh

HOST=email@nixlxc.box #set the aws.box IP in the /etc/hosts file.

# Install dependencies and build
npm install
npm run build

# Deploy built files (entire dist directory)
rsync -r --progress ./dist/ $HOST:
