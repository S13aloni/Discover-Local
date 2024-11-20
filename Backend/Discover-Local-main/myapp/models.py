import mongoengine as me
from datetime import datetime, timedelta


class HiddenGem(me.Document):
    CATEGORY_CHOICES = ('ADVENTURE', 'BEACH', 'MOUNTAIN', 'HISTORICAL', 'URBAN', 'WILDLIFE')
    name = me.StringField(required=True, max_length=200 , unique=True)
    description = me.StringField()
    state = me.StringField(required=True, max_length=100)
    photos = me.ListField(me.URLField(), required=False)
    rating = me.FloatField()
    number_of_person_views = me.IntField(default=0)  # Default to 0
    price = me.FloatField()
    best_time = me.StringField()
    additional_info = me.StringField()
    category = me.StringField(required=True, choices=CATEGORY_CHOICES)



    meta = {
        'collection': 'hidden_gems',
        'indexes': ['state', 'rating', 'category']
    }

    def increment_person_views(self, num_persons):
        self.number_of_person_views += num_persons
        self.save()


class Guide(me.Document):
    name = me.StringField(required=True, max_length=200)
    price = me.FloatField(required=True)
    available_dates = me.ListField(me.DateTimeField())

    rating = me.FloatField()
    state = me.StringField(required=True, max_length=200)
    image = me.ListField(me.URLField() , required=False)

    meta = {
        'collection': 'guides',
        'indexes': ['name', 'price']
    }


class CustomPackage(me.Document):
    name = me.StringField(required=True, max_length=200 , unique=True)
    places = me.ListField(me.ReferenceField(HiddenGem))
    state = me.StringField(required=True, max_length=100)
    price = me.FloatField()
    number_of_persons = me.IntField()
    user = me.ReferenceField('User')
    booked_at = me.DateTimeField(default=datetime.utcnow)
    guide = me.ReferenceField(Guide, null=True)  # Optional guide reference
    meta = {
        'collection': 'custom_packages'
    }


class User(me.Document):
    ROLE_CHOICES = ('ADMIN', 'GUIDE', 'USER')
    username = me.StringField(required=True, unique=True, max_length=100)
    email = me.EmailField(required=True, unique=True)
    password = me.StringField(required=True)
    contact_number = me.StringField(required=True, max_length=15)
    state = me.StringField(required=True, max_length=100)
    role = me.StringField(required=True, choices=ROLE_CHOICES, default='USER')  # Default role is 'normal_user'
    profile_picture = me.URLField(null=True ,required=False)
    # booking_history = me.EmbeddedDocumentListField('BookingHistory')
    meta = {
        'collection': 'users',
        'indexes': ['username', 'email']
    }

    def is_admin(self):
        return self.role == 'ADMIN'

    def is_guide(self):
        return self.role == 'GUIDE'

    def is_normal_user(self):
        return self.role == 'USER'


class OTP(me.Document):
    email = me.EmailField(required=True)
    otp = me.StringField(required=True)
    created_at = me.DateTimeField(default=datetime.utcnow)
    expires_at = me.DateTimeField(default=lambda: datetime.utcnow() + timedelta(minutes=5))

    meta = {
        'collection': 'otps',
        'indexes': ['email', 'otp', 'expires_at']
    }

    def is_expired(self):
        return self.expires_at < datetime.utcnow()


class Token(me.Document):
    user = me.ReferenceField(User, required=True)
    key = me.StringField(required=True, unique=True)
    created_at = me.DateTimeField(default=datetime.utcnow)
    expires_at = me.DateTimeField(default=lambda: datetime.utcnow() + timedelta(days=7))  # Token valid for 7 days by default

    meta = {
        'collection': 'tokens'
    }

    def is_valid(self):
        return self.expires_at > datetime.utcnow() if self.expires_at else True

# class Review(me.Document):
#     user = me.ReferenceField('User', required=True)
#     place = me.ReferenceField(HiddenGem, required=True)
#     comment = me.StringField(required=True, max_length=1000)
#     rating = me.FloatField(min_value=0, max_value=5)
#     created_at = me.DateTimeField(default=datetime.utcnow)
#
#     meta = {
#         'collection': 'reviews',
#         'indexes': ['user', 'place', 'rating']
#     }
#
#     @classmethod
#     def can_review(cls, user, place):
#         """Check if the user can review the given place."""
#         return any(
#             history.gem == place for history in user.booking_history
#         )

class Review(me.Document):
    user = me.ReferenceField('User', required=True)
    place = me.ReferenceField(HiddenGem, required=True)
    comment = me.StringField(required=True, max_length=1000)
    rating = me.FloatField(min_value=0, max_value=5)
    images = me.ListField(me.URLField(), required=False)  # Field to add images
    created_at = me.DateTimeField(default=datetime.utcnow)

    meta = {
        'collection': 'reviews',
        'indexes': ['user', 'place', 'rating']
    }

    @classmethod
    def can_review(cls, user, place):
        """Check if the user can review the given place."""
        return any(
            history.gem == place for history in user.booking_history
        )


################################################################################################
class Driver(me.Document):
    username = me.StringField(required=True, max_length=200)
    contact_number = me.StringField(required=True, max_length=15)
    state = me.StringField(required=True, max_length=100)
    available = me.BooleanField(default=True)
    password = me.StringField(required=True, max_length=10)
    role = me.StringField(default="DRIVER", required=False)
    cabs = me.ListField(me.ReferenceField('Cab'), default=list)  # List of associated cabs

    meta = {
        'collection': 'drivers',
        'indexes': ['state', 'available']
    }

class Cab(me.Document):
    driver = me.ReferenceField(Driver, required=True)
    car_name = me.StringField(required=True, max_length=200)
    number_plate = me.StringField(required=True, max_length=20)
    number_of_persons = me.IntField(required=True)
    price = me.FloatField(required=True)
    available = me.BooleanField(default=True)
    state = me.StringField(required=True, max_length=100)

    meta = {
        'collection': 'cabs',
        'indexes': ['available']
    }



# class BookingHistory(me.Document):
#     user = me.ReferenceField(User, null=True)
#     gem = me.ReferenceField(HiddenGem, null=True)
#     package = me.ReferenceField(CustomPackage, null=True)
#     guide = me.ReferenceField(Guide, null=True)
#     booking_date = me.DateTimeField(default=datetime.utcnow)
#     price = me.FloatField()
#     number_of_persons = me.IntField(default=0)  # Field to store the number of persons booked
#     cab=me.ReferenceField(Cab,null=True)


class Transaction(me.Document):
    STATUS_CHOICES = ('SUCCESS', 'FAILED', 'PENDING')

    user = me.ReferenceField('User', required=True)
    booking_date = me.DateTimeField(default=datetime.utcnow)
    hidden_gem = me.ReferenceField('HiddenGem', null=True)  # Either hidden gem or package will be referenced
    package = me.ReferenceField('CustomPackage', null=True)
    amount = me.FloatField(required=True)
    status = me.StringField(choices=STATUS_CHOICES, default='PENDING')
    transaction_success = me.BooleanField()  # Field for true/false from frontend
    created_at = me.DateTimeField(default=datetime.utcnow)

    meta = {
        'collection': 'transactions',
        'indexes': ['user', 'status', 'created_at']
    }

    def update_status(self):
        """Update transaction status based on the boolean value from frontend."""
        if self.transaction_success:
            self.status = 'SUCCESS'
        else:
            self.status = 'FAILED'
        self.save()
from mongoengine import Document, StringField, ListField, FloatField, IntField, EnumField, DateTimeField, DictField, \
    ReferenceField


class StaticPackage(Document):
    CATEGORY_CHOICES = (
        'ADVENTURE', 'BEACH', 'MOUNTAIN',
        'HISTORICAL', 'URBAN', 'WILDLIFE'
    )
    TYPE_CHOICES = (
        'LUXURY', 'DELUXE', 'ECONOMY'
    )

    name = StringField(required=True, max_length=200, unique=True)
    description = StringField()
    state = StringField(required=True, max_length=100)
    photos = ListField(StringField() , required=False)  # URLs for images
    rating = FloatField()
    number_of_person_views = IntField(default=0)  # Default to 0
    price = FloatField()
    best_time = StringField()
    additional_info = StringField()
    category = StringField(required=True, choices=CATEGORY_CHOICES)
    type = StringField(choices=TYPE_CHOICES, required=True)
    available_dates = ListField(DateTimeField())
    slots = DictField()  # Dictionary to hold available slots for each day
    itinerary = ListField(DictField())  # Day-wise itinerary with images

    def is_available(self, date):
        return date in self.available_dates

class ItineraryItem(Document):
    day = IntField(required=True)  # Day number in the itinerary
    description = StringField()
    images = ListField(StringField() ,required=False)  # URLs for images related to the day's itinerary
    static_package = ReferenceField(StaticPackage)  # Link back to the StaticPackage

    meta = {
        'collection': 'itinerary_items'
    }



class BookingHistory(me.Document):
    user = me.ReferenceField(User, null=True)
    gem = me.ReferenceField(HiddenGem, null=True)
    package = me.ReferenceField(CustomPackage, null=True)
    static_package = me.ReferenceField(StaticPackage ,null=True)
    guide = me.ReferenceField(Guide, null=True)
    cab = me.ReferenceField(Cab, null=True)
    booking_date = me.DateTimeField(default=datetime.utcnow)
    price = me.FloatField()
    number_of_persons = me.IntField(default=0)  # Field to store the number of persons booked
    transaction = me.ReferenceField('Transaction', null=True)  # Reference to the transaction record
    status = me.StringField(choices=('BOOKED', 'CANCELLED' , 'PENDING', 'FAILED'), default='PENDING')
    package = me.ReferenceField(CustomPackage, null=True, required=False)
    travel_date = me.DateTimeField(required=True)  # Add travel date field
    meta = {
        'collection': 'booking_history',
        'indexes': ['user', 'gem', 'package', 'status']
    }

    def cancel_booking(self):
        """Allow the user to cancel the booking only if within 10 days of the booking date."""
        if (datetime.utcnow() - self.booking_date).days <= 10:
            self.status = 'CANCELLED'
            self.save()
        else:
            raise ValueError("Cannot cancel booking after 10 days.")

