from django.urls import path
from . import views

urlpatterns=[
    path('notes/',views.Notes),
    path('notes/<str:pk>/', views.Notewithid),
]