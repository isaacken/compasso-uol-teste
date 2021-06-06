# UOL Compasso / Node.js Back-end developer test

## Configuration

- Requirements: Node.JS 10+ and npm/yarn; MongoDB.
- Run ```yarn``` or ```npm install``` command
- Create **.env** file on project root
- Register on **.env** DB_HOST, DB_PORT and DB_NAME informations from MongoDB
- Run ```yarn dev:serve``` or ```npm run dev:serve``` command

## Endpoints

### City

---

**Create**

POST _/cities/_ 

**BODY**
```json
{
	"name": "City Name",
	"state": "ST"
}
```

>name is required
>state is required

---

**Find**

GET _/cities/_ 

*Acceptable query params*
> - name (string)
> - state (string)

--- 

### Customer

---

**Create**

POST _/customers/_ 

**BODY**
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

**Find**

GET _/customers/_ 

*Acceptable query params*
> - name (string)
> - id (string)

---

**Remove**

DELETE _/customers/{id}_ 

>id must be a valid identificator from the database

---

**Update**

PUT _/customers/{id}_ 

**BODY**
```json
{
	"name": "John Doe"
}
```

>name is required
