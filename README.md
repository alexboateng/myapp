<h1 align="center">Welcome 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
</p>

> An ICD API Endpoint Application

### ✨ [Demo](https://myapp-bklal.ondigitalocean.app/)

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Essential](#essential)

## About The Project

- RESTful API that can allow us to utilize an internationally recognized set of diagnosis codes.
- ● Create a new icd version
- ● Create a new diagnosis code record
- ● Edit an existing diagnosis code record
- ● List diagnosis codes in batches of 20 (and paginate through the rest of the record)
- ● Retrieve diagnosis codes by ID
- ● Delete a diagnosis code by ID

### Built With

This project utilizes the following underlisted technologies

- [Nodejs](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Mongodb](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

<!-- GETTING STARTED -->

## Getting Started

To get up and running with the project follow the instructions below

### Prerequisites

- Nodejs - download the latest version of nodejs from the official documentation depending on your os
  NB: use node version greater than 10

- npm

```sh
npm install npm@latest -g
```

- Mongo db Atlas - Required if you want to access database. Visit https://www.mongodb.com/cloud/atlas to download
### Installation

1. Clone the repo

```sh
git clone https://github.com/xelahaippa/myapp.git
```

2. Install all general dependencies

```sh
npm install or yarn install
```

## Usage

- Once everything is done properly run `npm start`
- Successful running of this command should spill out `connected, App running` in your terminal

## Sending API Response

### For API errors:

```JS
res.status(400).json({
    status: 'error',
    msg: "Your error message here",
});
```

### For Internal Server Errors and other unknown errors handle in a catch block as below

```JS
return res.status(422).json({
    status: 'error',
    msg: "Server error"
})
```

### For successful API request

```JS
res.json({
    status: 'success',
    msg: data,
});
```
