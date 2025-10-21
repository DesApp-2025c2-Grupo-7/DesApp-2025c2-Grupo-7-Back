--
-- PostgreSQL database dump
--

\restrict mNnvSZfORdUSnBAtS1CCOvtX4DzsrATtL0uewtq1XBjFJJ0egvMmKLl5uoCwqHM

-- Dumped from database version 15.14 (Debian 15.14-1.pgdg13+1)
-- Dumped by pg_dump version 15.14 (Debian 15.14-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: personas_tipopersona_enum; Type: TYPE; Schema: public; Owner: devuser
--

CREATE TYPE public.personas_tipopersona_enum AS ENUM (
    'AFILIADO',
    'INTEGRANTE'
);


ALTER TYPE public.personas_tipopersona_enum OWNER TO devuser;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: direcciones; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.direcciones (
    id integer NOT NULL,
    calle character varying NOT NULL,
    numero character varying NOT NULL,
    localidad character varying NOT NULL,
    "codigoPostal" character varying NOT NULL,
    "prestadorId" integer
);


ALTER TABLE public.direcciones OWNER TO devuser;

--
-- Name: direcciones-personas; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public."direcciones-personas" (
    id integer NOT NULL,
    calle character varying NOT NULL,
    numero character varying NOT NULL,
    localidad character varying NOT NULL,
    "codigoPostal" character varying NOT NULL,
    "personaId" integer NOT NULL
);


ALTER TABLE public."direcciones-personas" OWNER TO devuser;

--
-- Name: direcciones-personas_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public."direcciones-personas_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."direcciones-personas_id_seq" OWNER TO devuser;

--
-- Name: direcciones-personas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public."direcciones-personas_id_seq" OWNED BY public."direcciones-personas".id;


--
-- Name: direcciones_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.direcciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.direcciones_id_seq OWNER TO devuser;

--
-- Name: direcciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.direcciones_id_seq OWNED BY public.direcciones.id;


--
-- Name: especialidades; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.especialidades (
    id integer NOT NULL,
    nombre character varying NOT NULL
);


ALTER TABLE public.especialidades OWNER TO devuser;

--
-- Name: especialidades_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.especialidades_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.especialidades_id_seq OWNER TO devuser;

--
-- Name: especialidades_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.especialidades_id_seq OWNED BY public.especialidades.id;


--
-- Name: grupos_familiares; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.grupos_familiares (
    credencial character varying(50) NOT NULL,
    "planMedico" character varying(50) NOT NULL,
    estado character varying DEFAULT 'Activo'::character varying NOT NULL,
    "fechaAlta" date NOT NULL,
    "fechaBaja" date
);


ALTER TABLE public.grupos_familiares OWNER TO devuser;

--
-- Name: horarios_atencion; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.horarios_atencion (
    id integer NOT NULL,
    dia character varying NOT NULL,
    desde character varying NOT NULL,
    hasta character varying NOT NULL,
    "duracionTurno" character varying NOT NULL,
    "direccionId" integer
);


ALTER TABLE public.horarios_atencion OWNER TO devuser;

--
-- Name: horarios_atencion_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.horarios_atencion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.horarios_atencion_id_seq OWNER TO devuser;

--
-- Name: horarios_atencion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.horarios_atencion_id_seq OWNED BY public.horarios_atencion.id;


--
-- Name: personas; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.personas (
    id integer NOT NULL,
    credencial character varying(50) NOT NULL,
    sufijo character varying(10) NOT NULL,
    "tipoPersona" public.personas_tipopersona_enum NOT NULL,
    "tipoDocumento" character varying(20) NOT NULL,
    "numeroDocumento" character varying(20) NOT NULL,
    nombre character varying NOT NULL,
    apellido character varying NOT NULL,
    "fechaNacimiento" date,
    telefono json,
    email json,
    parentesco character varying,
    "grupoFamiliarId" character varying NOT NULL,
    "planMedico" character varying,
    "fechaAlta" date NOT NULL,
    "fechaBaja" date
);


ALTER TABLE public.personas OWNER TO devuser;

--
-- Name: personas_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.personas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.personas_id_seq OWNER TO devuser;

--
-- Name: personas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.personas_id_seq OWNED BY public.personas.id;


--
-- Name: prestadores; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.prestadores (
    id integer NOT NULL,
    "numeroCUIL" character varying(11) NOT NULL,
    "nombreCompleto" character varying NOT NULL,
    "esProfesionalIndependiente" boolean DEFAULT false NOT NULL,
    telefono json,
    email json
);


ALTER TABLE public.prestadores OWNER TO devuser;

--
-- Name: prestadores_especialidades_especialidades; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.prestadores_especialidades_especialidades (
    "prestadoresId" integer NOT NULL,
    "especialidadesId" integer NOT NULL
);


ALTER TABLE public.prestadores_especialidades_especialidades OWNER TO devuser;

--
-- Name: prestadores_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.prestadores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.prestadores_id_seq OWNER TO devuser;

--
-- Name: prestadores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.prestadores_id_seq OWNED BY public.prestadores.id;


--
-- Name: situaciones_terapeuticas; Type: TABLE; Schema: public; Owner: devuser
--

CREATE TABLE public.situaciones_terapeuticas (
    id integer NOT NULL,
    diagnostico character varying,
    "fechaInicio" date,
    "fechaFin" date,
    "personaId" integer NOT NULL
);


ALTER TABLE public.situaciones_terapeuticas OWNER TO devuser;

--
-- Name: situaciones_terapeuticas_id_seq; Type: SEQUENCE; Schema: public; Owner: devuser
--

CREATE SEQUENCE public.situaciones_terapeuticas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.situaciones_terapeuticas_id_seq OWNER TO devuser;

--
-- Name: situaciones_terapeuticas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: devuser
--

ALTER SEQUENCE public.situaciones_terapeuticas_id_seq OWNED BY public.situaciones_terapeuticas.id;


--
-- Name: direcciones id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.direcciones ALTER COLUMN id SET DEFAULT nextval('public.direcciones_id_seq'::regclass);


--
-- Name: direcciones-personas id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public."direcciones-personas" ALTER COLUMN id SET DEFAULT nextval('public."direcciones-personas_id_seq"'::regclass);


--
-- Name: especialidades id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.especialidades ALTER COLUMN id SET DEFAULT nextval('public.especialidades_id_seq'::regclass);


--
-- Name: horarios_atencion id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.horarios_atencion ALTER COLUMN id SET DEFAULT nextval('public.horarios_atencion_id_seq'::regclass);


--
-- Name: personas id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.personas ALTER COLUMN id SET DEFAULT nextval('public.personas_id_seq'::regclass);


--
-- Name: prestadores id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.prestadores ALTER COLUMN id SET DEFAULT nextval('public.prestadores_id_seq'::regclass);


--
-- Name: situaciones_terapeuticas id; Type: DEFAULT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.situaciones_terapeuticas ALTER COLUMN id SET DEFAULT nextval('public.situaciones_terapeuticas_id_seq'::regclass);


--
-- Data for Name: direcciones; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.direcciones (id, calle, numero, localidad, "codigoPostal", "prestadorId") FROM stdin;
3	Estanislao del Campo	478	Morón	1706	3
4	Libertad	610	Moreno	1744	3
\.


--
-- Data for Name: direcciones-personas; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public."direcciones-personas" (id, calle, numero, localidad, "codigoPostal", "personaId") FROM stdin;
1	Malaespina	123	Caba	1677	3
2	Malarredo	1245	Caba	1688	3
3	Estanislao del Campo	478	Morón	1706	8
4	Libertad	610	Moreno	1744	8
5	Av. Siempre Viva	742	Springfield	1000	14
6	Av. Siempre Viva	742	Springfield	1000	15
\.


--
-- Data for Name: especialidades; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.especialidades (id, nombre) FROM stdin;
1	Cardiología
2	Nutrición
3	Odontología
4	Kinesiología
5	Fisiatría
6	Terapia Ocupacional
7	Traumatología
\.


--
-- Data for Name: grupos_familiares; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.grupos_familiares (credencial, "planMedico", estado, "fechaAlta", "fechaBaja") FROM stdin;
GRUPO002	Plan Premium	Activo	2025-10-13	\N
000001	Plata	Activo	2025-10-16	\N
00000001	Plata	Activo	1999-03-17	\N
00000002	Oro	Activo	2025-10-16	\N
\.


--
-- Data for Name: horarios_atencion; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.horarios_atencion (id, dia, desde, hasta, "duracionTurno", "direccionId") FROM stdin;
3	Viernes	07:30	18:00	15 minutos	3
5	Saturday	09:00	17:00	30	4
\.


--
-- Data for Name: personas; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.personas (id, credencial, sufijo, "tipoPersona", "tipoDocumento", "numeroDocumento", nombre, apellido, "fechaNacimiento", telefono, email, parentesco, "grupoFamiliarId", "planMedico", "fechaAlta", "fechaBaja") FROM stdin;
1	GRUPO002	01	AFILIADO	DNI	40666777	Carlos	Pérez	1982-06-10	["1122334455"]	["carlos.perez@example.com"]	\N	GRUPO002	Plan Premium	2025-10-13	\N
3	000001	00	AFILIADO	DNI	20543765	Alfonso	Gomez	1968-11-15	["1153447698","1143579011"]	["ag@hotmail.com"]	Titular	000001	Plata	2025-10-16	\N
8	00000001	01	AFILIADO	DNI	32822776	Marcelo	Valdez	1987-03-17	["1137707882","2374621631"]	["mar.celo@gmail.com","marcelojvaldez.1703@gmail.com"]	Titular	00000001	Plata	1999-03-17	2030-03-17
14	00000002	01	AFILIADO	DNI	40123456	Cristobal	Verto	1980-07-15	["1156789012"]	["juan.perez@gmail.com"]	Titular	00000002	Oro	2025-10-16	\N
15	00000002	02	INTEGRANTE	DNI	40123457	Ana	Verto	2010-03-10	["1167890123"]	["ana.perez@gmail.com"]	Hija	00000002	Oro	2025-10-16	\N
\.


--
-- Data for Name: prestadores; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.prestadores (id, "numeroCUIL", "nombreCompleto", "esProfesionalIndependiente", telefono, email) FROM stdin;
3	27328227768	Marcelo Valdez	t	["1144445555","1144445556"]	["mar.celo@gmail.com"]
\.


--
-- Data for Name: prestadores_especialidades_especialidades; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.prestadores_especialidades_especialidades ("prestadoresId", "especialidadesId") FROM stdin;
\.


--
-- Data for Name: situaciones_terapeuticas; Type: TABLE DATA; Schema: public; Owner: devuser
--

COPY public.situaciones_terapeuticas (id, diagnostico, "fechaInicio", "fechaFin", "personaId") FROM stdin;
1	Estrés laboral	2025-10-01	2026-10-01	1
2	Asma	2025-10-16	\N	3
3	Hipertension	2025-10-16	\N	3
4	Diabetes	2000-08-01	\N	8
\.


--
-- Name: direcciones-personas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public."direcciones-personas_id_seq"', 6, true);


--
-- Name: direcciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.direcciones_id_seq', 4, true);


--
-- Name: especialidades_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.especialidades_id_seq', 8, true);


--
-- Name: horarios_atencion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.horarios_atencion_id_seq', 37, true);


--
-- Name: personas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.personas_id_seq', 16, true);


--
-- Name: prestadores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.prestadores_id_seq', 3, true);


--
-- Name: situaciones_terapeuticas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: devuser
--

SELECT pg_catalog.setval('public.situaciones_terapeuticas_id_seq', 4, true);


--
-- Name: personas PK_714aa5d028f8f3e6645e971cecd; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.personas
    ADD CONSTRAINT "PK_714aa5d028f8f3e6645e971cecd" PRIMARY KEY (id);


--
-- Name: especialidades PK_73c2740deb4cbe08c28ac487705; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.especialidades
    ADD CONSTRAINT "PK_73c2740deb4cbe08c28ac487705" PRIMARY KEY (id);


--
-- Name: situaciones_terapeuticas PK_7991787168c63e31229e3e93025; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.situaciones_terapeuticas
    ADD CONSTRAINT "PK_7991787168c63e31229e3e93025" PRIMARY KEY (id);


--
-- Name: direcciones PK_7c30291ec345d647f94086e676d; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.direcciones
    ADD CONSTRAINT "PK_7c30291ec345d647f94086e676d" PRIMARY KEY (id);


--
-- Name: direcciones-personas PK_9945359fc79e0f736d86f70512d; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public."direcciones-personas"
    ADD CONSTRAINT "PK_9945359fc79e0f736d86f70512d" PRIMARY KEY (id);


--
-- Name: grupos_familiares PK_9bd1d0303a9691550c464eb57ce; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.grupos_familiares
    ADD CONSTRAINT "PK_9bd1d0303a9691550c464eb57ce" PRIMARY KEY (credencial);


--
-- Name: prestadores PK_c67c98247c1146e888d82fe1f1a; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.prestadores
    ADD CONSTRAINT "PK_c67c98247c1146e888d82fe1f1a" PRIMARY KEY (id);


--
-- Name: horarios_atencion PK_e029febcc71796081d8a93ac028; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.horarios_atencion
    ADD CONSTRAINT "PK_e029febcc71796081d8a93ac028" PRIMARY KEY (id);


--
-- Name: prestadores_especialidades_especialidades PK_fa0120668a543a9b35cc78fef1c; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.prestadores_especialidades_especialidades
    ADD CONSTRAINT "PK_fa0120668a543a9b35cc78fef1c" PRIMARY KEY ("prestadoresId", "especialidadesId");


--
-- Name: personas UQ_a01e59cdd9f8c1e217b3f960729; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.personas
    ADD CONSTRAINT "UQ_a01e59cdd9f8c1e217b3f960729" UNIQUE (credencial, sufijo);


--
-- Name: especialidades UQ_e86aa92137833eed8ba2656dbc0; Type: CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.especialidades
    ADD CONSTRAINT "UQ_e86aa92137833eed8ba2656dbc0" UNIQUE (nombre);


--
-- Name: IDX_6f950ac2bded57ff9ea8c3b80b; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX "IDX_6f950ac2bded57ff9ea8c3b80b" ON public.prestadores_especialidades_especialidades USING btree ("especialidadesId");


--
-- Name: IDX_abaec8e0d9b7143a18a06ee740; Type: INDEX; Schema: public; Owner: devuser
--

CREATE INDEX "IDX_abaec8e0d9b7143a18a06ee740" ON public.prestadores_especialidades_especialidades USING btree ("prestadoresId");


--
-- Name: direcciones FK_5d2459ce63b0514dec8a4e23ad8; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.direcciones
    ADD CONSTRAINT "FK_5d2459ce63b0514dec8a4e23ad8" FOREIGN KEY ("prestadorId") REFERENCES public.prestadores(id) ON DELETE CASCADE;


--
-- Name: prestadores_especialidades_especialidades FK_6f950ac2bded57ff9ea8c3b80b3; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.prestadores_especialidades_especialidades
    ADD CONSTRAINT "FK_6f950ac2bded57ff9ea8c3b80b3" FOREIGN KEY ("especialidadesId") REFERENCES public.especialidades(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: situaciones_terapeuticas FK_93cffb2ba76b5a7cc05371fbf34; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.situaciones_terapeuticas
    ADD CONSTRAINT "FK_93cffb2ba76b5a7cc05371fbf34" FOREIGN KEY ("personaId") REFERENCES public.personas(id) ON DELETE CASCADE;


--
-- Name: prestadores_especialidades_especialidades FK_abaec8e0d9b7143a18a06ee740a; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.prestadores_especialidades_especialidades
    ADD CONSTRAINT "FK_abaec8e0d9b7143a18a06ee740a" FOREIGN KEY ("prestadoresId") REFERENCES public.prestadores(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: personas FK_cd64d621dcf5bab462c50674c17; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.personas
    ADD CONSTRAINT "FK_cd64d621dcf5bab462c50674c17" FOREIGN KEY ("grupoFamiliarId") REFERENCES public.grupos_familiares(credencial);


--
-- Name: horarios_atencion FK_d7f420168b2b48d352e66f47664; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public.horarios_atencion
    ADD CONSTRAINT "FK_d7f420168b2b48d352e66f47664" FOREIGN KEY ("direccionId") REFERENCES public.direcciones(id) ON DELETE CASCADE;


--
-- Name: direcciones-personas FK_fd17f2ec6adb584e070c92c97f8; Type: FK CONSTRAINT; Schema: public; Owner: devuser
--

ALTER TABLE ONLY public."direcciones-personas"
    ADD CONSTRAINT "FK_fd17f2ec6adb584e070c92c97f8" FOREIGN KEY ("personaId") REFERENCES public.personas(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict mNnvSZfORdUSnBAtS1CCOvtX4DzsrATtL0uewtq1XBjFJJ0egvMmKLl5uoCwqHM

