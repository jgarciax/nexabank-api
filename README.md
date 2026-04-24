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

## API Reference

The base URL for all endpoints is `http://localhost:3000`.

---

### Accounts — `/cuenta`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/cuenta` | Returns all accounts with client and product information |
| `GET` | `/cuenta/:id` | Returns a single account by ID, including its transaction history |
| `GET` | `/cuenta/saldo` | Returns a summary of all accounts with balance, client name, product type, and interest rate |
| `GET` | `/cuenta/codigos-operacion` | Returns the full catalog of operation codes (`SELECT * FROM codigos_operacion`) |
| `PUT` | `/cuenta/:id` | Updates account fields (account number, status, balance) |
| `DELETE` | `/cuenta/:id` | Deletes an account by ID |

**PUT `/cuenta/:id` — Request body:**
```json
{
  "numero_cuenta": "001-001-001",
  "estatus": "ACTIVA",
  "saldo": 5000
}
```
*All fields are optional — only send what you want to update.*

---

### Transactions — `/transacciones`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/transacciones/create` | Creates a transaction (debit or credit) and updates the account balance |
| `POST` | `/transacciones/historial` | Returns the transaction history for a client within a date range |

**POST `/transacciones/create` — Request body:**
```json
{
  "numeroCuenta": "001-001-001",
  "fecha": "2026-04-24",
  "monto": 500,
  "codigoOperacionId": 1
}
```

**POST `/transacciones/historial` — Request body:**
```json
{
  "clienteId": 1,
  "fechaInicio": "2026-01-01",
  "fechaFin": "2026-04-30"
}
```

---

### Response Format

All endpoints return a consistent JSON structure:

```json
{
  "codigo_respuesta": 0,
  "descripcion_respuesta": "OK",
  "data": { }
}
```

| `codigo_respuesta` | Meaning |
|--------------------|---------|
| `0` | Success |
| `1` | Resource not found |
| `2` | Account inactive |
| `3` | Invalid operation code |
| `4` | Insufficient funds |
| `5` | Invalid date range |
| `99` | Internal server error |
