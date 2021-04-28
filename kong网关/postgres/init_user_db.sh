#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    create role kong;
    create database kong owner kong;
    alter role kong with encrypted password '123123';
    alter role kong with LOGIN;
    create role konga;
    create database konga owner konga;
    alter role konga with encrypted password '123123';
    alter role konga with LOGIN;
EOSQL