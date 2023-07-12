from django.db import models

class Estacoes(models.Model):
    nome=models.CharField(max_length=30)

    def __str__(self) -> str:
        return self.nome
    
class Cadastro(models.Model):
    nome_pessoa = models.CharField(max_length=100)
    data=models.DateField(null=True)
    periodo=models.CharField(max_length=5)
    estacao=models.ForeignKey(Estacoes,on_delete=models.DO_NOTHING)

    def __str__(self) -> str:
        return self.nome_pessoa

class Pontuacao(models.Model):
    nome_pessoa=models.CharField(max_length=100)
    pontuacao=models.IntegerField()

    def __str__(self) -> str:
        return self.nome_pessoa