#########
# TOOLS #
#########

# Use node as the base image
FROM node:26.11.1-trixie as tools

# Install veta
COPY --from=varavel/veta:0.1.1 /usr/local/bin/veta /usr/local/bin/veta

# Install dprint
COPY --from=ghcr.io/varavelio/container-tools/dprint:0.63.0 /usr/local/bin/dprint /usr/local/bin/dprint

# Install task
COPY --from=ghcr.io/varavelio/container-tools/task:3.54.0 /usr/local/bin/task /usr/local/bin/task

# Environment variables
ENV PIP_BREAK_SYSTEM_PACKAGES=1

# Build time variables
ARG DEBIAN_FRONTEND=noninteractive

RUN set -e && \
  # Update and install system dependencies
  apt-get update -qq && \
  apt-get install -yqq --no-install-recommends \
  ca-certificates wget curl zip unzip p7zip-full tzdata git tree ripgrep \
  python3 python3-pip && \
  rm -rf /var/lib/apt/lists/* && \
  # Install tools from npm
  npm install --global svgo@4.0.1 && \
  npm cache clean --force &&  \
  # Git config
  git config --system --add safe.directory '*'

WORKDIR /workspaces/veta-theme-vara

################
# DEVCONTAINER #
################

FROM tools AS devcontainer

CMD ["sleep", "infinity"]
