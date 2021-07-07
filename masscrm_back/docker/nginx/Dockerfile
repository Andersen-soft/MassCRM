FROM nginx:1.21.0

RUN usermod -u 1000 www-data

RUN rm /etc/nginx/conf.d/default.conf
ADD docker/nginx/nginx.conf /etc/nginx/nginx.conf
ADD docker/nginx/server.conf /etc/nginx/conf.d/

COPY --chown=www-data:www-data . /var/www/
#RUN chown -R www-data:www-data /var/www
#COPY --from=php-fpm-7.4 /src /var/www/
EXPOSE 80
EXPOSE 443
