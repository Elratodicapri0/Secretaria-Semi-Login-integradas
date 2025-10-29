# core/urls.py
from django.contrib import admin
from django.urls import path, include
from secretaria import views

# GARANTIA 1: Importamos a NOSSA view de login customizada.
from secretaria.views import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # GARANTIA 2: A rota de token AGORA aponta para a NOSSA view.
    path('secretaria/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    path('secretaria/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('media/<int:aluno_id>/<str:disciplina>/', views.media_aluno_disciplina, name='media_aluno_disciplina'),
    path('calendario/', views.calendario_academico, name='calendario_academico'),
    path('', include('secretaria.urls')),
]
