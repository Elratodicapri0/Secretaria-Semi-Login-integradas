# secretaria/admin.py

from django.contrib import admin
from django.utils.html import format_html
from .models import (
    Responsavel, Aluno, Professor, Bimestre, Nota, AtividadePendente,
    EventoExtracurricular, PagamentoPendente, Advertencia, Suspensao,
    EventoCalendario, EmprestimoLivro, Livro
)
from django.contrib.auth.models import Group, User
from django.apps import apps
import string
import random

# --- NOVAS IMPORTAÇÕES ---
from django.contrib.auth.hashers import make_password
from django.contrib import messages
# -------------------------


# O admin.py define como os dados serão exibidos no painel de administração do Django.

@admin.register(Responsavel)
class ResponsaveisAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_name', 'get_phone_number', 'get_email', 'get_adress', 'get_cpf', 'get_birthday')
    list_display_links = ('get_name',)
    search_fields = ('name', 'cpf',)
    list_filter = ('name', 'cpf',)
    
    # --- Esconde o campo 'user' do formulário ---
    exclude = ('user',)

    # --- CORRIGIDO: Lógica para criar ou associar o User automaticamente ---
    def save_model(self, request, obj, form, change):
        # Roda apenas na criação de um Responsavel novo
        if not change:
            try:
                # Tenta buscar um usuário com este CPF.
                # Se não existir, cria um novo usando os valores em 'defaults'.
                user, created = User.objects.get_or_create(
                    username=obj.cpf,
                    defaults={
                        'email': obj.email,
                        'password': make_password(obj.cpf), # Usa o CPF como senha inicial
                        'first_name': obj.name.split(' ')[0],
                        'last_name': ' '.join(obj.name.split(' ')[1:])
                    }
                )

                # Se o usuário foi criado agora (created == True)
                if created:
                    responsavel_group = Group.objects.get(name='Responsavel')
                    user.groups.add(responsavel_group)
                    print(f"Usuário {user.username} (Responsável) CRIADO.")
                    # Mensagem de sucesso para o admin (opcional)
                    self.message_user(request, f"Usuário {user.username} criado com sucesso.", messages.SUCCESS)
                else:
                    # Se o usuário já existia, apenas informa no console.
                    print(f"Usuário {user.username} (Responsável) já existia e foi associado.")
                    self.message_user(request, f"Usuário {user.username} já existia e foi associado a este responsável.", messages.INFO)

                # Associa o usuário (novo ou existente) ao objeto Responsavel
                obj.user = user

            except Exception as e:
                # Se algo der errado (ex: grupo 'Responsavel' não existe)
                print(f"ERRO ao criar ou associar usuário para o responsável {obj.name}: {e}")
                messages.error(request, f"Não foi possível criar ou associar o usuário de login. Erro: {e}")
                return # Interrompe o salvamento

        # Salva o objeto Responsavel (com o 'user' associado)
        super().save_model(request, obj, form, change)

    def get_name(self, obj):
        return obj.name
    get_name.short_description = 'Nome do Responsável'

    def get_phone_number(self, obj):
        return obj.phone_number
    get_phone_number.short_description = 'Celular'

    def get_email(self, obj):
        return obj.email
    get_email.short_description = 'E-mail'

    def get_adress(self, obj):
        return obj.adress
    get_adress.short_description = 'Endereço'

    def get_cpf(self, obj):
        return obj.cpf
    get_cpf.short_description = 'CPF'

    def get_birthday(self, obj):
        return obj.birthday
    get_birthday.short_description = 'Data de Nascimento'

@admin.register(Aluno)
class AlunosAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_turma', 'get_nome', 'get_celular', 'get_email', 'get_cpf', 'birthday_aluno', 'faltas_aluno')
    list_display_links = ('get_nome',)
    search_fields = ('name_aluno', 'cpf_aluno',)
    list_filter = ('class_choice',)

    # --- Esconde o campo 'user' do formulário ---
    exclude = ('user',)

    # --- CORRIGIDO: Lógica para criar ou associar o User automaticamente ---
    def save_model(self, request, obj, form, change):
        if not change: # Roda apenas na criação
            try:
                user, created = User.objects.get_or_create(
                    username=obj.cpf_aluno,
                    defaults={
                        'email': obj.email_aluno,
                        'password': make_password(obj.cpf_aluno), # Usa o CPF como senha inicial
                        'first_name': obj.name_aluno.split(' ')[0],
                        'last_name': ' '.join(obj.name_aluno.split(' ')[1:])
                    }
                )

                if created:
                    aluno_group = Group.objects.get(name='Aluno')
                    user.groups.add(aluno_group)
                    print(f"Usuário {user.username} (Aluno) CRIADO.")
                    self.message_user(request, f"Usuário {user.username} criado com sucesso.", messages.SUCCESS)
                else:
                    print(f"Usuário {user.username} (Aluno) já existia e foi associado.")
                    self.message_user(request, f"Usuário {user.username} já existia e foi associado a este aluno.", messages.INFO)
                
                obj.user = user

            except Exception as e:
                print(f"ERRO ao criar usuário para o aluno {obj.name_aluno}: {e}")
                messages.error(request, f"Não foi possível criar ou associar o usuário de login. Erro: {e}")
                return
        
        super().save_model(request, obj, form, change)

    def get_turma(self, obj):
        return obj.class_choice
    get_turma.short_description = 'Turma'

    def get_nome(self, obj):
        return obj.name_aluno
    get_nome.short_description = 'Nome do Aluno'

    def get_celular(self, obj):
        return obj.phone_number_aluno
    get_celular.short_description = 'Número de Celular'

    def get_email(self, obj):
        return obj.email_aluno
    get_email.short_description = 'E-mail do Aluno'

    def get_cpf(self, obj):
        return obj.cpf_aluno
    get_cpf.short_description = 'CPF do Aluno'

@admin.register(Professor)
class ProfessorAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_name', 'get_phone', 'get_email','get_cpf', 'get_birthday', 'get_matricula')
    list_display_links = ('get_name',)
    search_fields = ('name_professor', 'cpf_professor',)
    list_filter = ('name_professor', 'cpf_professor',)

    # --- Esconde o campo 'user' do formulário ---
    exclude = ('user',)

    # --- CORRIGIDO: Lógica para criar ou associar o User automaticamente ---
    def save_model(self, request, obj, form, change):
        if not change: # Roda apenas na criação
            try:
                user, created = User.objects.get_or_create(
                    username=obj.cpf_professor,
                    defaults={
                        'email': obj.email_professor,
                        'password': make_password(obj.cpf_professor), # Usa o CPF como senha inicial
                        'first_name': obj.name_professor.split(' ')[0],
                        'last_name': ' '.join(obj.name_professor.split(' ')[1:])
                    }
                )

                if created:
                    professor_group = Group.objects.get(name='Professor')
                    user.groups.add(professor_group)
                    print(f"Usuário {user.username} (Professor) CRIADO.")
                    self.message_user(request, f"Usuário {user.username} criado com sucesso.", messages.SUCCESS)
                else:
                    print(f"Usuário {user.username} (Professor) já existia e foi associado.")
                    self.message_user(request, f"Usuário {user.username} já existia e foi associado a este professor.", messages.INFO)

                obj.user = user

            except Exception as e:
                print(f"ERRO ao criar usuário para o professor {obj.name_professor}: {e}")
                messages.error(request, f"Não foi possível criar ou associar o usuário de login. Erro: {e}")
                return
        
        super().save_model(request, obj, form, change)

    def get_name(self, obj):
        return obj.name_professor
    get_name.short_description = 'Nome do Professor'

    def get_phone(self, obj):
        return obj.phone_number_professor
    get_phone.short_description = 'Celular'

    def get_email(self, obj):
        return obj.email_professor
    get_email.short_description = 'E-mail'

    def get_cpf(self, obj):
        return obj.cpf_professor
    get_cpf.short_description = 'CPF'

    def get_birthday(self, obj):
        return obj.birthday_professor
    get_birthday.short_description = 'Nascimento'

    def get_matricula(self, obj):
        return obj.matricula_professor
    get_matricula.short_description = 'Matrícula'

# Os registros abaixo permanecem como estavam
@admin.register(Bimestre)
class BimestreAdmin(admin.ModelAdmin):
    list_display = ('id', 'numero')
    list_filter = ('numero',)

@admin.register(EmprestimoLivro)
class EmprestimoMaterialAdmin(admin.ModelAdmin):
    list_display = ('id', 'tipo', 'livro', 'computador', 'aluno', 'data_emprestimo', 'devolvido', 'data_devolucao')
    list_filter = ('tipo', 'devolvido', 'data_emprestimo', 'livro', 'aluno')
    search_fields = ('livro__titulo', 'computador', 'aluno__name_aluno')

@admin.register(Livro)
class LivroAdmin(admin.ModelAdmin):
    list_display = ('id', 'titulo', 'autor', 'data_publicacao')
    search_fields = ('titulo', 'autor')
    list_filter = ('data_publicacao', 'autor')

@admin.register(Nota)
class NotaAdmin(admin.ModelAdmin):
    list_display = ('id', 'aluno', 'disciplina', 'bimestre', 'valor')
    list_filter = ('bimestre', 'aluno__class_choice', 'aluno', 'disciplina')
    ordering = ('bimestre', 'aluno__class_choice', 'aluno', 'disciplina')

@admin.register(AtividadePendente)
class AtividadePendenteAdmin(admin.ModelAdmin):
    list_display = ('id', 'aluno', 'disciplina', 'bimestre', 'descricao')
    list_filter = ('bimestre', 'aluno__class_choice','disciplina')
    ordering = ('bimestre', 'aluno__class_choice', 'disciplina')

@admin.register(EventoExtracurricular)
class EventoExtracurricularAdmin(admin.ModelAdmin):
    list_display = ('id', 'titulo', 'data', 'professor_id')
    search_fields = ('titulo', 'professor_id')
    list_filter = ('data',)

@admin.register(PagamentoPendente)
class PagamentoPendenteAdmin(admin.ModelAdmin):
    list_display = ('id', 'aluno', 'valor', 'data_vencimento', 'descricao')
    search_fields = ('aluno__cpf_aluno',)
    list_filter = ('data_vencimento',)
    autocomplete_fields = ['aluno']

@admin.register(Advertencia)
class AdvertenciaAdmin(admin.ModelAdmin):
    list_display = ('id', 'aluno', 'data', 'motivo')
    search_fields = ('aluno__cpf_aluno', 'aluno__name_aluno', 'motivo')
    list_filter = ('data', 'motivo',)
    autocomplete_fields = ['aluno']

@admin.register(Suspensao)
class SuspensaoAdmin(admin.ModelAdmin):
    list_display = ('id', 'aluno', 'data_inicio', 'data_fim', 'motivo')
    search_fields = ('aluno__cpf_aluno', 'aluno__name_aluno', 'motivo')
    list_filter = ('data_inicio', 'data_fim', 'motivo',)
    autocomplete_fields = ['aluno']

@admin.register(EventoCalendario)
class EventoCalendarioAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'tipo', 'data')
    list_filter = ('tipo', 'data')
    search_fields = ('titulo', 'descricao')

# Personalizações do site admin
apps.get_app_config('auth').verbose_name = 'Controle de Usuários'
admin.site.site_header = "Secretaria Master"
admin.site.site_title = "Painel Administrativo"
admin.site.index_title = "Administração do Sistema"
Group._meta.verbose_name = "Grupo"
Group._meta.verbose_name_plural = "Grupos"
User._meta.verbose_name = "Usuário"
User._meta.verbose_name_plural = "Usuários"