#secretaria/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserRegistrationBySecretariaView
from .views import PasswordResetRequestView, PasswordResetConfirmView # Adicione
from .views import (
    ResponsavelViewSet,
    AlunoViewSet,
    ProfessorViewSet,
    BimestreViewSet,
    NotaViewSet,
    AtividadePendenteViewSet,
    EventoExtracurricularViewSet,
    PagamentoPendenteViewSet,
    AdvertenciaViewSet,
    SuspensaoViewSet,
    EventoCalendarioViewSet,
    LivroViewSet,
    EmprestimoLivroViewSet,
)

router = DefaultRouter()

router.register(r'responsaveis', ResponsavelViewSet)
router.register(r'professores', ProfessorViewSet)
router.register(r'alunos', AlunoViewSet)
router.register(r'bimestres', BimestreViewSet)
router.register(r'notas', NotaViewSet)
router.register(r'atividades-pendentes', AtividadePendenteViewSet)
router.register(r'eventos-extracurriculares', EventoExtracurricularViewSet)
router.register(r'pagamentos-pendentes', PagamentoPendenteViewSet)
router.register(r'advertencias', AdvertenciaViewSet)
router.register(r'suspensoes', SuspensaoViewSet)
router.register(r'eventos-calendario', EventoCalendarioViewSet)
router.register(r'livros', LivroViewSet)
router.register(r'emprestimos', EmprestimoLivroViewSet)

# O frontend vai acessar as URLs a partir de 'api/'
# Ex: /api/alunos/, /api/professores/
urlpatterns = [
    path('api/', include(router.urls)),
    path('api/secretaria/create-user/', UserRegistrationBySecretariaView.as_view(), name='secretaria_create_user'), # Nova URL
    path('api/password-reset/request/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('api/password-reset/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]