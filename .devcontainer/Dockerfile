# Use node as the base image
FROM node:24-trixie

# Install veta
COPY --from=varavel/veta:0.1.0-alpha.3 /usr/local/bin/veta /usr/local/bin/veta

# Set environment variables
ENV \
  DEBIAN_FRONTEND="noninteractive" \
  PIP_BREAK_SYSTEM_PACKAGES=1

RUN set -e && \
  # Update and install system dependencies
  apt-get update -qq && \
  apt-get install -yqq --no-install-recommends \
  ca-certificates wget curl zip unzip p7zip-full tzdata git tree ripgrep \
  python3 python3-pip && \
  # Install tools from npm
  npm install --global @go-task/cli@3.51.1 && \
  npm install --global dprint@0.55.1 && \
  # Git config
  git config --global --add safe.directory '*' && \
  # Cleanup
  npm cache clean --force && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Command just to keep the container running
CMD ["sleep", "infinity"]
