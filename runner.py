from fastapi import FastAPI, requests
import uvicorn
from pydantic import BaseModel


app = FastAPI(
	title="Rabeens VRS",
    description="Rabeens VRS",
    version="0.0.1",
    terms_of_service="http://rabeens.com/vhs/terms/",
    contact={
        "name": "Rabeens Support Team",
        "url": "http://rabeens.com/contact/",
        "email": "support@rabeens.com",
    },
    license_info={
        "name": "RSL 0.0.1",
        "url": "https://www.rabeens.com/licenses/LICENSE-2.0.html",
    },
)

class BookingModel(BaseModel):
	purpose :str
	startDateRequest: str
	endDateRequest: str
	travelSource: str
	travelDestination: str
	expectedTravelRoute: str = None
	expectedTravelDistance: int = None
	isDriverRequired: str
	numOfPassangers: str
	namePassanger1: str = None
	namePassanger2: str = None
	namePassanger3: str = None
	namePassanger4: str = None
	namePassanger5: str = None


class UserModel(BaseModel):
	firstName:str
	lastName: str
	email: str
	contactNumber:str

class SignInModel(BaseModel):
	username:str
	password: str
	


@app.get("/", tags=["general"])
def main():
	return "test"
	
@app.post("/signin", tags=["general"])
async def signin(data:SignInModel):
	return {"status":200, "msg":data.username }
	
@app.get("/myRequests", tags=["general"])
async def myRequests(start_ts:str=None, end_ts:str=None, ):
	return "My requests"

@app.get("/myActiveRentals", tags=["general"])
async def myActiveRentals(start_ts:str=None, end_ts:str=None, ):
	return "My active Rentals"
	
@app.post("/booking", tags=["general"])
async def booking(details:BookingModel ):
	return "add bookings"







@app.get("/users", tags=["admin"])
async def users_list(start_ts:str=None, end_ts:str=None, ):
	return "add bookings"

@app.post("/users/{user_id}", tags=["admin"])
async def users_add(user_id:str, user_details: UserModel):
	return "add bookings"
	
@app.put("/users/{user_id}", tags=["admin"])
async def users_put(user_id:str, user_details: UserModel ):
	return "add bookings"

@app.delete("/users/{user_id}", tags=["admin"])
async def users_del(user_id:str=None ):
	return "delete bookings"
	

@app.get("/holidays", tags=["admin"])
async def users_list(start_ts:str=None, end_ts:str=None, ):
	return "add bookings"

@app.post("/holidays/{id}", tags=["admin"])
async def users_add(id:str, user_details: UserModel):
	return "add bookings"
	
@app.put("/holidays/{_id}", tags=["admin"])
async def users_put(user_id:str, user_details: UserModel ):
	return "add bookings"

@app.delete("/users/{user_id}", tags=["admin"])
async def users_del(user_id:str=None ):
	return "delete bookings"
	

if __name__=="__main__":
	uvicorn.run(app, host="0.0.0.0", port=8000, debug = True)