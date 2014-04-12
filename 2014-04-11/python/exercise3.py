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
#VIEW(modelloMuriInterni)

arco=MAP(circle(0.5))(INTERVALS(1*PI)(32))
arco=JOIN(arco)

archetto=MAP(circle(0.2))(INTERVALS(1*PI)(32))
archettoDestro =T(1)(-0.3)(JOIN(archetto))
archettoSinistro =T(1)(0.3)(JOIN(archetto))
arcoSuperiore=DIFFERENCE([arco, archettoDestro, archettoSinistro])
arcoSuperiore=PROD([arcoSuperiore,Q(0.20)])

def disk3D(p): # point function
    u,v,z = p
    return [v*COS(u), v*SIN(u), z] # coordinate functions


#usato per svuotare
deep=0.22
cs=MAP(circle(0.5))(INTERVALS(1*PI)(32))
cs=JOIN(cs)
cs=PROD([cs,Q(deep)])

domain2D = PROD([INTERVALS(1*PI)(32), INTERVALS(0.66)(4)]) # 2D domain decompos
domain3D=(PROD([domain2D, INTERVALS(deep)(1)]))
cerchioEsterno=(MAP(disk3D)(domain3D))
cerchioEsterno=SKELETON(2)(DIFFERENCE([cerchioEsterno, cs]))#TRASPARENTE O NON?
arcoSuperiore=STRUCT([ cerchioEsterno, arcoSuperiore])
arcoSuperiore=R([1,2])(PI)(R([2,3])(PI/2)(arcoSuperiore))

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
arcoSuperiore=STRUCT([capitello, arcoSuperiore])

#coloninna
rColonnina=0.10
colonnina=cilindro([2*PI,rColonnina,2])
colonnina=T([2,3])([rColonnina, -2.2])(colonnina)

#capitello sotto
capitelloSotto=T(3)(-2.2)(capitello)
colonnina=STRUCT([capitello,colonnina,capitelloSotto])
colonninaDestra=T(1)(0.6)(colonnina)
colonninaSinitra=T(1)(-0.6)(colonnina)
arcoSuperiore=S([1,2,3])([0.7/0.5,4.5454545,2])(STRUCT([colonnina, arcoSuperiore, colonninaSinitra,colonninaDestra]))
#VIEW(arcoSuperiore)

#portone
#portInt=COLOR(Color4f([0.0, 0.0, 0.0, 0.0]))(cilindro([PI, 1.3, 0.05]))
portEst=coronaCircolare([PI,1.3,1.4,0.10])
portEst2=coronaCircolare([PI,1.4,1.5, 0.15])
muratura=SKELETON(2)(coronaCircolare([PI,1.5,2, 0.22]))
portoneSuperiore= STRUCT([ portEst, portEst2, muratura])

pil1=T([1,2])([1.3,-2])(CUBOID([0.1,2,0.10]))
pil2=T([1,2])([1.4,-2])(CUBOID([0.1,2,0.15]))
pil3=T([1,2])([1.5,-2])(CUBOID([0.5,2,0.22]))
#pil4=COLOR(Color4f([0.0, 0.0, 0.0, 0.0]))(T([1,2])([-1.3,-2])(CUBOID([2.6,2,0.05])))
pil5=T([1,2])([-1.4,-2])(CUBOID([0.1,2,0.10]))
pil6=T([1,2])([-1.5,-2])(CUBOID([0.1,2,0.15]))
pil7=T([1,2])([-2,-2])(CUBOID([0.5,2,0.22]))

portone=S([1,2,3])([7/3,2.5,10 ])(T(2)(2)(STRUCT([portoneSuperiore, pil1, pil2,pil3,pil5,pil6,pil7])))
portone=R([1,2])(PI)(R([2,3])(PI/2)(portone))
#VIEW(portone)

#finestra bassa
finestra= COLOR(Color4f([0.0, 0.5, 0.6, 0.0]))(CUBOID([2,0,3])) #TODO colore trasparente
corniceFinestra=DIFFERENCE([CUBOID([2,1,3]), T([1,3])([0.1,0.1])(CUBOID([1.8,1,2.8]))])
finestra=STRUCT([finestra,corniceFinestra])
#VIEW(finestra)

######### muro nord #############

riempimento=T(1)(-1)(CUBOID([41,0,40]))

#costruisco la sezione bassa del muro nord
finestre=T([1,3])([1,7])(finestra)
finestre=STRUCT([finestre, T(1)(3)(finestre)])
finestre=STRUCT([finestre, T(1)(8)(finestre)])
finestre=STRUCT([finestre,T(1)(24)(finestre)])
nordLow=STRUCT([T(1)(19.5)(portone),finestre])
#VIEW(nordLow)

#separatore tra piani
separatore=CYLINDER([0.25,41])(6)
separatore=T([1,2,3])([-1,1,11.5])(R([1,3])(-PI/2)(separatore))
separatore=STRUCT([separatore,T(3)(12)]*2)
#VIEW(separatore)

#costruisco sezione alta del muro
arcoSuperiore=T(3)(12+4.5)(arcoSuperiore)
a1=T(1)(2)(arcoSuperiore)
a2=T(1)(5)(arcoSuperiore)
sezioneArchisuperiori=STRUCT([a1,a2])
sezioneArchisuperiori=STRUCT([sezioneArchisuperiori,T(1)(8)]*2)
nordMid=STRUCT([sezioneArchisuperiori,T(1)(24)]*2)
ac=T(1)(19.5)(arcoSuperiore)
nordMid=STRUCT([nordMid,ac])
nordTop=STRUCT([T(3)(12)(nordMid)])

nord=STRUCT([nordMid,nordTop, nordLow, separatore, riempimento])
#VIEW(nord)


#################################costruisco la facciata est

#riempimento
riempimento=T(1)(-1)(CUBOID([55,0,40]))

#low
centro=26.5
f=T([1,3])([0,7])(finestra)
f1=T(1)(1.8)(f)
f2=T(1)(4.6)(f)
f3=T(1)(7.4)(f)
f4=T(1)(10.2)(f)
f5=T(1)(16)(f)
f6=T(1)(19)(f)

f1s=T(1)((centro-2.8)*2)(f1)
f2s=T(1)((centro-5.6)*2)(f2)
f3s=T(1)((centro-8.4)*2)(f3)
f4s=T(1)((centro-11.2)*2)(f4)
f5s=T(1)((centro-17)*2)(f5)
f6s=T(1)((centro-20)*2)(f6)

finestre=STRUCT([f1,f2,f3,f4,f5,f6,f1s,f2s,f3s,f4s,f5s,f6s])
estLow=STRUCT([T(1)(centro)(portone),finestre])
#VIEW(estLow)

#mid
a1=T(1)(2.8)(arcoSuperiore)
a2=T(1)(5.6)(arcoSuperiore)
a3=T(1)(8.4)(arcoSuperiore)
a4=T(1)(11.2)(arcoSuperiore)
a5=T(1)(17)(arcoSuperiore)
a6=T(1)(20)(arcoSuperiore)
a1s=T(1)((centro-2.8)*2)(a1)
a2s=T(1)((centro-5.6)*2)(a2)
a3s=T(1)((centro-8.4)*2)(a3)
a4s=T(1)((centro-11.2)*2)(a4)
a5s=T(1)((centro-17)*2)(a5)
a6s=T(1)((centro-20)*2)(a6)
ac=T(1)(centro)(arcoSuperiore)
estMid=STRUCT([a1,a2,a3,a4,a5,a6,a1s,a2s,a3s,a4s,a5s,a6s, ac])


#top
estTop=STRUCT([T(3)(12)(estMid)])

#separatore
#separatore tra piani
separatore=CYLINDER([0.25,55])(6)
separatore=T([1,2,3])([-1,1,11.5])(R([1,3])(-PI/2)(separatore))
separatore=STRUCT([separatore,T(3)(12)]*2)
#VIEW(separatore)


#mock-up
est=T(1)(1)(STRUCT([estMid,estTop,estLow,separatore,riempimento]))
west=R([2,1])(PI)(est)
west=T([1,2])([55, -41])(west)
we=STRUCT([est,west])
we=T(1)(41)(R([2,1])(PI/2)(we))
#we=STRUCT([we]+MKPOLS(([[0,0],[56,0]],[[0,1]])))

nord=T(1)(1)(nord)
sud=R([2,1])(PI)(nord)
sud=T([1,2])([41, -55])(sud)
ns=STRUCT([nord,sud])

mockUp=STRUCT([we,ns])
#VIEW(mockUp)

######################unifico gli edifici###########################
edificioPrimario=STRUCT([modelloMuriInterni, T([1,2])(VECTSUM([vettoreCentratore,[0,55]]))(mockUp)])
#VIEW(edificioPrimario)

#####################ALTRI EDIFICI RANDOM############################
V=[[0,0],[2,0],[4,0],[4,2],[4,4],[2,4],[0,4],[0,2],[2,2]]
FV=[[0,1,8,7],[7,6,5,8],[8,5,4,3],[3,2,1,8],[3,2,1,0,7,8]]

#converte le facce in edges
def face2edge(FV):
    edges = AA(sorted)(CAT([TRANS([face[:-1],face[1:]]) for face in FV]))
    edges = AA(str)(edges)
    edges = set(edges)
    edges = AA(eval)(edges)
    return edges

#print face2edge(CV)

#crea modello 1D delle edges (piantina)
EV = face2edge(FV)
evx = STRUCT((MKPOLS((V,FV))))
#VIEW(evx)

modelEdges = (V,EV)
modelFaces = (V,FV)

#AA(LIST) mette un livello di parentesi, rende ogni elemento una lista
V0 = AA(LIST)([0,3,6,9,12])
C0V = AA(LIST)(range(5))
C1V = [[0,1],[1,2],[2,3],[3,4]]

modelFloor = V0,C0V
modelWall = V0,C1V
#print V0,C0V

#modello 2D clonato per 4 volte, creando 2.5D
mod2D = larModelProduct([modelFaces,modelFloor])
#modello 2D (pianta) clonato per 4 volte, creando 2.5D
mod1D = larModelProduct([modelEdges,modelFloor])
#modello 2D (muri) cloani per 4 volte, creando 2.5D
mod11D = larModelProduct([modelEdges,modelWall])

modtot = STRUCT(AA(COLOR(BLUE))(MKPOLS(mod1D)+MKPOLS(mod2D)+MKPOLS(mod11D)))
#VIEW(modtot)


moltiModelli=[S([1,2])([10,10])(modtot)]
moltiModelli=T(2)(15)(moltiModelli)
moltiModelli=(S(3)(random.random()))(moltiModelli)
moltiModelli1=T(2)(15)(moltiModelli)
moltiModelli1=S(3)(random.random())(moltiModelli)
moltiModelli2=T(2)(15)(moltiModelli)
moltiModelli2=S(3)(random.random())(moltiModelli)

VIEW([moltiModelli, moltiModelli1,moltiModelli2])