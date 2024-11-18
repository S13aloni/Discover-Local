import re
import bcrypt
from rest_framework import serializers
from .models import *
import bson
from .models import User
from django.contrib.auth.hashers import make_password
from .models import User  # Adjust the import according to your app structure

class ObjectIdField(serializers.Field):
    def to_representation(self, value):
        # Convert ObjectId to string for serialization
        return str(value) if isinstance(value, bson.ObjectId) else value

    def to_internal_value(self, data):
        # Convert string to ObjectId for deserialization
        return bson.ObjectId(data) if isinstance(data, str) else data

class OTPSerializer(serializers.Serializer):
    otp = serializers.CharField()

    def validate(self, attrs):
        # Retrieve the email from context
        email = self.context.get('email')
        if not email:
            raise serializers.ValidationError('Email not provided in context.')

        # # Check if an OTP exists for the given email
        # otp_record = OTP.objects.filter(email=email, otp=attrs['otp']).first()
        # if not otp_record or otp_record.is_expired():
        #     raise serializers.ValidationError('Invalid or expired OTP.')

        # If everything is fine, return validated data
        return attrs

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    password = serializers.CharField(max_length=100)
    contact_number = serializers.CharField(max_length=15)
    state = serializers.CharField(max_length=100)

    def validate(self, data):

        if User.objects(username=data['username']).first():
            raise serializers.ValidationError("Username already exists")


        if User.objects(email=data['email']).first():
            raise serializers.ValidationError("Email already exists")


        password = data['password']
        if len(password) < 6:
            raise serializers.ValidationError("Password must be at least 6 characters long")
        if not re.search(r'\d', password):
            raise serializers.ValidationError("Password must contain at least one number")
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
            raise serializers.ValidationError("Password must contain at least one special character")


        contact_number = data['contact_number']
        if not re.fullmatch(r'\d{10,15}', contact_number):
            raise serializers.ValidationError("Contact number must be between 10 and 15 digits long")

        return data




class UserSerializer(serializers.Serializer):
    id = ObjectIdField(read_only=True)  # Use CharField for ObjectId
    username = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    contact_number = serializers.CharField(max_length=15)
    state = serializers.CharField(max_length=100)
    role = serializers.ChoiceField(choices=['ADMIN', 'GUIDE', 'USER'])
    profile_picture= serializers.URLField(read_only=True , required=False)
    # booking_history = serializers.ListField(child=serializers.DictField(), required=False)


class LoginSerializer(serializers.Serializer):
    print('123')
    username = serializers.CharField()
    password = serializers.CharField()
    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        # Authenticate user
        try:
            user = User.objects.get(username=username)
            print(user.username)
        except :
            raise serializers.ValidationError("Invalid username or password.")

        # Check if the password is correct
        if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            raise serializers.ValidationError("Invalid username or password.")

        return data



from rest_framework import serializers
from .models import HiddenGem

class HiddenGemSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)  # ObjectId will be handled automatically by MongoDB
    name = serializers.CharField(max_length=200)
    description = serializers.CharField(allow_blank=True, required=False)
    state = serializers.CharField(max_length=100)
    photos = serializers.ListField(child=serializers.URLField(), allow_empty=True, required=False)
    rating = serializers.FloatField(min_value=0.0, max_value=5.0)  # Assuming rating is between 0 and 5
    number_of_person_views = serializers.IntegerField(default=0)
    price = serializers.FloatField(min_value=0.0)
    best_time = serializers.CharField(allow_blank=True, required=False)
    additional_info = serializers.CharField(allow_blank=True, required=False)
    category = serializers.ChoiceField(choices=HiddenGem.CATEGORY_CHOICES)

    def to_internal_value(self, data):
        """Convert incoming string data to the appropriate types."""
        # Convert fields to appropriate types if they are strings
        if 'rating' in data:
            data['rating'] = float(data['rating'])
        if 'number_of_person_views' in data:
            data['number_of_person_views'] = int(data['number_of_person_views'])
        if 'price' in data:
            data['price'] = float(data['price'])

        return super().to_internal_value(data)
    def create(self, validated_data):
        print(validated_data)
        """Create a new HiddenGem instance with validated data."""
        return HiddenGem.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """Update an existing HiddenGem instance."""
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


from rest_framework import serializers
from .models import Guide

class GuideSerializer(serializers.Serializer):
    id = serializers.CharField()  # ObjectId will be handled automatically by MongoDB
    name = serializers.CharField(max_length=200)
    price = serializers.FloatField()
    available_dates = serializers.ListField(child=serializers.DateTimeField())
    rating = serializers.FloatField(required=False)
    state = serializers.CharField(max_length=50 ,required=False)  # Assuming `state` is related to `HiddenGem` and you want to show its name
    image = serializers.ListField(child=serializers.URLField(), required=False)

    def create(self, validated_data):
        return Guide.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class CustomPackageSerializer(serializers.Serializer):
    id = serializers.CharField()
    name = serializers.CharField()
    places = HiddenGemSerializer(many=True)  # Assuming places is a list of HiddenGems
    state = serializers.CharField()
    price = serializers.FloatField()
    number_of_persons = serializers.IntegerField()
    booked_at = serializers.DateTimeField()
    guide = GuideSerializer()  # Assuming guide is optional





class ReviewSerializer(serializers.Serializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)  # Removed queryset
    place = serializers.PrimaryKeyRelatedField(queryset=HiddenGem.objects.all())
    comment = serializers.CharField(max_length=1000)
    rating = serializers.FloatField(min_value=0, max_value=5)
    created_at = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        user = self.context['request'].user
        place = validated_data['place']

        # Check if the user can review the place
        if not Review.can_review(user, place):
            raise serializers.ValidationError("User has not booked this place and cannot leave a review.")

        review = Review(
            user=user,
            place=place,
            comment=validated_data['comment'],
            rating=validated_data['rating']
        )
        review.save()
        return review


class DriverSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    username = serializers.CharField(max_length=200)
    contact_number = serializers.CharField(max_length=15)
    state = serializers.CharField(max_length=100)
    available = serializers.BooleanField(default=True)
    password = serializers.CharField(max_length=10)
    role = serializers.CharField(default="DRIVER")
    cabs = serializers.ListField(child=serializers.CharField(), required=False)

    def create(self, validated_data):
        return Driver.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
from bson import ObjectId
class CabSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    driver = serializers.CharField()
    car_name = serializers.CharField(max_length=200)
    number_plate = serializers.CharField(max_length=20)
    number_of_persons = serializers.IntegerField()
    price = serializers.FloatField()
    available = serializers.BooleanField(default=True)
    state = serializers.CharField(max_length=100 ,required=False)

    def create(self, validated_data):
        return Cab.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


# class BookingHistorySerializer(serializers.Serializer):
#     user = UserSerializer()
#     gem = HiddenGemSerializer()
#     package = CustomPackageSerializer()
#     guide = GuideSerializer()
#     booking_date = serializers.DateTimeField()
#     price = serializers.FloatField()
#     number_of_persons = serializers.IntegerField()
#     cab = CabSerializer()
#
#     def create(self, validated_data):
#         user_data = validated_data.pop('user', None)
#         gem_data = validated_data.pop('gem', None)
#         package_data = validated_data.pop('package', None)
#         guide_data = validated_data.pop('guide', None)
#         cab_data = validated_data.pop('cab', None)
#
#         user = User.objects.get(id=user_data['id']) if user_data else None
#         gem = HiddenGem.objects.get(id=gem_data['id']) if gem_data else None
#         package = CustomPackage.objects.get(id=package_data['id']) if package_data else None
#         guide = Guide.objects.get(id=guide_data['id']) if guide_data else None
#         cab = Cab.objects.get(id=cab_data['id']) if cab_data else None
#
#         booking = BookingHistory(
#             user=user,
#             gem=gem,
#             package=package,
#             guide=guide,
#             cab=cab,
#             **validated_data
#         )
#         booking.save()
#         return booking
#
#     def update(self, instance, validated_data):
#         user_data = validated_data.pop('user', None)
#         gem_data = validated_data.pop('gem', None)
#         package_data = validated_data.pop('package', None)
#         guide_data = validated_data.pop('guide', None)
#         cab_data = validated_data.pop('cab', None)
#
#         instance.user = User.objects.get(id=user_data['id']) if user_data else instance.user
#         instance.gem = HiddenGem.objects.get(id=gem_data['id']) if gem_data else instance.gem
#         instance.package = CustomPackage.objects.get(id=package_data['id']) if package_data else instance.package
#         instance.guide = Guide.objects.get(id=guide_data['id']) if guide_data else instance.guide
#         instance.cab = Cab.objects.get(id=cab_data['id']) if cab_data else instance.cab
#
#         instance.booking_date = validated_data.get('booking_date', instance.booking_date)
#         instance.price = validated_data.get('price', instance.price)
#         instance.number_of_persons = validated_data.get('number_of_persons', instance.number_of_persons)
#         instance.save()
#         return instance


class TransactionSerializer(serializers.Serializer):
    booking_id = serializers.CharField(required=True)
    transaction_success = serializers.BooleanField(required=True)

    def validate(self, data):
        booking_id = data.get('booking_id')
        transaction_success = data.get('transaction_success')

        # Check if the booking exists
        try:
            booking = BookingHistory.objects.get(id=booking_id)
        except BookingHistory.DoesNotExist:
            raise serializers.ValidationError("Booking with this ID does not exist.")

        # Check if the transaction failed
        if not transaction_success:
            raise serializers.ValidationError("Transaction Failed.")

        return data




from rest_framework import serializers
from .models import StaticPackage  # Ensure this is your MongoEngine model


class StaticPackageSerializer(serializers.Serializer):
    id = serializers.CharField(required=False)  # Adjust based on your ID type
    name = serializers.CharField(max_length=200)
    description = serializers.CharField(required=False, allow_blank=True)
    state = serializers.CharField(max_length=100)
    photos = serializers.ListField(child=serializers.URLField())
    rating = serializers.FloatField()
    number_of_person_views = serializers.IntegerField(default=0)
    price = serializers.FloatField()
    best_time = serializers.CharField(required=False, allow_blank=True)
    additional_info = serializers.CharField(required=False, allow_blank=True)
    category = serializers.ChoiceField(choices=[
        'ADVENTURE', 'BEACH', 'MOUNTAIN',
        'HISTORICAL', 'URBAN', 'WILDLIFE'
    ])
    type = serializers.ChoiceField(choices=[
        'LUXURY', 'DELUXE', 'ECONOMY'
    ])
    available_dates = serializers.ListField(child=serializers.DateTimeField())

    # Update slots to validate keys (fetch first 10 characters) and values (integers)
    slots = serializers.DictField(child=serializers.IntegerField())

    itinerary = serializers.ListField(child=serializers.DictField())

    def to_internal_value(self, data):
        """Convert incoming string data to the appropriate types."""
        if 'rating' in data:
            data['rating'] = float(data['rating'])
        if 'number_of_person_views' in data:
            data['number_of_person_views'] = int(data['number_of_person_views'])
        if 'price' in data:
            data['price'] = float(data['price'])
        return data

    def validate_name(self, value):
        """Check that the name is unique."""
        if StaticPackage.objects(name=value).first() is not None:
            raise serializers.ValidationError("This name is already in use.")
        return value

    def validate_rating(self, value):
        """Ensure the rating is between 0 and 5."""
        if not (0 <= value <= 5):
            raise serializers.ValidationError("Rating must be between 0 and 5.")
        return value

    def validate_price(self, value):
        """Ensure the price is positive."""
        if value < 0:
            raise serializers.ValidationError("Price must be a positive value.")
        return value

    def validate_slots(self, value):
        """
        Ensure that each slot key is truncated to the first 10 characters
        and each value is an integer.
        """
        new_slots = {}
        for key, val in value.items():
            truncated_key = key[:10]  # Fetch only the first 10 characters
            if not isinstance(val, int):
                raise serializers.ValidationError(f"Slot value for '{truncated_key}' must be an integer.")
            new_slots[truncated_key] = val  # Store the truncated key and value

        return new_slots  # Return the modified slots dictionary

    def create(self, validated_data):
        """Create and return a new `StaticPackage` instance."""
        static_package = StaticPackage(**validated_data)
        static_package.save()
        return static_package


class BookingHistorySerializer(serializers.Serializer):
    id = serializers.CharField()  # Assuming you want the ID
    gem = HiddenGemSerializer(allow_null=True)  # Example field, adjust as necessary
    package = CustomPackageSerializer(allow_null=True)  # Example field, adjust as necessary
    static_package = StaticPackageSerializer(allow_null=True)  # Example field, adjust as necessary
    guide = GuideSerializer(allow_null=True)  # Nested GuideSerializer
    cab = CabSerializer(allow_null=True)  # Nested CabSerializer
    booking_date = serializers.DateTimeField()
    price = serializers.FloatField()
    number_of_persons = serializers.IntegerField(default=0)
    status = serializers.ChoiceField(choices=['BOOKED', 'CANCELLED', 'PENDING'], default='PENDING')
    travel_date = serializers.DateTimeField()

    def create(self, validated_data):
        # Custom create logic here
        return BookingHistory.objects.create(**validated_data)

    def update(self, instance, validated_data):
        # Custom update logic here
        instance.gem = validated_data.get('gem', instance.gem)
        instance.package = validated_data.get('package', instance.package)
        instance.static_package = validated_data.get('static_package', instance.static_package)

        if 'guide' in validated_data:
            guide_data = validated_data.pop('guide')
            # Handle nested serializer for guide if needed

        if 'cab' in validated_data:
            cab_data = validated_data.pop('cab')
            # Handle nested serializer for cab if needed

        instance.save()
        return instance
from dateutil import parser

class StaticPackageSerializer(serializers.Serializer):
    id = serializers.CharField(required=False)  # Adjust based on your ID type
    name = serializers.CharField(max_length=200)
    description = serializers.CharField(required=False, allow_blank=True)
    state = serializers.CharField(max_length=100)
    photos = serializers.ListField(child=serializers.URLField())
    rating = serializers.FloatField()
    number_of_person_views = serializers.IntegerField(default=0)
    price = serializers.FloatField()
    best_time = serializers.CharField(required=False, allow_blank=True)
    additional_info = serializers.CharField(required=False, allow_blank=True)
    category = serializers.ChoiceField(choices=[
        'ADVENTURE', 'BEACH', 'MOUNTAIN',
        'HISTORICAL', 'URBAN', 'WILDLIFE'
    ])
    type = serializers.ChoiceField(choices=[
        'LUXURY', 'DELUXE', 'ECONOMY'
    ])
    available_dates = serializers.ListField(child=serializers.CharField())

    # Update slots to validate keys (fetch first 10 characters) and values (integers)
    slots = serializers.DictField(child=serializers.IntegerField())
    itinerary = serializers.ListField(child=serializers.DictField())

    def to_internal_value(self, data):
        """Convert incoming string data to the appropriate types."""
        if 'rating' in data:
            data['rating'] = float(data['rating'])
        if 'number_of_person_views' in data:
            data['number_of_person_views'] = int(data['number_of_person_views'])
        if 'price' in data:
            data['price'] = float(data['price'])

        # Convert available_dates to proper datetime objects
        if 'available_dates' in data:
            try:
                data['available_dates'] = [parser.parse(date_str) for date_str in data['available_dates']]
            except (ValueError, TypeError):
                raise serializers.ValidationError("Invalid date format in available_dates.")

        return data

    def validate_name(self, value):
        """Check that the name is unique."""
        if StaticPackage.objects(name=value).first() is not None:
            raise serializers.ValidationError("This name is already in use.")
        return value

    def validate_rating(self, value):
        """Ensure the rating is between 0 and 5."""
        if not (0 <= value <= 5):
            raise serializers.ValidationError("Rating must be between 0 and 5.")
        return value

    def validate_price(self, value):
        """Ensure the price is positive."""
        if value < 0:
            raise serializers.ValidationError("Price must be a positive value.")
        return value

    def validate_slots(self, value):
        """Ensure that each slot key is truncated to the first 10 characters and each value is an integer."""
        new_slots = {}
        for key, val in value.items():
            truncated_key = key[:10]  # Fetch only the first 10 characters
            if not isinstance(val, int):
                raise serializers.ValidationError(f"Slot value for '{truncated_key}' must be an integer.")
            new_slots[truncated_key] = val  # Store the truncated key and value

        return new_slots  # Return the modified slots dictionary

    def create(self, validated_data):
        """Create and return a new StaticPackage instance."""
        static_package = StaticPackage(**validated_data)
        static_package.save()
        return static_package

    def update(self, instance, validated_data):
        """Update and return an existing StaticPackage instance."""
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance