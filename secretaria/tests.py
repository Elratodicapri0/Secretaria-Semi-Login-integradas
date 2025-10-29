from django.test import TestCase
from django.core.exceptions import ValidationError
from secretaria.models import Responsavel, Aluno
from secretaria.validators import validar_cpf, validar_telefone

class ResponsavelModelTest(TestCase):
    """
    Testes para o modelo Responsavel.
    """

    def test_responsavel_criacao(self):
        """
        Verifica se um Responsavel pode ser criado com sucesso.
        """
        responsavel = Responsavel.objects.create(
            name="João da Silva",
            phone_number="62998765432",
            email="joao@example.com",
            adress="Rua das Flores, 123",
            cpf="12345678901",
            birthday="1980-01-01"
        )
        self.assertEqual(responsavel.name, "João da Silva")
        self.assertEqual(responsavel.cpf, "12345678901")
        self.assertIsInstance(responsavel, Responsavel)

    def test_responsavel_str_representacao(self):
        """
        Verifica a representação em string do modelo Responsavel.
        """
        responsavel = Responsavel.objects.create(
            name="Maria Santos",
            phone_number="62987654321",
            email="maria@example.com",
            adress="Avenida Central, 456",
            cpf="98765432109",
            birthday="1985-05-15"
        )
        self.assertEqual(str(responsavel), "Maria Santos")

    def test_responsavel_cpf_invalido(self):
        """
        Verifica se a validação de CPF funciona corretamente (testando um CPF repetido).
        """
        Responsavel.objects.create(
            name="Carlos Pereira",
            phone_number="62912345678",
            email="carlos@example.com",
            adress="Travessa da Paz, 789",
            cpf="11122233344",
            birthday="1990-10-20"
        )
        # Tenta criar um segundo responsavel com o mesmo CPF.
        with self.assertRaises(Exception): # Usar Exception é mais genérico, mas pode ser mais específico.
            Responsavel.objects.create(
                name="Ana Costa",
                phone_number="62923456789",
                email="ana@example.com",
                adress="Alameda dos Pinheiros, 101",
                cpf="11122233344",
                birthday="1992-12-25"
            )

class AlunoModelTest(TestCase):
    """
    Testes para o modelo Aluno.
    """

    def setUp(self):
        # Cria um responsável que será usado em todos os testes de aluno.
        self.responsavel = Responsavel.objects.create(
            name="Carlos Oliveira",
            phone_number="62933334444",
            email="carlos.o@example.com",
            adress="Rua Teste, 50",
            cpf="11111111111",
            birthday="1975-02-28"
        )

    def test_aluno_criacao(self):
        """
        Verifica se um Aluno pode ser criado com sucesso.
        """
        aluno = Aluno.objects.create(
            name_aluno="Pedro Diniz",
            phone_number_aluno="62955556666",
            email_aluno="pedro.d@example.com",
            cpf_aluno="22222222222",
            birthday_aluno="2005-03-10",
            class_choice="1A",
            month_choice="02",
            faltas_aluno="0",
            Responsavel=self.responsavel
        )
        self.assertEqual(aluno.name_aluno, "Pedro Diniz")
        self.assertEqual(aluno.Responsavel.name, "Carlos Oliveira")
        self.assertIsInstance(aluno, Aluno)

    def test_media_por_disciplina(self):
        """
        Verifica se o método media_por_disciplina calcula a média corretamente.
        """
        aluno = Aluno.objects.create(
            name_aluno="Larissa Lima",
            phone_number_aluno="62977778888",
            email_aluno="larissa.l@example.com",
            cpf_aluno="33333333333",
            birthday_aluno="2006-07-22",
            class_choice="2B",
            month_choice="03",
            faltas_aluno="2",
            Responsavel=self.responsavel
        )
        from .models import Bimestre, Nota
        bimestre1 = Bimestre.objects.create(numero=1)
        bimestre2 = Bimestre.objects.create(numero=2)

        Nota.objects.create(aluno=aluno, bimestre=bimestre1, valor=8.0, disciplina='MAT')
        Nota.objects.create(aluno=aluno, bimestre=bimestre2, valor=9.0, disciplina='MAT')

        media = aluno.media_por_disciplina('MAT')
        self.assertEqual(media, 8.5)