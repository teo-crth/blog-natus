BEGIN;

CREATE USER "teo" WITH PASSWORD "teo";
CREATE DATABASE IF NOT EXISTS 'Natus' OWNER "teo";

CREATE TABLE "client" ( 
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email" VARCHAR(255) NOT NULL,
    "firstname" VARCHAR(255) NOT NULL,
   "lastname" VARCHAR(255) NOT NULL,
    "password" TEXT,
    "birthday" DATE NOT NULL, 
    "phone_number" INT, 
    "address_id" INT --REFERENCES "address"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ 
);

CREATE TABLE "address" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "street_number" INT,
    "street_name" VARCHAR(255) NOT NULL,
    "zip_code" VARCHAR(5) NOT NULL, 
    "city" VARCHAR(255) NOT NULL, 
    "country" VARCHAR(255) NOT NULL, 
    "infos" TEXT, 
    "client_id" INT REFERENCES "client"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "books" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "author" VARCHAR(255) NOT NULL, 
    "resume" TEXT NOT NULL, 
    "price" INT NOT NULL, 
    "type" VARCHAR(255) NOT NULL, 
    "image" VARCHAR(255) NOT NULL, 
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ
);

COMMIT;

