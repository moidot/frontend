# Stage 1: Install dependencies
FROM node:18-alpine AS deps

WORKDIR /usr/app

# Copy only package.json and yarn.lock to leverage Docker cache
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Stage 2: Build the application
FROM deps AS builder

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Stage 3: Create the final image
FROM node:18-alpine AS final

WORKDIR /usr/app

# Copy only necessary files from the builder stage
COPY --from=builder /usr/app/package.json /usr/app/yarn.lock ./
COPY --from=builder /usr/app/.next ./.next
COPY --from=builder /usr/app/public ./public

# Expose the port
EXPOSE 3000

# Command to run the application
CMD ["yarn", "start"]
