from django.contrib import admin
from django.urls import path, include
from api import views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include ('loeffa.urls')),
    path('estacoes/', views.PegarEstacao),
    path('cadastro/',views.Cadastros),
    path('cadastrodel/<int:id>',views.DeletarCadastro),
    path('pontuacao/',views.PontuacaoAdd),
    path('pontuacaomod/<int:id>',views.PontuacaoMod),
]
