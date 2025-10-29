# secretaria/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied
from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .permissions import IsSecretaria
from django.contrib.auth.models import User, Group
from django.db import transaction
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer
import random
import string
from django.core.mail import send_mail
from django.conf import settings
from datetime import datetime, timedelta
from django.utils import timezone
import uuid

# --- CORREÇÃO APLICADA AQUI ---
# Adicionamos PasswordResetToken à lista de modelos importados.
from .models import (
    Responsavel, Aluno, Professor, Bimestre, Nota, AtividadePendente,
    EventoExtracurricular, PagamentoPendente, Advertencia, Suspensao,
    EventoCalendario, EmprestimoLivro, Livro, PasswordResetToken
)
# ---------------------------------

from .serializers import (
    ResponsavelSerializer, AlunoSerializer, ProfessorSerializer, BimestreSerializer,
    NotaSerializer, AtividadePendenteSerializer, EventoExtracurricularSerializer,
    PagamentoPendenteSerializer, AdvertenciaSerializer, SuspensaoSerializer,
    EventoCalendarioSerializer, EmprestimoLivroSerializer, LivroSerializer
)
from .permissions import IsSecretaria, IsProfessor, IsResponsavel, IsAluno
from rest_framework.decorators import action

# Funções de views HTML
def calendario_academico(request):
    eventos = EventoCalendario.objects.order_by('data')
    return render(request, 'calendario.html', {'eventos': eventos})

def media_aluno_disciplina(request, aluno_id, disciplina):
    aluno = get_object_or_404(Aluno, id=aluno_id)
    media = aluno.media_por_disciplina(disciplina)
    return render(request, 'media_aluno.html', {
        'aluno': aluno,
        'disciplina': disciplina,
        'media': media,
    })


# ViewSets de CRUD Total (Apenas para a Secretaria)
class ResponsavelViewSet(viewsets.ModelViewSet):
    queryset = Responsavel.objects.all()
    serializer_class = ResponsavelSerializer
    permission_classes = [IsSecretaria]

class ProfessorViewSet(viewsets.ModelViewSet):
    queryset = Professor.objects.all()
    serializer_class = ProfessorSerializer
    permission_classes = [IsSecretaria]

class AlunoViewSet(viewsets.ModelViewSet):
    queryset = Aluno.objects.all()
    serializer_class = AlunoSerializer
    permission_classes = [IsSecretaria]

# ViewSets com Permissões Múltiplas e Filtros de Objeto
class NotaViewSet(viewsets.ModelViewSet):
    queryset = Nota.objects.all()
    serializer_class = NotaSerializer

    def get_queryset(self):
        user = self.request.user
        if IsSecretaria().has_permission(self.request, self) or IsProfessor().has_permission(self.request, self):
            return Nota.objects.all()
        elif IsResponsavel().has_permission(self.request, self):
            return Nota.objects.filter(aluno__Responsavel__user=user)
        elif IsAluno().has_permission(self.request, self):
            return Nota.objects.filter(aluno__user=user)
        
        return Nota.objects.none()

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            self.permission_classes = [IsSecretaria | IsProfessor]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

class AtividadePendenteViewSet(viewsets.ModelViewSet):
    queryset = AtividadePendente.objects.all()
    serializer_class = AtividadePendenteSerializer

    def get_queryset(self):
        user = self.request.user
        if IsSecretaria().has_permission(self.request, self) or IsProfessor().has_permission(self.request, self):
            return AtividadePendente.objects.all()
        elif IsResponsavel().has_permission(self.request, self):
            return AtividadePendente.objects.filter(aluno__Responsavel__user=user)
        elif IsAluno().has_permission(self.request, self):
            return AtividadePendente.objects.filter(aluno__user=user)
        
        return AtividadePendente.objects.none()

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            self.permission_classes = [IsSecretaria | IsProfessor]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

# ... (Restante das suas Views originais) ...

class PagamentoPendenteViewSet(viewsets.ModelViewSet):
    queryset = PagamentoPendente.objects.all()
    serializer_class = PagamentoPendenteSerializer
    # ... (lógica de permissões) ...

class AdvertenciaViewSet(viewsets.ModelViewSet):
    queryset = Advertencia.objects.all()
    serializer_class = AdvertenciaSerializer
    # ... (lógica de permissões) ...

class SuspensaoViewSet(viewsets.ModelViewSet):
    queryset = Suspensao.objects.all()
    serializer_class = SuspensaoSerializer
    # ... (lógica de permissões) ...

class EventoExtracurricularViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = EventoExtracurricular.objects.all()
    serializer_class = EventoExtracurricularSerializer
    permission_classes = [IsAuthenticated]

# -----------------------------------------------------------------
# ARQUIVO MODIFICADO AQUI (Isso corrige o Erro 405 Method Not Allowed)
# -----------------------------------------------------------------
class EventoCalendarioViewSet(viewsets.ModelViewSet): # <--- 1. MUDANÇA AQUI (de ReadOnlyModelViewSet)
    queryset = EventoCalendario.objects.all()
    serializer_class = EventoCalendarioSerializer
    
    # 2. LÓGICA DE PERMISSÃO ADICIONADA AQUI
    def get_permissions(self):
        """
        Define permissões diferentes para ações diferentes.
        - Secretaria pode fazer TUDO (CRUD).
        - Outros usuários logados podem apenas LER (GET).
        """
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            # Ações de escrita (POST, PUT, PATCH, DELETE)
            # Apenas a Secretaria pode modificar o calendário
            self.permission_classes = [IsSecretaria]
        else:
            # Ações de leitura (GET - list, retrieve)
            # Qualquer usuário logado pode ver o calendário
            self.permission_classes = [IsAuthenticated]
            
        return super().get_permissions()
# -----------------------------------------------------------------
# FIM DA MODIFICAÇÃO
# -----------------------------------------------------------------

class LivroViewSet(viewsets.ModelViewSet):
    queryset = Livro.objects.all()
    serializer_class = LivroSerializer
    # ... (lógica de permissões) ...

class EmprestimoLivroViewSet(viewsets.ModelViewSet):
    queryset = EmprestimoLivro.objects.all()
    serializer_class = EmprestimoLivroSerializer
    # ... (lógica de permissões) ...

class BimestreViewSet(viewsets.ModelViewSet):
    queryset = Bimestre.objects.all()
    serializer_class = BimestreSerializer
    # ... (lógica de permissões) ...

class UserRegistrationBySecretariaView(APIView):
    permission_classes = [IsSecretaria] # Apenas a secretaria pode acessar

    @transaction.atomic # Garante que todas as operações no banco sejam feitas com sucesso, ou nenhuma é feita.
    def post(self, request):
        # ... (código existente que está funcionando) ...
        full_name = request.data.get('full_name')
        cpf = request.data.get('cpf')
        email = request.data.get('email')
        phone_number = request.data.get('phone_number')
        cargo = request.data.get('cargo') # 'aluno', 'responsavel', 'professor'
        birthday = request.data.get('birthday')
        password = request.data.get('password')

        required_fields = [full_name, cpf, email, phone_number, cargo, birthday, password]
        if not all(required_fields):
            return Response({'error': 'Todos os campos são obrigatórios.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'error': 'Este e-mail já está em uso.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.create_user(username=cpf, email=email, password=password)
            user.first_name = full_name.split(' ')[0]
            user.last_name = ' '.join(full_name.split(' ')[1:])
            user.save()
        except Exception as e:
            return Response({'error': f'Erro ao criar usuário: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            if cargo.lower() == 'aluno':
                group = Group.objects.get(name='Aluno')
                Aluno.objects.create(
                    user=user, name_aluno=full_name, cpf_aluno=cpf, email_aluno=email, 
                    phone_number_aluno=phone_number, birthday_aluno=birthday
                    # Atenção: Faltarão outros campos obrigatórios de Aluno
                )
            elif cargo.lower() == 'responsavel':
                group = Group.objects.get(name='Responsavel')
                Responsavel.objects.create(
                    user=user, name=full_name, cpf=cpf, email=email, 
                    phone_number=phone_number, birthday=birthday
                )
            elif cargo.lower() == 'professor':
                group = Group.objects.get(name='Professor')
                Professor.objects.create(
                    user=user, name_professor=full_name, cpf_professor=cpf, email_professor=email,
                    phone_number_professor=phone_number, birthday_professor=birthday
                )
            else:
                user.delete() 
                return Response({'error': 'Cargo inválido.'}, status=status.HTTP_400_BAD_REQUEST)

            user.groups.add(group)
        except Group.DoesNotExist:
             return Response({'error': f'O grupo {cargo} não foi encontrado. Crie-o no painel admin.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({'error': f'Erro ao criar perfil: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'success': f'Usuário {full_name} ({cargo}) criado com sucesso!'}, status=status.HTTP_201_CREATED)
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# --- VIEWS DE RESET DE SENHA (USANDO O NOVO MÉTODO DE TOKEN) ---
class PasswordResetRequestView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'success': 'Se um usuário com este e-mail existir, um link de redefinição foi enviado.'}, status=status.HTTP_200_OK)

        PasswordResetToken.objects.filter(user=user).delete()
        
        token_obj = PasswordResetToken.objects.create(user=user)
        
        reset_link = f"http://localhost:5173/resetar-senha/{token_obj.token}"
        
        subject = 'Seu link de redefinição de senha'
        message = f'Olá, {user.first_name}.\n\nClique no link a seguir para redefinir sua senha:\n{reset_link}\n\nEste link expira em 1 hora.'
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user.email])

        return Response({'success': 'Se um usuário com este e-mail existir, um link de redefinição foi enviado.'}, status=status.HTTP_200_OK)


class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        token_from_request = request.data.get('token')
        new_password = request.data.get('password')

        try:
            token_obj = PasswordResetToken.objects.get(token=token_from_request)

            if token_obj.created_at < timezone.now() - timedelta(hours=1):
                token_obj.delete()
                return Response({'error': 'O token de redefinição expirou.'}, status=status.HTTP_400_BAD_REQUEST)

            user = token_obj.user
            user.set_password(new_password)
            user.save()

            token_obj.delete()
            
            return Response({'success': 'Senha redefinida com sucesso!'}, status=status.HTTP_200_OK)
        
        except (PasswordResetToken.DoesNotExist, ValueError):
             return Response({'error': 'Token inválido.'}, status=status.HTTP_400_BAD_REQUEST)