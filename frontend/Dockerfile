# Build stage
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install --verbose
COPY . ./
RUN npm run build

# Production stage
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
