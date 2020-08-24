FROM node:12.18.0-stretch as builder
WORKDIR /front
ADD . /front/
RUN npm install
RUN ls -la
RUN npm run build:prod
FROM nginx:1.15
RUN usermod -u 1000 www-data
COPY --from=builder --chown=www-data:www-data /front /var/www
RUN usermod -u 1000 www-data
RUN rm /etc/nginx/conf.d/default.conf
ADD docker/nginx.conf /etc/nginx/nginx.conf
ADD docker/server.conf /etc/nginx/conf.d/
#RUN chown -R www-data:www-data /var/www

EXPOSE 80
EXPOSE 443

