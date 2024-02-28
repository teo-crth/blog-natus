BEGIN;

CREATE USER "teo" WITH PASSWORD "teo";
CREATE DATABASE IF NOT EXISTS Natus OWNER "teo";

CREATE TABLE "client" ( 
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
   "lastname" TEXT NOT NULL,
    "password" TEXT,
    "birthday" date NOT NULL, 
    "phone_number" INT, 
    "address_id" INT --REFERENCES "address"("id"),
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz
);

CREATE TABLE "address" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "street_number" INT,
    "street_name" TEXT NOT NULL,
    "zip_code" VARCHAR(5) NOT NULL, 
    "city" TEXT NOT NULL, 
    "country" TEXT NOT NULL, 
    "infos" TEXT, 
    "client_id" INT REFERENCES "client"("id"),
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz
);

CREATE TABLE "books" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL, 
    "resume" TEXT NOT NULL, 
    "price" INT, 
    "type" TEXT NOT NULL, 
    "image" TEXT NOT NULL, 
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz
);

COMMIT;

