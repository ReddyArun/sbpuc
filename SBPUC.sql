create schema sbpuc;

DROP TABLE "student";
CREATE TABLE "student"
(
  id uuid NOT NULL,
  dob date,
  name character varying(250)  not null,
  rollnumber character varying(20),
  class character varying(5)  not null,
  puc1fee integer  not null default 0,
  puc2fee integer  not null default 0,
  mobile character varying(10)  not null,
  address text not null,
  sslcschooladdress character varying(250),
  sslcpercentage character varying(5),
  active bit default '1',
  CONSTRAINT student_id PRIMARY KEY (id)
);

DROP TABLE "studentfee";

CREATE TABLE "studentfee"
(
  studentfeeid uuid NOT NULL,
  studentid uuid NOT NULL,
  description character varying(250) NOT NULL,
  amount integer NOT NULL,
  paiddate date NOT NULL,
  CONSTRAINT studentfee_id PRIMARY KEY (studentfeeid),
  CONSTRAINT student_fee_relation FOREIGN KEY (studentid)
      REFERENCES student (id) MATCH SIMPLE
      ON UPDATE RESTRICT ON DELETE RESTRICT
);