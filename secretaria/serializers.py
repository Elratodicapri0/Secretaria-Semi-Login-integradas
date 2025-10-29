# secretaria/serializers.py
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User
# --- CORREÇÃO IMPORTANTE APLICADA AQUI ---
from django.contrib.auth import authenticate # Importamos a função que faltava
# ----------------------------------------
from .models import (
    Responsavel, Aluno, Professor, Bimestre, Nota, 
    AtividadePendente, EventoExtracurricular, PagamentoPendente, 
    Advertencia, Suspensao, EventoCalendario, EmprestimoLivro, Livro
)

# === CLASSE DE AUTENTICAÇÃO ATUALIZADA (VERSÃO MAIS ROBUSTA) ===
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'cpf'

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Adiciona o username (CPF)
        token['username'] = user.username
        
        # --- MUDANÇA APLICADA AQUI ---
        # Buscamos o primeiro "Grupo" (cargo) do usuário e o adicionamos ao token.
        cargo = None
        if user.groups.exists():
            cargo = user.groups.first().name  # Pega o nome (ex: "Secretaria", "Professor")
        
        token['cargo'] = cargo # Adiciona a chave 'cargo' ao token
        # --- FIM DA MUDANÇA ---

        return token

    def validate(self, attrs):
        # Pega o CPF que o frontend enviou no campo 'cpf'
        cpf = attrs.get('cpf')
        password = attrs.get('password')

        if not cpf or not password:
            raise serializers.ValidationError('CPF e senha são obrigatórios.', code='authorization')

        # Usa a função authenticate do Django, passando o CPF como 'username'.
        user = authenticate(request=self.context.get('request'), username=cpf, password=password)

        if not user:
            raise serializers.ValidationError('CPF ou senha inválidos.', code='authorization')

        # Se a autenticação foi bem-sucedida, o resto do código gera os tokens.
        refresh = self.get_token(user)

        data = {}
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        return data


# --- RESTANTE DOS SEUS SERIALIZERS (SEM ALTERAÇÕES) ---
class ResponsavelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Responsavel
        fields = '__all__'

class ProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professor
        fields = '__all__'

class AlunoSerializer(serializers.ModelSerializer):
    responsavel_nome = serializers.StringRelatedField(source='Responsavel', read_only=True)
    responsavel = serializers.PrimaryKeyRelatedField(
        queryset=Responsavel.objects.all(),
        source='Responsavel',
        write_only=True
    )
    class Meta:
        model = Aluno
        fields = [
            'id', 'user', 'name_aluno', 'phone_number_aluno', 'email_aluno', 'cpf_aluno', 
            'birthday_aluno', 'class_choice', 'month_choice', 'faltas_aluno', 
            'ano_letivo', 'responsavel', 'responsavel_nome'
        ]

class BimestreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bimestre
        fields = '__all__'

class NotaSerializer(serializers.ModelSerializer):
    aluno_nome = serializers.StringRelatedField(source='aluno', read_only=True)
    bimestre_numero = serializers.StringRelatedField(source='bimestre', read_only=True)
    aluno = serializers.PrimaryKeyRelatedField(queryset=Aluno.objects.all(), write_only=True)
    bimestre = serializers.PrimaryKeyRelatedField(queryset=Bimestre.objects.all(), write_only=True)
    class Meta:
        model = Nota
        fields = [
            'id', 'aluno', 'aluno_nome', 'bimestre', 'bimestre_numero', 'valor', 'disciplina'
        ]

class AtividadePendenteSerializer(serializers.ModelSerializer):
    aluno_nome = serializers.StringRelatedField(source='aluno', read_only=True)
    bimestre_numero = serializers.StringRelatedField(source='bimestre', read_only=True)
    aluno = serializers.PrimaryKeyRelatedField(queryset=Aluno.objects.all(), write_only=True)
    bimestre = serializers.PrimaryKeyRelatedField(queryset=Bimestre.objects.all(), write_only=True)
    class Meta:
        model = AtividadePendente
        fields = [
            'id', 'aluno', 'aluno_nome', 'bimestre', 'bimestre_numero', 'disciplina', 'descricao'
        ]

class PagamentoPendenteSerializer(serializers.ModelSerializer):
    aluno_nome = serializers.StringRelatedField(source='aluno', read_only=True)
    aluno = serializers.PrimaryKeyRelatedField(queryset=Aluno.objects.all(), write_only=True)
    class Meta:
        model = PagamentoPendente
        fields = ['id', 'aluno', 'aluno_nome', 'valor', 'data_vencimento', 'descricao']

class AdvertenciaSerializer(serializers.ModelSerializer):
    aluno_nome = serializers.StringRelatedField(source='aluno', read_only=True)
    aluno = serializers.PrimaryKeyRelatedField(queryset=Aluno.objects.all(), write_only=True)
    class Meta:
        model = Advertencia
        fields = ['id', 'aluno', 'aluno_nome', 'data', 'motivo', 'observacao']

class SuspensaoSerializer(serializers.ModelSerializer):
    aluno_nome = serializers.StringRelatedField(source='aluno', read_only=True)
    aluno = serializers.PrimaryKeyRelatedField(queryset=Aluno.objects.all(), write_only=True)
    class Meta:
        model = Suspensao
        fields = ['id', 'aluno', 'aluno_nome', 'data_inicio', 'data_fim', 'motivo', 'observacao']

class EventoExtracurricularSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventoExtracurricular
        fields = '__all__'

class EventoCalendarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventoCalendario
        fields = '__all__'

class LivroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Livro
        fields = '__all__'

class EmprestimoLivroSerializer(serializers.ModelSerializer):
    aluno_nome = serializers.StringRelatedField(source='aluno', read_only=True)
    livro_titulo = serializers.StringRelatedField(source='livro', read_only=True)
    aluno = serializers.PrimaryKeyRelatedField(
        queryset=Aluno.objects.all(), 
        write_only=True
    )
    livro = serializers.PrimaryKeyRelatedField(
        queryset=Livro.objects.all(), 
        write_only=True,
        required=False,
        allow_null=True
    )
    class Meta:
        model = EmprestimoLivro
        fields = [
            'id', 'aluno', 'aluno_nome', 'livro', 'livro_titulo', 'tipo', 
            'computador', 'data_emprestimo', 'data_devolucao', 'devolvido'
        ]