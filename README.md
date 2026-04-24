<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# NexaBank API

NexaBank API is a robust backend system developed with [NestJS](https://nestjs.com/) and TypeScript, designed to manage the core banking operations of a financial institution. 

The project provides a solid architecture for handling clients, bank accounts, financial products, and secure transaction processing.

## Key Features

- **Transaction Processing:** Creation and validation of banking operations (debits and credits) with strict controls for insufficient funds and account validation.
- **Balance Inquiry:** Real-time balance retrieval for active accounts linked to clients and their respective financial products.
- **Transaction History:** Detailed account statements filtered by client and specific date ranges.
- **Relational Database:** SQL database structure managed via **TypeORM** to ensure data integrity and relationships.

## Technologies & Tools

- **Framework:** NestJS (Node.js)
- **Language:** TypeScript
- **ORM:** TypeORM
- **Database:** MySQL
- **Validation:** class-validator & class-transformer

## Data Structure (Entities)

The system operates on a relational model that includes:
- `Cliente`: Personal information (ID, full name, date of birth, gender, country).
- `Producto`: Catalog of financial products (interest rates, calculation methods, types).
- `Cuenta`: An instance of a product acquired by a client, which tracks the current balance and account status.
- `Transaccion`: Immutable record of every financial movement.
- `CodigoOperacion`: Catalog of transaction types (e.g., deposits, withdrawals, debits, credits).

## ⚙️ Local Environment Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/en/) installed.
- MySQL database running (local or cloud).

### 2. Install Dependencies

```bash
$ npm install
```

### 3. Environment Variables

Make sure to create an `.env` file in the root of the project to set up your database credentials:

```env
DB_HOST=your_mysql_host
DB_PORT=26368 # Or the port you are using
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
```

## 🏃 Running the Application

```bash
# regular mode
$ npm run start

# watch mode (Recommended for development)
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Main Endpoints

All base endpoints are routed through the transactions controller:

- `POST /transacciones/create`  
  *Creates a transaction (e.g., deposit or withdrawal) and updates the target account's balance.*
- `GET /transacciones/saldos`  
  *Retrieves a general summary of all accounts, including client information, product details, and current balance.*
- `POST /transacciones/historial`  
  *Returns the transaction history for a specific client within a given date range.*
