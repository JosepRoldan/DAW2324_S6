FROM node:18-alpine3.17 as build_stage
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

# Production stage
FROM ubuntu AS production_stage
RUN apt-get update && apt-get install apache2 -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
COPY --from=build_stage /app/dist /var/www/html/
EXPOSE 80
# Configure Apache to run in the foreground
CMD ["apache2ctl", "-D", "FOREGROUND"]