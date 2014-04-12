import sys
sys.path.insert(0, '/home/di-folca/lar-cc/lib/py/')
from simplexn import *
from larcc import *
from lar2psm import *
from largrid import *
from morph import *
from mapper import *
from lar2psm import *
from largrid import *
from morph import *
from mapper import *
from numpy import *

#funzione di appoggio che mi serve per moltiplicare tutti i vertici al valore per generare la simmetria
def simmetria(vec, asse):
	w,z=asse
	return [[x*w,y*z] for x,y in vec]

#variabile molto usata
vettoreCentratore=[-19.5,-26.5]

#disegno l'area sinistra
VareaSinistra=[[0,0],[7,0],[8,0],[15,0],[16,0],
[7,1],[8,1],[7,2],[8,2],[7,7],
[8,7],[15,7],[16,7],[16.5,7],[16.5,8],
[16,8],[15,8],[8,8],[7,8],[7,12],
[8,12],[7,13],[8,13],[0,14],[7,14],
[2,14],[0,15],[7,15],[2,15],[0,22],
[7,22],[8,22],[0,23],[7,25],[8,23],
[1,14],[1,15],[0,26.5],[12,26.5],[12,14],
[19.5,14],[19.5,0],[8,26.5],[12,8], [19.5,8]]

#disegno gli spigolli dell'area sinistra
EArea=[[1,5],[2,6],[3,4],[1,2],[3,11],[4,12],[7,9],[7,8],[8,10],[9,10],[10,11],[10,17],[11,12],[12,13],[12,15],[13,14],
[14,15],[15,16],[16,17],[17,20],[18,19],[19,20],[21,22],[21,24],[22,34],[24,25],[25,28],[28,27],[23,35],[36,26],[36,35],[27,30],[30,29],[32,34],[9,18],[5,6]]

#disegno il pavimento dell'area in basso a sinistra
CVArea=[[0,1,24,23],[5,7,8,6],[6,2,3,11,10],[19,20,22,21],[25,35,36,28],[26,27,30,29],[32,37,42,34],[42,38,43,17],[39,40,44,43],[15,44,41,4]]


#sposto l'oggetto e sfrutto la simmetria degli assi per generare sezioni uguali dell'edificio
VareaSinistra=translatePoints(VareaSinistra,vettoreCentratore)
VareaSinistraSopra=simmetria(VareaSinistra, [1,-1])
VareaDestra=simmetria(VareaSinistra, [-1,1])
VareaDestraSopra=simmetria(VareaSinistra,[-1,-1])

#individuo i LAR oggetti per gli spigoli
modelEdges4=VareaSinistra,EArea
modelEdges2=VareaDestraSopra,EArea
modelEdges3=VareaDestra, EArea
modelEdges1=VareaSinistraSopra, EArea

#individuo i LAR oggetti per i piani
modelfloor4=VareaSinistra,CVArea
modelfloor2=VareaDestraSopra, CVArea
modelfloor3=VareaDestra, CVArea
modelfloor1=VareaSinistraSopra, CVArea

#Identifico un dominio per generare i vari piani e i muri
V0 = AA(LIST)([0,12,24,36])
C0V = AA(LIST)(range(4))
C1V = [[0,1],[1,2],[2,3]]
modelFloor = V0,C0V
modelWall = V0,C1V

#genero i modelli per il muro
muro3D1=larModelProduct([modelEdges1,modelWall])
muro3D2=larModelProduct([modelEdges2,modelWall])
muro3D3=larModelProduct([modelEdges3,modelWall])
muro3D4=larModelProduct([modelEdges4,modelWall])
#genero i modelli per il piano
piano3D1=larModelProduct([modelfloor1,modelFloor])
piano3D2=larModelProduct([modelfloor2,modelFloor])
piano3D3=larModelProduct([modelfloor3,modelFloor])
piano3D4=larModelProduct([modelfloor4,modelFloor])

piani=AA(COLOR(RED))(MKPOLS(piano3D1)+MKPOLS(piano3D2)+MKPOLS(piano3D3)+MKPOLS(piano3D4))
muri=MKPOLS(muro3D1)+MKPOLS(muro3D2)+MKPOLS(muro3D3)+MKPOLS(muro3D4)
#modelloMuriInterni=STRUCT(muri+piani)
#VIEW(modelloMuriInterni)

#costruisco rifiniture per le porte CON LO STESSO PROCEDIMENTO
Vporte=[[7,1],[8,1],[7,2],[8,2],[7,12],[8,12],[7,13],[8,13],[2,14],[1,14],[1,15],[2,15]]
Eporte=[[0,2],[1,3],[4,6],[7,5],[9,8],[10,11]]
Vporte4=translatePoints(Vporte,vettoreCentratore)
Vporte1=simmetria(Vporte4, [1,-1])
Vporte2=simmetria(Vporte4, [-1,1])
Vporte3=simmetria(Vporte4,[-1,-1])
modelEdges4=Vporte4,Eporte
modelEdges2=Vporte2,Eporte
modelEdges3=Vporte3,Eporte
modelEdges1=Vporte1,Eporte
V0 = AA(LIST)([2,12,14,24,26,36])
C1V = [[0,1],[2,3],[4,5]]
modelWall = V0,C1V
porte3D1=larModelProduct([modelEdges1,modelWall])
porte3D2=larModelProduct([modelEdges2,modelWall])
porte3D3=larModelProduct([modelEdges3,modelWall])
porte3D4=larModelProduct([modelEdges4,modelWall])
porte=MKPOLS(porte3D1)+MKPOLS(porte3D2)+MKPOLS(porte3D3)+MKPOLS(porte3D4)

modelloMuriInterni=STRUCT(porte+muri+piani)
#VIEW(modelloMuriInterni)

#aggiungo un riempimento del soffitto
soffitto=DIFFERENCE([CUBOID([39,53,1.95]),(T([1,2])([13,15])(CUBOID([13,23,1.95])))])
soffitto=T([1,2,3])([-19.5,-26.5,10])(soffitto)
soffitti = STRUCT([soffitto, T(3)(12)] *3)
modelloMuriInterni=STRUCT([soffitti,modelloMuriInterni])
#VIEW(modelloMuriInterni)

#aggiungo riempimento muro interno
Vriempimento= translatePoints([[13,15],[26,15],[13,38],[26,38]], vettoreCentratore)
edge=[[0,1],[0,2],[1,3],[2,3]]
V0 = AA(LIST)([12,24,36])
C1V = [[0,1],[1,2]]
modelWall = V0,C1V
riempimento=larModelProduct([(Vriempimento,edge),modelWall])
riempimento=STRUCT(MKPOLS(riempimento))
modelloMuriInterni=STRUCT([riempimento,modelloMuriInterni])
#VIEW(modelloMuriInterni)

#aggiungo colonnato
def circle(r):
    def circle0(p):
        alpha = p[0]
        return [r*COS(alpha), r*SIN(alpha)]
    return circle0

def cilindro(p):
    u,v,z=p
    domain2D= PROD([INTERVALS(u)(32), INTERVALS(v)(1)]) # 2D domain decompos
    domain3D=(PROD([domain2D, INTERVALS(z)(1)]))
    return (MAP(disk3D)(domain3D))

def coronaCircolare(p):
    angle, rInizio, rFine, deep=p
    cs=cilindro([angle,rInizio, deep])
    cerchioEsterno=cilindro([angle,rFine, deep])
    return DIFFERENCE([cerchioEsterno, cs])

def disk3D(p): # point function
	u,v,z = p
	return [v*COS(u), v*SIN(u), z] # coordinate functions

#tutto per fare un capitello
verts = [[0.20,0],[0.16,0],[0.16,0.2]]
cells = [[1,2,3]]
pols = None
latos = MKPOL([verts, cells, pols])
latos = PROD([latos, Q(0.2)])
vert = [[ -0.04,0],[ 0,0],[ 0,0.2]]
latod = MKPOL([vert, cells, pols])
latod = PROD([latod, Q(0.2)])
corpo=CUBOID([0.16,0.20,0.20])
capitello=R([2,3])(PI/2)(STRUCT([latod, latos, corpo]))
capitello=R([1,2])(PI)(T([1,3])([-0.08, -0.2])(capitello))

#POSIZIONO IL CAPITELLO
colonna=STRUCT([capitello])

#coloninna
rColonnina=0.10
colonnina=cilindro([2*PI,rColonnina,2])
colonnina=T([2,3])([rColonnina, -2.2])(colonnina)
colonna=STRUCT([colonnina, colonna])

#capitello sotto
capitello=T(3)(-2.2)(capitello)
colonna=STRUCT([capitello, colonna])
colonna=T([1,2,3])([12, 14, 10])(S([1,2,3])([5,5,4.166666666667])(colonna))

#accorpo i colonnati
colonnatoOrizzontale=T([1,2])(VECTSUM([vettoreCentratore, [0.5,0]])) (STRUCT( [colonna,T(1)(4.75)] *4))
colonnatoOrizzontaleSopra=T(2)(24)(colonnatoOrizzontale)
colonnatoVerticale=T([1,2])(VECTSUM([vettoreCentratore, [0.5,5]]))(STRUCT( [colonna,T(2)(5)] *4))
colonnatoVerticaleLato=T(1)(14)(colonnatoVerticale)

#capitello sotto
modelloMuriInterni=STRUCT([modelloMuriInterni,colonnatoOrizzontale,colonnatoOrizzontaleSopra,colonnatoVerticale,colonnatoVerticaleLato])
#VIEW(modelloMuriInterni)

#il tetto approssimato
Vtetto=[[-1,-1,4],[40,-1,4],[-1,54,4],[40,54,4],[13.5,15.5,0],[26.5,15.5,0],[13.5,38.5,0],[26.5,38.5,0]]
Ctetto=[[0,2,6,4],[0,1,5,4],[1,5,7,3],[2,6,7,3]]

Vtetto=[[-1,-1,4],[40,-1,4],[-1,54,4],[40,54,4],[13.5,15.5,0],[26.5,15.5,0],[13.5,38.5,0],[26.5,38.5,0]]
Ctetto=[[0,4, 6, 2],[0,1,5,4],[1,5,7,3],[2,6,7,3]]
tetto=MKPOLS((Vtetto,Ctetto))
tetto=COLOR(RED)(T([1,2])(vettoreCentratore)(STRUCT(tetto)))
tetto=T(3)(36)(tetto)
modelloMuriInterni=STRUCT([modelloMuriInterni, tetto])
VIEW(modelloMuriInterni)