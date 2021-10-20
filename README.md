# Compasso UOL / Node.js Back-end developer test

## Configuration

- Requirements: Node.JS 10+ and npm/yarn; MongoDB.
- Run ```yarn``` or ```npm install``` command
- Create **.env** file on project root
- Register on **.env** DB_HOST, DB_PORT and DB_NAME informations from MongoDB
- Run ```yarn dev:serve``` or ```npm run dev:serve``` command

## Endpoints

### City

**CREATE**

POST _/cities/_ 

**body**
```json
{
	"name": "City Name",
	"state": "ST"
}
```

>name is required
>state is required

---

**FIND**

GET _/cities/_ 

*Acceptable query params*
> - name (string)
> - state (string)

--- 

### Customer

**CREATE**

POST _/customers/_ 

**body**
```json
{
	"name": "John Doe",
	"gender": "M",
	"birthDate": "1998-10-01", 
	"cityId": "60bacf14ded6e7a4ed0a2439"
}
```

>name is required
>gender must be "M", "F" or ""
>birthDate must be in format YYYY-MM-DD

---

**FIND**

GET _/customers/_ 

*Acceptable query params*
> - name (string)
> - id (string)

---

**REMOVE**

DELETE _/customers/{id}_ 

>id must be a valid identificator from the database

---

**UPDATE**

PUT _/customers/{id}_ 

**body**
```json
{
	"name": "John Doe"
}
```

>name is required
