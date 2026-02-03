# Use the lightweight Nginx Alpine image
FROM nginx:stable-alpine

# Copy your static files (index.html, css, js) into the Nginx html directory
COPY . /usr/share/nginx/html

# Expose port 80 (standard for HTTP)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]