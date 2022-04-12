from django.urls import path
from base.views import user_views as views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', views.getUsers, name='getUsers'),
    path('register/', views.registerUser, name='registerUser'),
    path('profile/', views.getUserProfile, name='getUserProfile'),
    path('profile/update/', views.updateUserProfile, name='updateUserProfile'),
]