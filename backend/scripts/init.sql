-- init.sql
CREATE DATABASE admission_portal;

\c admission_portal;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "hstore";

-- Create custom types
CREATE TYPE user_role AS ENUM ('ADMIN', 'STAFF', 'STUDENT');
CREATE TYPE application_status AS ENUM ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED');
CREATE TYPE payment_status AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- Set timezone
SET timezone = 'UTC';

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone_number);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_payments_transaction ON payments(transaction_id);