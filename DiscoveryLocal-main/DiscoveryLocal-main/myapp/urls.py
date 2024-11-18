from django.urls import path
from . import views
urlpatterns = [
    # user API's
    path('signup/', views.RegisterUserView.as_view()),
    path('verify-otp/', views.VerifyOTPAndRegisterView.as_view()),
    path('login/' , views.Loginuser.as_view()),
    path('logout/' , views.Logoutuser.as_view()),

    # path('users/', views.get_all_users),

    # admin API's
    path('hidden_gems/', views.HiddenGemList.as_view()),
    path('hidden_gems/<str:pk>/', views.HiddenGemDetail.as_view()),

    # Guide API's
    path('get_all_guides/' , views.GetAllGuides.as_view()),
    path('get_all_cabs/' , views.GetAllCabs.as_view()),
    path('guides/', views.GuideListCreateAPIView.as_view()),
    path('guides/<str:pk>/', views.GuideDetailAPIView.as_view()),
    path('book-guide/', views.BookGuideAPIView.as_view(), name='book-guide'),

    # custompackage API's
    path('custom-package/',views.CreateCustomPackage.as_view()),
    # Booking API's
    path('booking-history/',views.BookingHistoryListCreateView.as_view()),
    path('booking-history1/', views.UserBookingHistory.as_view()),
    path('static_package/<str:pk>/', views.StaticPackageDetail.as_view(), name='static-package-detail'),

    path('bookhiddengem/',views.BookHiddenGem.as_view()),
    path('bookcustompackage/' , views.BookCustomPackage.as_view()),
    path('bookstaticpackage/' , views.BookStaticPackage.as_view()),
    # Review and rating API's'
    path('trasaction/', views.TransactionView.as_view(), name='transaction'),
    path('verify-transaction/', views.VerifyOTPAndTransactionView.as_view(), name='verify-transaction/'),
    path('cancel_booking/' , views.CancelBooking.as_view(), name='cancel-booking'),

    path('add_static_package/' , views.StaticPackageList.as_view(), name='add-static'),

    path('reviews/', views.ReviewListAPIView.as_view(), name='review-list'),
    path('reviews/create/', views.ReviewCreateAPIView.as_view(), name='review-create'),

#     driver API's
    path('drivers/', views.DriverListCreateView.as_view(), name='driver-list-create'),
    path('drivers/<str:pk>/', views.DriverRetrieveUpdateDestroyView.as_view(), name='driver-detail'),


#     cab API's
    path('cabs/', views.CabListCreateView.as_view(), name='cab-list-create'),
    path('cabs/<str:pk>/', views.CabDetailView.as_view(), name='cab-detail'),
    path('cab_book/', views.BookCabView.as_view()),

    path('userprofile/', views.UserBookingHistoryView.as_view(), name='user-booking-history'),
]