CREATE EXTENSION IF NOT EXISTS "uuid-ossp";




CREATE TABLE IF NOT EXISTS sfs45_cape
(
    id uuid NOT NULL DEFAULT uuid_generate_v4 (),
    first_name character varying(255) COLLATE pg_catalog."default",
    last_name character varying(255) COLLATE pg_catalog."default",
    drivers_license character varying(255) COLLATE pg_catalog."default",
    plate character varying(255) COLLATE pg_catalog."default",
    make character varying(255) COLLATE pg_catalog."default",
    model character varying(255) COLLATE pg_catalog."default",
    state character varying COLLATE pg_catalog."default",
    date timestamp,
    CONSTRAINT sfs45_cape_pkey PRIMARY KEY (id)
);

-- TABLESPACE pg_default;

-- ALTER TABLE IF EXISTS sfs45_cape
--     OWNER to postgres;

CREATE TABLE IF NOT EXISTS users
(
    id uuid NOT NULL DEFAULT uuid_generate_v4 (),
    admin boolean NOT NULL DEFAULT false,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    user_name character varying(25) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id),
    user_base jsonb
)

-- TABLESPACE pg_default;

-- ALTER TABLE IF EXISTS users
--     OWNER to postgres;