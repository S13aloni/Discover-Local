from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse
from typer.cli import state

from .serializers import RegisterSerializer, LoginSerializer, DriverSerializer, CabSerializer, TransactionSerializer, \
    StaticPackageSerializer
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import User, Token, Review, Driver, Cab, Transaction, StaticPackage
import uuid
import bcrypt
from .models import HiddenGem
from .serializers import HiddenGemSerializer ,ReviewSerializer
from django.http import Http404
from .models import Guide, CustomPackage, BookingHistory
from .serializers import GuideSerializer, CustomPackageSerializer, BookingHistorySerializer
from .permissions import IsAdminUser, IsAuthenticatedUser
from datetime import datetime, timedelta
from rest_framework.permissions import AllowAny
from .models import User, OTP
from .serializers import RegisterSerializer, OTPSerializer, UserSerializer
import random
from django.core.mail import send_mail
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status



def home(request):
    return HttpResponse("<h1>Hello from server</h1>")

class Loginuser(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        print("123")
        from .serializers import LoginSerializer
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']

            # Authenticate user
            user = User.objects.get(username=username)


            # Create or retrieve the token
            # Generate a new token key
            token_key = str(uuid.uuid4())

            # Try to find an existing token for the user
            token = Token.objects(user=user).first()

            if token:
                # Update the existing token
                token.key = token_key
                token.expires_at = datetime.utcnow() + timedelta(days=7)  # Reset expiration to 7 days
                token.save()
            else:
                # Create a new token
                token = Token(
                    user=user,
                    key=token_key,
                    expires_at=datetime.utcnow() + timedelta(days=7)  # Set expiration to 7 days
                )
                token.save()
            # user = token.user
            # Retrieve the username
            username = user.username
            print(username)
            if(username == 'admin' and bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8'))):
                response =  Response({
                    'message': 'Login successful',
                    'token': token.key,
                    'username'  :username
                }, status=200)
                response['Authorization'] = f'Token {token.key}'
                return response
            response = Response({
                    'message': 'Login successful',
                    'token': token.key,
                    'username': username
                },status=200)
            response['Authorization'] = f'Token {token.key}'
            return response


        else:
            return Response(serializer.errors, status=400)


@csrf_exempt
def get_all_users(request):
    # Extract the token from the request headers
    auth_header = request.headers.get('Authorization')

    if not auth_header:
        return JsonResponse({'error': 'Authentication credentials were not provided.'}, status=401)

    try:
        # Token is typically in the format 'Token <token_key>', so split it
        token_key = auth_header.split(' ')[1]
    except IndexError:
        return JsonResponse({'error': 'Invalid token format.'}, status=401)

    # Retrieve the token document from the MongoDB database using mongoengine
    token = Token.objects(key=token_key).first()

    if token is None or token.user is None:
        return JsonResponse({'error': 'Invalid or expired token.'}, status=401)

    username = token.user.username

    # Check if the user has admin privileges
    if username == 'dungeon':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)

    return JsonResponse({"error": "Only admin can access"}, status=401)

class Logoutuser(APIView):
    permission_classes = [IsAuthenticatedUser]
    def post(self, request):
        user = request.user
        token = Token.objects(user=user).first()
        token.delete()
        return Response({'message': 'Logged out successfully'}, status=200)

class RegisterUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({'error': 'All fields are required'}, status=400)

        data = serializer.validated_data
        if User.objects(email=data['email']).first() or User.objects(contact_number=data['contact_number']).first():
            return Response({'error': 'User with email or phone number already exists'}, status=409)

        otp_code = str(random.randint(100000, 999999))

        OTP.objects.create(email=data['email'], otp=otp_code)

        # Send OTP via email
        send_mail(
            'Your OTP Code',
            f'Your OTP code is {otp_code}. It will expire in 5 minutes.'
            f'',
            'Dungeon0559@gmail.com',  # Replace with your email
            [data['email']],
            fail_silently=False,
        )

        return Response({'message': 'OTP sent to your email'}, status=200)



class VerifyOTPAndRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        user_email = request.data.get('email') # Get the user's email

        # Pass user email in the context
        serializer = OTPSerializer(data=data, context={'email': user_email})
        if not serializer.is_valid():
            return Response({'error': 'Invalid OTP or email'}, status=400)

        data = serializer.validated_data
        otp_record = OTP.objects(otp=data['otp']).first()

        if not otp_record or otp_record.is_expired():
            return Response({'error': 'Invalid or expired OTP'}, status=400)

        # Remove the OTP after successful verification
        email = OTP.objects(otp=data['otp']).first().email
        OTP.objects(otp=data['otp']).delete()
        hashed_password = bcrypt.hashpw(request.data['password'].encode('utf-8'), bcrypt.gensalt())
        user = User.objects.create(
            email=email,
            contact_number=request.data['contact_number'],
            username=request.data['username'],
            password=hashed_password.decode('utf-8'),  # Make sure to hash the password
            state=request.data['state']
        )

        user_data = UserSerializer(user).data

        return Response({'message': 'User registered successfully', 'user': user_data}, status=201)


# hidden gemss

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAdminUser
from .models import HiddenGem
from .serializers import HiddenGemSerializer


class HiddenGemList(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Default behavior to fetch top-rated places in GET request
        gems_query = HiddenGem.objects.order_by('-rating')
        serializer = HiddenGemSerializer(gems_query, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        # Check if the request contains category filters for search
        if 'name' in request.data:
            print(request.data)
            serializer = HiddenGemSerializer(data=request.data)
            if serializer.is_valid():
                print("saved")
                gem = serializer.save()
                return Response(HiddenGemSerializer(gem).data, status=status.HTTP_201_CREATED)
            return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


        else:
            # If no search filters are provided, treat it as a request to add a new HiddenGem
            # Fetch category filter from the request data (array)
            category_filters = request.data.get('category', None)  # Expecting category as an array in the body
            top_rated = request.data.get('top_rated', True)  # Defaults to true

            # Base query for HiddenGems
            gems_query = HiddenGem.objects.all()

            # Apply category filter if provided
            if category_filters:
                gems_query = gems_query.filter(category__in=category_filters)

            # Sort by top-rated if top_rated is true
            if top_rated:
                gems_query = gems_query.order_by('-rating')

            # Serialize and return the filtered response
            serializer = HiddenGemSerializer(gems_query, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)




class HiddenGemDetail(APIView):
    permission_classes = [AllowAny]

    def get_object(self, pk):
        try:
            return HiddenGem.objects.get(id=pk)
        except HiddenGem.DoesNotExist:
            return None

    def get(self, request, pk):
        gem = self.get_object(pk)
        if gem is None:
            return Response({"error": "Hidden gem not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = HiddenGemSerializer(gem)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        self.permission_classes = [AllowAny]
        self.check_permissions(request)

        gem = self.get_object(pk)
        if gem is None:
            return Response({"error": "Hidden gem not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = HiddenGemSerializer(gem, data=request.data, partial=True)
        if serializer.is_valid():
            gem = serializer.save()
            return Response(HiddenGemSerializer(gem).data, status=status.HTTP_200_OK)

        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        self.permission_classes = [AllowAny]
        self.check_permissions(request)

        gem = self.get_object(pk)
        if gem is None:
            return Response({"error": "Hidden gem not found"}, status=status.HTTP_404_NOT_FOUND)

        gem.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class GuideListCreateAPIView(APIView):
    permission_classes = [IsAuthenticatedUser]

    def get(self, request):
        user = request.user
        # Retrieve the latest booking for the user
        booking_history_entry = BookingHistory.objects.filter(user=user).order_by('-booking_date').first()

        # Check if booking is for a gem or package and get the cabs accordingly
        if booking_history_entry and booking_history_entry.gem and booking_history_entry.gem.state:
            guide = Guide.objects.filter(state=booking_history_entry.gem.state)
        elif booking_history_entry and booking_history_entry.package and booking_history_entry.package.state:
            guide = Guide.objects.filter(state=booking_history_entry.package.state)
        elif booking_history_entry and booking_history_entry.static_package and booking_history_entry.static_package.state:
            guide = Guide.objects.filter(state=booking_history_entry.static_package.state)
        else:
            return Response({"error": "State information is missing."}, status=status.HTTP_400_BAD_REQUEST)

        # Serialize the Cab objects
        serializer = GuideSerializer(guide, many=True)  # many=True as it could return multiple cabs
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        self.permission_classes = [AllowAny]
        serializer = GuideSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GuideDetailAPIView(APIView):
    permission_classes = [AllowAny]  # Only admin users can access this view

    def get_object(self, pk):
        try:
            return Guide.objects.get(pk=pk)
        except:
            raise Http404

    def get(self, request, pk):
        """
        Retrieve a specific guide by ID.
        """
        guide = self.get_object(pk)
        serializer = GuideSerializer(guide)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        self.permission_classes = [IsAdminUser]
        self.check_permissions(request)
        """
        Update a specific guide by ID.
        """
        guide = self.get_object(pk)
        serializer = GuideSerializer(guide, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        self.permission_classes = [IsAdminUser]
        self.check_permissions(request)
        """

        Delete a specific guide by ID.
        """
        guide = self.get_object(pk)
        guide.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# package API's

def serialize_custom_package(package):
    """Convert ObjectId fields to strings and include itinerary with hidden gem details."""
    itinerary = []
    for day, place in enumerate(package.places, start=1):
        # Assume each place has associated hidden gems (can be fetched or stored in place).
        # hidden_gems = [{
        #     "id": str(hidden_gem.id),
        #     "name": hidden_gem.name,
        #     "description": hidden_gem.description
        # } for hidden_gem in HiddenGem.objects(state=place.state).limit(3)]  # Assuming 3 hidden gems per place

        itinerary.append({
            "day": day,
            "place": {
                "id": str(place.id),
                "name": place.name,
                "description": place.description,

            }
        })

    return {
        "id": str(package.id),
        "name": package.name,
        "places": [{"id": str(place.id), "name": place.name} for place in package.places],
        "state": package.state,
        "price": package.price,
        "number_of_persons": package.number_of_persons,
        "user": str(package.user.id),
        "booked_at": package.booked_at.isoformat(),
        "guide": str(package.guide.id) if package.guide else None,
        "itinerary": itinerary  # Add the itinerary with places and hidden gems
    }


class CreateCustomPackage(APIView):
    permission_classes = [IsAuthenticatedUser]

    def post(self, request):
        user = request.user

        # Get data from the request
        print(request.data)
        place_ids = request.data.get('places', [])
        guide_id = request.data.get('guide' , None)
        number_of_persons =int(request.data.get('number_of_persons'))  # Default to 1 if not provided

        # Ensure place_ids is a list of strings
        if not isinstance(place_ids, list):
            return Response({"error": "Invalid format for places."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Retrieve HiddenGems by IDs
            places = HiddenGem.objects.filter(id__in=place_ids)

            # Ensure that all selected places are in the same state
            if places:
                state = places.first().state  # Use the state of the first HiddenGem
                if not all(place.state == state for place in places):
                    return Response({"error": "All selected places must be in the same state."},
                                    status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"error": "No places selected or invalid place IDs."}, status=status.HTTP_400_BAD_REQUEST)

            # Retrieve the guide if provided
            guide = Guide.objects.get(id=guide_id) if guide_id else None

            # Calculate the total price
            total_price = sum([place.price for place in places])
            total_price *= number_of_persons

            if guide:
                total_price += guide.price

            # Create a new CustomPackage
            custom_package = CustomPackage(
                name=request.data.get('name', 'Custom Package'),
                places=places,
                state=state,
                price=total_price,
                number_of_persons=number_of_persons,
                user=user,  # Associate package with the user
                booked_at=now(),
                guide=guide
            )
            custom_package.save()


            serialized_package = serialize_custom_package(custom_package)
            response_data = {
                "package": serialized_package,
                "package_id": serialized_package["id"]  # Use the ID from the serialized package
            }

            return Response(response_data, status=status.HTTP_201_CREATED)

        except Guide.DoesNotExist:
            return Response({"error": "Guide not found."}, status=status.HTTP_404_NOT_FOUND)
        except HiddenGem.DoesNotExist:
            return Response({"error": "HiddenGem not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




from django.utils.timezone import now
from mongoengine import DoesNotExist

class BookHiddenGem(APIView):
    permission_classes = [IsAuthenticatedUser]

    def post(self, request):
        user = request.user
        gem_id = request.data.get('gem_id')
        number_of_persons = int(request.data.get('number_of_persons', 1))  # Default to 1 if not provided
        travel_date_str = request.data.get('travel_date')  # Get the travel date from the request

        if not travel_date_str:
            return Response({"error": "Travel date is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Parse the travel date string to a datetime object
            travel_date = datetime.strptime(travel_date_str, '%Y-%m-%d')

            gem = HiddenGem.objects.get(id=gem_id)

            # Create a new booking history entry
            booking_history_entry = BookingHistory(
                user=user,
                gem=gem,
                booking_date=now(),
                travel_date=travel_date,  # Store the travel date
                price=gem.price * number_of_persons,
                number_of_persons=number_of_persons
            )
            booking_history_entry.save()

            # Optionally update the number of views in the HiddenGem
            gem.number_of_person_views += number_of_persons
            gem.save()

            # Fetch cab drivers in the same state
            cabs_in_state = Cab.objects.filter(state=gem.state, available=True)
            cab_details = CabSerializer(cabs_in_state, many=True).data

            # Fetch drivers associated with the cabs
            driver_ids = [cab.driver.id for cab in cabs_in_state if cab.driver]
            drivers = Driver.objects.filter(id__in=driver_ids)
            driver_details = DriverSerializer(drivers, many=True).data

            response_data = {
                "message": "HiddenGem booked successfully!",
                "booking_id": str(booking_history_entry.id),
                "cab_details": cab_details,
                "driver_details": driver_details
            }

            return Response(response_data, status=status.HTTP_201_CREATED)

        except HiddenGem.DoesNotExist:
            return Response({"error": "HiddenGem not found."}, status=status.HTTP_404_NOT_FOUND)
        except ValueError:
            return Response({"error": "Invalid travel date format. Please use 'YYYY-MM-DD'."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class BookCustomPackage(APIView):
    permission_classes = [IsAuthenticatedUser]

    def post(self, request):
        user = request.user

        # Get data from the request
        package_id = request.data.get('package_id')
        travel_date_str = request.data.get('travel_date')  # Get the travel date from the request

        if not travel_date_str:
            return Response({"error": "Travel date is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Parse the travel date string to a datetime object
            travel_date = datetime.strptime(travel_date_str, '%Y-%m-%d')

            # Retrieve the CustomPackage by ID
            custom_package = CustomPackage.objects.get(id=package_id)

            number_of_persons = int(custom_package.number_of_persons)  # Default to number of persons in the package

            # Ensure that the number of persons is valid
            if number_of_persons <= 0:
                return Response({"error": "Number of persons must be greater than 0."}, status=status.HTTP_400_BAD_REQUEST)

            # Create a new booking history entry for the custom package
            booking_history_entry = BookingHistory(
                user=user,
                package=custom_package,
                guide=custom_package.guide,
                booking_date=now(),
                travel_date=travel_date,  # Store the travel date
                price=(custom_package.price*number_of_persons),
                number_of_persons=number_of_persons
            )
            booking_history_entry.save()

            # Fetch cab drivers in the same state
            state = custom_package.state
            if not state:
                return Response({"error": "Custom package state is not defined."}, status=status.HTTP_400_BAD_REQUEST)

            cabs_in_state = Cab.objects.filter(state=state, available=True)
            cab_details = CabSerializer(cabs_in_state, many=True).data

            # Fetch drivers associated with the cabs
            driver_ids = [cab.driver.id for cab in cabs_in_state if cab.driver]
            drivers = Driver.objects.filter(id__in=driver_ids)
            driver_details = DriverSerializer(drivers, many=True).data

            response_data = {
                "message": "Custom package booked successfully!",
                "booking_id": str(booking_history_entry.id),
                "package_details": serialize_custom_package(custom_package),
                "cab_details": cab_details,
                "driver_details": driver_details
            }

            return Response(response_data, status=status.HTTP_201_CREATED)

        except CustomPackage.DoesNotExist:
            return Response({"error": "CustomPackage not found."}, status=status.HTTP_404_NOT_FOUND)
        except ValueError:
            return Response({"error": "Invalid travel date format. Please use 'YYYY-MM-DD'."}, status=status.HTTP_400_BAD_REQUEST)
        except DoesNotExist:
            return Response({"error": "Guide, cab, or driver not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

import json
from bson import ObjectId
class ReviewCreateAPIView(APIView):
    permission_classes = [IsAuthenticatedUser]

    def post(self, request, *args, **kwargs):
        serializer = ReviewSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            review = serializer.save()
            # Convert all fields of the saved review to strings
            response_data = self.convert_to_string(serializer.data)
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def convert_to_string(self, data):
        """Recursively convert all values in a dictionary to strings."""
        if isinstance(data, dict):
            return {key: self.convert_to_string(value) for key, value in data.items()}
        elif isinstance(data, list):
            return [self.convert_to_string(item) for item in data]
        elif isinstance(data, (bytes, ObjectId)):
            return str(data)
        elif isinstance(data, (int, float, bool)):
            return str(data)
        else:
            return data


class ReviewListAPIView(APIView):
    permission_classes = [IsAuthenticatedUser]

    def post(self, request, *args, **kwargs):
        place_id = request.data.get('place_id')

        if not place_id:
            return Response({'detail': 'Place ID is required in the request body.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Ensure place_id is a valid ObjectId
            place_id = ObjectId(place_id)
            place = HiddenGem.objects.get(id=place_id)
            reviews = Review.objects.filter(place=place)
        except:
            return Response({'detail': 'Place not found or invalid place ID.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ReviewSerializer(reviews, many=True)
        response_data = self.convert_to_string(serializer.data)
        return Response(response_data)

    def convert_to_string(self, data):
        """Recursively convert all values in a dictionary to strings."""
        if isinstance(data, dict):
            return {key: self.convert_to_string(value) for key, value in data.items()}
        elif isinstance(data, list):
            return [self.convert_to_string(item) for item in data]
        elif isinstance(data, (bytes, ObjectId)):
            return str(data)
        elif isinstance(data, (int, float, bool)):
            return str(data)
        else:
            return data


class DriverListCreateView(APIView):
    permission_classes = [IsAuthenticatedUser]

    def get(self, request):
        user = request.user
        # Retrieve the latest booking for the user
        booking_history_entry = BookingHistory.objects.filter(user=user).order_by('-booking_date').first()

        # Check if booking is for a gem or package and get the cabs accordingly
        if booking_history_entry and booking_history_entry.gem and booking_history_entry.gem.state:
            driver = Driver.objects.filter(state=booking_history_entry.gem.state)
        elif booking_history_entry and booking_history_entry.package and booking_history_entry.package.state:
            driver = Driver.objects.filter(state=booking_history_entry.package.state)
        else:
            return Response({"error": "State information is missing."}, status=status.HTTP_400_BAD_REQUEST)

        # Serialize the Cab objects
        serializer = DriverSerializer(driver, many=True)  # many=True as it could return multiple cabs
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = DriverSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DriverRetrieveUpdateDestroyView(APIView):
    def get_object(self, pk):
        try:
            return Driver.objects.get(id=pk)
        except DoesNotExist:
            return None

    def get(self, request, pk):
        driver = self.get_object(pk)
        if driver is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = DriverSerializer(driver)
        return Response(serializer.data)

    def put(self, request, pk):
        driver = self.get_object(pk)
        if driver is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = DriverSerializer(driver, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        driver = self.get_object(pk)
        if driver is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        driver.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CabListCreateView(APIView):
    permission_classes = [IsAuthenticatedUser]

    def get(self, request):
        user = request.user
        # Retrieve the latest booking for the user
        booking_history_entry = BookingHistory.objects.filter(user=user).order_by('-booking_date').first()

        # Check if booking is for a gem or package and get the cabs accordingly
        if booking_history_entry and booking_history_entry.gem and booking_history_entry.gem.state:
            cabs = Cab.objects.filter(state=booking_history_entry.gem.state)
        elif booking_history_entry and booking_history_entry.package and booking_history_entry.package.state:
            cabs = Cab.objects.filter(state=booking_history_entry.package.state)
        elif booking_history_entry and booking_history_entry.static_package and booking_history_entry.static_package.state:
            cabs = Cab.objects.filter(state=booking_history_entry.static_package.state)
        else:
            return Response({"error": "State information is missing."}, status=status.HTTP_400_BAD_REQUEST)

        # Serialize the Cab objects
        serializer = CabSerializer(cabs, many=True)  # many=True as it could return multiple cabs
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CabSerializer(data=request.data)
        if serializer.is_valid():
            driver_id = request.data.get('driver')

            # Fetch the driver to get the state
            if driver_id:
                try:
                    driver = Driver.objects.get(id=driver_id)
                    state = driver.state
                except Driver.DoesNotExist:
                    return Response({"error": "Driver does not exist."}, status=status.HTTP_400_BAD_REQUEST)

                # Add the state to the request data
                data = request.data.copy()
                data['state'] = state

                # Validate and save the cab with the updated state
                serializer_with_state = CabSerializer(data=data)
                if serializer_with_state.is_valid():
                    cab = serializer_with_state.save()

                    # Optionally, update the driver’s cabs list
                    driver.cabs.append(cab)
                    driver.save()

                    return Response(serializer_with_state.data, status=status.HTTP_201_CREATED)
                return Response(serializer_with_state.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response({"error": "Driver ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class CabDetailView(APIView):
    permission_classes = [AllowAny]

    def get_object(self, pk):
        try:
            return Cab.objects.get(pk=pk)
        except DoesNotExist:
            return None

    def get(self, request, pk):
        cab = self.get_object(pk)
        if cab is None:
            return Response({"error": "Cab does not exist"}, status=status.HTTP_404_NOT_FOUND)
        serializer = CabSerializer(cab)
        return Response(serializer.data)

    def patch(self, request, pk):
        cab = self.get_object(pk)
        if cab is None:
            return Response({"error": "Cab does not exist"}, status=status.HTTP_404_NOT_FOUND)

        # Retrieve and validate the data
        data = request.data.copy()
        driver_id = data.get('driver')

        if driver_id:
            try:
                driver = Driver.objects.get(id=driver_id)
                data['state'] = driver.state
            except Driver.DoesNotExist:
                return Response({"error": "Driver does not exist."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = CabSerializer(cab, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        cab = self.get_object(pk)
        if cab is None:
            return Response({"error": "Cab does not exist"}, status=status.HTTP_404_NOT_FOUND)
        cab.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class BookingHistoryListCreateView(APIView):
    permission_classes = [IsAuthenticatedUser]

    def get(self, request):
        user_id = request.user.id

        if not user_id:
            return Response({"error": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Retrieve all booking history entries for the specified user
            bookings = BookingHistory.objects.filter(user=user_id)

            # Prepare booking details
            booking_details = []
            for booking in bookings:
                booking_data = {
                    "booking_id": str(booking.id),
                    "booking_date": booking.booking_date.isoformat() if booking.booking_date else None,
                    "price": booking.price,
                    "number_of_persons": booking.number_of_persons,
                    "gem": None,
                    "package": None,
                    "guide": None,
                    "cab": None,
                }

                # Fetch and add HiddenGem details if available
                if booking.gem:
                    gem = HiddenGem.objects.get(id=booking.gem.id)
                    booking_data["gem"] = {
                        "id": str(gem.id),
                        "name": gem.name,
                        "price": gem.price,
                        "state": gem.state
                    }

                # Fetch and add CustomPackage details if available
                if booking.package:
                    package = CustomPackage.objects.get(id=booking.package.id)
                    booking_data["package"] = {
                        "id": str(package.id),
                        "name": package.name,
                        "price": package.price,
                        "state": package.state,
                        "number_of_persons": package.number_of_persons,
                        "guide": {
                            "id": str(package.guide.id) if package.guide else None,
                            "name": package.guide.name if package.guide else None
                        } if package.guide else None
                    }

                # Fetch and add Cab details if available
                if booking.cab:
                    cab = Cab.objects.get(id=booking.cab.id)
                    booking_data["cab"] = {
                        "id": str(cab.id),
                        "car_name": cab.car_name,
                        "number_plate": cab.number_plate,
                        "number_of_persons": cab.number_of_persons,
                        "price": cab.price,
                        "available": cab.available,
                        "state": cab.state
                    }

                booking_details.append(booking_data)

            return Response(booking_details, status=status.HTTP_200_OK)

        except HiddenGem.DoesNotExist:
            return Response({"error": "One or more gems not found."}, status=status.HTTP_404_NOT_FOUND)
        except CustomPackage.DoesNotExist:
            return Response({"error": "One or more packages not found."}, status=status.HTTP_404_NOT_FOUND)
        except Cab.DoesNotExist:
            return Response({"error": "One or more cabs not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class BookStaticPackage(APIView):
    permission_classes = [IsAuthenticatedUser]

    def post(self, request):
        user = request.user
        package_id = str(request.data.get('package_id'))
        number_of_persons = int(request.data.get('number_of_persons'))
        travel_date = str(request.data.get('travel_date'))

        # Validate input

        if not package_id or not isinstance(number_of_persons, int) or number_of_persons <= 0 or not travel_date:
            return Response({"error": "Invalid input."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Retrieve the Package by ID
            package = StaticPackage.objects.get(id=package_id)
            print(package.name)

            # Check if there's an existing booking history for this user
            # booking_history_entry = BookingHistory.objects.filter(user=user, status='BOOKED').order_by('-booking_date').first()
            #
            # if booking_history_entry:
            #     return Response({"error": "User already has an active booking."}, status=status.HTTP_400_BAD_REQUEST)
            price = package.price*number_of_persons
            print(price)
            # Create a new booking history entry
            booking_history_entry = BookingHistory(
                user=user,
                static_package=package,
                price=price,
                booking_date=timezone.now(),
                travel_date=travel_date,
                number_of_persons=number_of_persons
            )

            # Check availability and update slots
            travel_date_str = travel_date[:10]  # Format as YYYY-MM-DD
            print(travel_date_str)
            print(package.slots[travel_date_str])

            if travel_date_str in package.slots:
                available_slots = package.slots[travel_date_str]
                if available_slots >= number_of_persons:
                    package.slots[travel_date_str] -= number_of_persons
                else:
                    return Response({"error": "Not enough slots available."}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"error": "No slots available for the selected date."},
                                status=status.HTTP_400_BAD_REQUEST)

            package.save()  # Save changes to package slots
            booking_history_entry.save()  # Save booking history entry

            response_data = {
                "message": "Package booked successfully!",
                "booking_history": {
                    "booking_id": str(booking_history_entry.id),
                    "user": str(user.id),
                    "package_id": str(package.id),
                    "price": booking_history_entry.price,
                    "booking_date": booking_history_entry.booking_date,
                    "travel_date": booking_history_entry.travel_date,
                    "status": booking_history_entry.status,
                    "number_of_persons": booking_history_entry.number_of_persons
                }
            }
            return Response(response_data, status=status.HTTP_201_CREATED)

        except StaticPackage.DoesNotExist:
            return Response({"error": "Package not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
###################################################################
class BookCabView(APIView):
    permission_classes = [IsAuthenticatedUser]

    def post(self, request):
        user = request.user
        print(user.id)
        cab_id = request.data.get('cab_id')

        try:
            # Retrieve the Cab by ID
            cab = Cab.objects.get(id=cab_id)

            # Check if there's an existing booking history for this user
            booking_history_entry = BookingHistory.objects.filter(user=user).order_by('-booking_date').first()

            if not booking_history_entry:
                return Response({"error": "No existing booking history found for the user."}, status=status.HTTP_400_BAD_REQUEST)

            # Update the booking history with the selected cab
            booking_history_entry.cab = cab
            booking_history_entry.price += cab.price
            booking_history_entry.save()

            response_data = {
                "message": "Cab added to booking history successfully!",
                "booking_history": {
                    "user": str(user.id),
                    "package": str(booking_history_entry.package.id) if booking_history_entry.package else None,
                    "gem": str(booking_history_entry.gem.id) if booking_history_entry.gem else None,
                    "guide": str(booking_history_entry.guide.id) if booking_history_entry.guide else None,
                    "cab": str(booking_history_entry.cab.id) if booking_history_entry.cab else None,
                    "booking_date": booking_history_entry.booking_date,
                    "price": booking_history_entry.price,
                    "number_of_persons": booking_history_entry.number_of_persons
                }
            }

            return Response(response_data, status=status.HTTP_200_OK)

        except Cab.DoesNotExist:
            return Response({"error": "Cab not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

####################################################333
class UserBookingHistory(APIView):
    permission_classes = [IsAuthenticatedUser]

    def get(self, request):
        user = request.user
        bookings = BookingHistory.objects.filter(user=user).order_by('-booking_date')
        booking_details = [self.serialize_booking(b) for b in bookings]
        return Response(booking_details, status=status.HTTP_200_OK)

    def serialize_booking(self, booking):
        return {
            "gem": str(booking.gem.id) if booking.gem else None,
            "package": str(booking.package.id) if booking.package else None,
            "guide": str(booking.guide.id) if booking.guide else None,
            "cab": str(booking.cab.id) if booking.cab else None,
            "booking_date": booking.booking_date,
            "price": booking.price,
            "number_of_persons": booking.number_of_persons
        }


class TransactionView(APIView):
    permission_classes = [IsAuthenticatedUser]

    def get(self, request):
        user = request.user
        print(user.username)
        try:
            latest_booking = BookingHistory.objects.filter(user=user).order_by('-booking_date').first()
            if latest_booking is not None:
                return Response({'amount': latest_booking.price}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'No bookings found for this user.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            user = request.user
            # Get the latest booking history entry for the user
            booking_history_entry = BookingHistory.objects.filter(user=user).order_by('-booking_date').first()
            if booking_history_entry is None:
                return Response({
                    "error": "No booking history found for this user."
                }, status=status.HTTP_400_BAD_REQUEST)

            # Get the price from the booking history entry
            price = booking_history_entry.price  # Directly use the price from the booking entry

            # Create a new transaction record
            transaction = Transaction(
                user=booking_history_entry.user,
                hidden_gem=booking_history_entry.gem,
                package=booking_history_entry.package,
                amount=price,
                transaction_success=True
            )
            transaction.update_status()

            # Save transaction reference in booking history
            booking_history_entry.transaction = transaction
            booking_history_entry.status = 'PENDING'
            booking_history_entry.save()

            # Generate OTP code
            otp_code = str(random.randint(100000, 999999))

            # Store the OTP in the database
            OTP.objects.create(email=booking_history_entry.user.email, otp=otp_code)

            # Send OTP via email
            send_mail(
                'Your OTP Code',
                f'Your OTP code is {otp_code}. It will expire in 5 minutes.',
                'Dungeon0559@gmail.com',  # Replace with your email
                [booking_history_entry.user.email],
                fail_silently=False,
            )

            # Return a response indicating that OTP has been sent
            return Response({
                "message": "OTP sent to user. Please verify to continue the payment."
            }, status=status.HTTP_200_OK)

        except DoesNotExist:
            return Response({
                "error": "Booking with the given ID does not exist."
            }, status=status.HTTP_400_BAD_REQUEST)


class VerifyOTPAndTransactionView(APIView):
    permission_classes = [IsAuthenticatedUser]

    def post(self, request):
        data = request.data
        user_email = request.user.email  # Get the user's email

        # Pass user email in the context
        serializer = OTPSerializer(data=data, context={'email': user_email})

        if not serializer.is_valid():
            return Response({'error': 'Invalid OTP or email'}, status=status.HTTP_400_BAD_REQUEST)


        otp = serializer.validated_data['otp']
        print(otp)
        otp_record = OTP.objects(otp=otp).order_by('-created_at').first()
        print(otp_record)
        if not otp_record or otp_record.is_expired():
            # If OTP is invalid or expired, set transaction status to "PENDING" and return response
            self.set_transaction_status_to_pending(request.user)
            return Response({'error': 'Invalid or expired OTP. Transaction status set to pending.'},
                            status=status.HTTP_400_BAD_REQUEST)

        # Remove the OTP after successful verification
        OTP.objects(otp=otp).delete()

        # Proceed with transaction processing
        user = request.user
        booking_history_entry = BookingHistory.objects.filter(user=user).order_by('-booking_date').first()

        if not booking_history_entry:
            return Response({'error': 'No booking history found for user.'}, status=status.HTTP_404_NOT_FOUND)

        try:
            # Create a new transaction record
            transaction = Transaction(
                user=booking_history_entry.user,
                hidden_gem=booking_history_entry.gem,
                package=booking_history_entry.package,
                amount=booking_history_entry.price,  # Assuming price is the amount
                transaction_success=True
            )
            transaction.update_status()  # Implement this method as needed

            # Save transaction reference in booking history
            booking_history_entry.transaction = transaction
            booking_history_entry.status = 'BOOKED'
            booking_history_entry.save()

            # Return success response
            return Response({
                "message": "Transaction completed successfully",
                "transaction_id": str(transaction.id)
            }, status=status.HTTP_200_OK)

        except ObjectDoesNotExist:
            return Response({'error': 'Booking with the given ID does not exist.'},
                            status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            # Log the exception if necessary
            return Response({'error': 'An unexpected error occurred. Please try again later.'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def set_transaction_status_to_pending(self, user):
        # Handle logic to set transaction status to "PENDING"
        booking_history_entry = BookingHistory.objects.filter(user=user).order_by('-booking_date').first()
        if booking_history_entry:
            transaction = Transaction(
                user=booking_history_entry.user,
                hidden_gem=booking_history_entry.gem,
                package=booking_history_entry.package,
                amount=booking_history_entry.price,
                transaction_success=False  # Mark as not successful
            )
            transaction.update_status()  # Implement this method as needed


            booking_history_entry.transaction = transaction
            booking_history_entry.status = 'FAILED'
            booking_history_entry.save()


    # def post(self, request):
    #     serializer = TransactionSerializer(data=request.data)
    #     if serializer.is_valid():
    #         booking_id = serializer.validated_data.get('booking_id')
    #         transaction_success = serializer.validated_data.get('transaction_success')
    #         amount = BookingHistory.objects.get(id=booking_id).price
    #         try:
    #             booking_history_entry = BookingHistory.objects.get(id=booking_id)
    #
    #             # Create a new transaction record
    #             transaction = Transaction(
    #                 user=booking_history_entry.user,
    #                 hidden_gem=booking_history_entry.gem,
    #                 package=booking_history_entry.package,
    #                 amount=amount,
    #                 transaction_success=transaction_success
    #             )
    #             transaction.update_status()
    #
    #             # Save transaction reference in booking history
    #             booking_history_entry.transaction = transaction
    #             booking_history_entry.status= 'BOOKED'
    #             booking_history_entry.save()
    #
    #             # Return success response
    #             return Response({
    #                 "message": "Transaction updated successfully",
    #                 "transaction_id": str(transaction.id)
    #             }, status=status.HTTP_200_OK)
    #
    #         except DoesNotExist:
    #             return Response({
    #                 "error": "Booking with the given ID does not exist."
    #             }, status=status.HTTP_400_BAD_REQUEST)
    #     else:
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from django.utils import timezone

class CancelBooking(APIView):
    permission_classes = [IsAuthenticatedUser]

    def post(self, request):
        user = request.user
        booking_id = request.data.get('booking_id')

        try:
            # Retrieve the booking
            booking = BookingHistory.objects.get(id=booking_id, user=user)

            # Use timezone-aware current time
            current_time = timezone.now()

            # Ensure that travel_date is timezone-aware
            if timezone.is_naive(booking.travel_date):
                booking.travel_date = timezone.make_aware(booking.travel_date, timezone.get_current_timezone())

            # Calculate the difference in days
            days_until_travel = (booking.travel_date - current_time).days
            print(f"Days until travel: {days_until_travel}")

            # Check if the booking can be canceled before 10 days of the travel date
            if days_until_travel < 10:
                return Response({"error": "Cannot cancel booking before 10 days of travel."}, status=status.HTTP_400_BAD_REQUEST)

            # Mark the booking as canceled
            booking.status = 'CANCELLED'
            booking.save()

            return Response({
                "message": "Booking canceled successfully.",
                "booking_id": str(booking.id),
                "status": booking.status
            }, status=status.HTTP_200_OK)

        except BookingHistory.DoesNotExist:
            return Response({"error": "Booking not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


from mongoengine import Q
from rest_framework.response import Response
from rest_framework import status


class StaticPackageList(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Retrieve all static packages
        queryset = StaticPackage.objects.all()
        serializer = StaticPackageSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):

        # Check if it's a package creation request
        if 'name' in request.data:
            print(request.data)
            serializer = StaticPackageSerializer(data=request.data)
            if serializer.is_valid():
                static_package = serializer.save()
                return Response(StaticPackageSerializer(static_package).data, status=status.HTTP_201_CREATED)
            return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        # Extract filters from request body
        categories = request.data.get('category', [])  # List of categories
        package_types = request.data.get('type', [])  # List of package types
        date_filter = request.data.get('date', None)  # Date filter
        rating = float(request.data.get('rating', 0))  # Minimum rating
        query = request.data.get('q', None)  # Search query

        # Log request data for debugging
        print(f"Request Data: {request.data}")

        queryset = StaticPackage.objects.all()

        # Apply rating filter
        if rating > 0 and request.data.get('rating'):
            queryset = queryset.filter(rating__gte=rating)

        # Apply category filter if provided
        if categories and request.data.get('category'):
            print(f"Categories: {categories}")  # Debugging output
            queryset = queryset.filter(category__in=categories)

        # Apply package type filter if provided
        if package_types and request.data.get('type'):
            print(f"Package Types: {package_types}")  # Debugging output
            queryset = queryset.filter(type__in=package_types)

        # Apply date filter if provided
        if date_filter and request.data.get('date'):
            print(f"Date Filter: {date_filter}")  # Debugging output
            queryset = queryset.filter(available_dates__contains=date_filter)

        # Apply search query if provided
        if query:
            print(f"Search Query: {query}")  # Debugging output
            queryset = queryset.filter(
                Q(name__icontains=query) |
                Q(description__icontains=query) |
                Q(state__icontains=query)
            )

        # Log final queryset before serialization
        print(f"Filtered Queryset: {queryset}")

        # Serialize and return filtered queryset
        serializer = StaticPackageSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # permission_classes = [IsAuthenticatedUser]
    #
    # def post(self, request):
    #     user = request.user
    #     print(user.id)
    #     cab_id = request.data.get('cab_id')
    #
    #     try:
    #         # Retrieve the Cab by ID
    #         cab = Cab.objects.get(id=cab_id)
    #
    #         # Check if there's an existing booking history for this user
    #         booking_history_entry = BookingHistory.objects.filter(user=user).order_by('-booking_date').first()
    #
    #         if not booking_history_entry:
    #             return Response({"error": "No existing booking history found for the user."}, status=status.HTTP_400_BAD_REQUEST)
    #
    #         # Update the booking history with the selected cab
    #         booking_history_entry.cab = cab
    #         booking_history_entry.price += cab.price
    #         booking_history_entry.save()
    #
    #         response_data = {
    #             "message": "Cab added to booking history successfully!",
    #             "booking_history": {
    #                 "user": str(user.id),
    #                 "package": str(booking_history_entry.package.id) if booking_history_entry.package else None,
    #                 "gem": str(booking_history_entry.gem.id) if booking_history_entry.gem else None,
    #                 "guide": str(booking_history_entry.guide.id) if booking_history_entry.guide else None,
    #                 "cab": str(booking_history_entry.cab.id) if booking_history_entry.cab else None,
    #                 "booking_date": booking_history_entry.booking_date,
    #                 "price": booking_history_entry.price,
    #                 "number_of_persons": booking_history_entry.number_of_persons
    #             }
    #         }
    #
    #         return Response(response_data, status=status.HTTP_200_OK)
    #
    #     except Cab.DoesNotExist:
    #         return Response({"error": "Cab not found."}, status=status.HTTP_404_NOT_FOUND)
    #     except Exception as e:
    #         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class BookGuideAPIView(APIView):
    permission_classes = [IsAuthenticatedUser]

    def post(self, request):
        user = request.user
        guide_id = request.data.get('guide_id')
        print(guide_id)
        try:
            # Query by the _id field instead of guide_id
            guide = Guide.objects.get(id=guide_id)

            # Fetch the latest booking history entry for the user
            booking_history_entry = BookingHistory.objects.filter(user=user).order_by('-booking_date').first()
            if not booking_history_entry:
                return Response({"error": "No existing booking history found for the user."},
                                status=status.HTTP_400_BAD_REQUEST)

            # Update booking with the guide and adjust the price

            booking_history_entry.guide = guide
            booking_history_entry.price += guide.price
            booking_history_entry.save()

            return Response({"message": "Guide booked successfully"}, status=status.HTTP_200_OK)

        except Guide.DoesNotExist:
            return Response({"error": "Guide not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
class GetAllGuides(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):  # Add request parameter
        guides = Guide.objects.all()
        serializer = GuideSerializer(guides, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetAllCabs(APIView):
    permission_classes = [AllowAny]

    def get(self , request, *args, **kwargs): # Add request
        cabs = Cab.objects.all()
        serializer = CabSerializer(cabs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
from .serializers import UserSerializer

class UserBookingHistoryView(APIView):
    permission_classes = [IsAuthenticatedUser]

    def get(self, request):
        try:
            # Get the authenticated user from the request
            user = request.user

            # Fetch the user's booking history
            bookings = BookingHistory.objects.filter(user=user)

            # Serialize user data
            user_serializer = UserSerializer(user)

            # Serialize booking history data along with associated guide and cab details
            booking_serializer = BookingHistorySerializer(bookings, many=True)

            # Combine both user and booking history data
            response_data = {
                'user': user_serializer.data,
                'booking_history': booking_serializer.data,
            }

            return Response(response_data, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class StaticPackageDetail(APIView):
    permission_classes = [AllowAny]
    """
    Retrieve, update, or delete a static package instance.
    """

    def get_object(self, pk):
        try:
            return StaticPackage.objects.get(id=pk)
        except DoesNotExist:
            return None

    def patch(self, request, pk):
        """
        Partially update a StaticPackage instance.
        """
        package = self.get_object(pk)
        if package is None:
            return Response({"error": "StaticPackage not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = StaticPackageSerializer(package, data=request.data, partial=True)  # Allow partial updates
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """
        Delete a StaticPackage instance.
        """
        package = self.get_object(pk)
        if package is None:
            return Response({"error": "StaticPackage not found."}, status=status.HTTP_404_NOT_FOUND)

        package.delete()
        return Response({"message": "StaticPackage deleted successfully."}, status=status.HTTP_204_NO_CONTENT)