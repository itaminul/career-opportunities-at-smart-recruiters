# Job Application Management API

A NestJS-based RESTful API to manage online job applications. This system allows candidates to apply by uploading PDF resumes, automatically extracts and stores candidate data in a PostgreSQL database, and tracks candidate progress through multiple stages such as scrutiny, selection, interview call, and final selection.

## 🚀 Features

- Upload PDF resume files
- Parse and extract data from PDFs (e.g., name, email, skills)
- Store extracted data in PostgreSQL using TypeORM
- Manage candidate application stages:
  - Scrutiny
  - Selected for next round
  - Called for interview
  - Final selection
- Notifications/logs per stage (e.g., email or console for now)
- REST API endpoints for CRUD operations

## 🛠️ Tech Stack

- [NestJS](https://nestjs.com/) – Node.js framework
- [TypeORM](https://typeorm.io/) – ORM for PostgreSQL
- [PostgreSQL](https://www.postgresql.org/) – Database
- [multer](https://www.npmjs.com/package/multer) – File uploads
- [pdf-parse](https://www.npmjs.com/package/pdf-parse) – PDF data extraction

## 📦 Installation

```bash
git clone https://github.com/itaminul/career-opportunities-at-smart-recruiters.git
cd job-application-api
npm install
