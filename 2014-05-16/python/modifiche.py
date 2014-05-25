import sys
sys.path.insert(0, '/home/di-folca/lar-cc-nuovo/lib/py/')
from sysml import *
from splines import *
import numpy as np

#rimuove le celle nell'array toRemove dal larmodel master
def removeCells(master, toRemove):
    V,CV = master
    return V,[cell for k,cell in enumerate(CV) if not (k in toRemove)]

#definisce un lar model con le dimenzioni descritte dal size patterns
def assemblyDiagram(sizePatterns):
    return assemblyDiagramInit([len(f) for f in sizePatterns])(sizePatterns)

#mostra gli indici della cella rispetto alla lista CV del larmodel
def mostraNumeroCelle(larmodel, colore, grandezza):
    hpc = SKEL_1(STRUCT(MKPOLS(larmodel)))
    hpc = cellNumbering (larmodel,hpc)(range(len(larmodel[1])),colore,grandezza)
    VIEW(hpc)

#somma tutti gli elementi di una lista serve a ricavare le dimensioni massime
def sommatore(lista):
    res = .0
    for a in lista:
        res = a+res
    return res

def colort(r,g,b,t=1):
    return COLOR(Color4f([r/255.0, g/255.0, b/255.0, t]))


DRAW = COMP([VIEW,STRUCT,MKPOLS])

####################DETTAGLI#############

xporta=1
zporta=2

xfinestra=0.5
zfinestra=0.4
spigolo=0.3

xscala=(2.24)/2
yscala=2./2
zscala=3.6/2
primoblocco=(3.94-2.25-0.3)

#porta
zsezGrande=zporta*0.2-zporta*0.05
zsezPicola=zporta*0.05
modelloPorta=assemblyDiagram([[xporta],[spigolo],
    [ zsezGrande, zsezPicola, zsezGrande, zsezPicola, zsezGrande, zsezPicola, zsezGrande,zsezPicola, zsezGrande]])
#mostraNumeroCelle(modelloPorta, BROWN, 0.5)

#Ordino le celle con lo stesso colore
V,CV=modelloPorta
c=CV[::2]
c1=[cell for k,cell in enumerate(CV) if not k in c]
CV=c+c1
modelloPorta=[V,CV]
doorcellsamecolor=5

mdp=modelloPorta[:]
modelloPorta=MKPOLS(modelloPorta)

modelloPortaRuotato=assemblyDiagram([[spigolo], [xporta],
    [ zsezGrande, zsezPicola, zsezGrande, zsezPicola, zsezGrande, zsezPicola, zsezGrande,zsezPicola, zsezGrande]])
mdpr=[modelloPortaRuotato[0],CV]

#per qualche assurda ragione i colori devono essere messi alla fine
generalDoor=modelloPorta[ doorcellsamecolor:]+AA(colort(61,43,31))(modelloPorta[:doorcellsamecolor])

xsezfinG= xfinestra*.2
xsezfinP=xfinestra*.05
zfinestraP=zfinestra*0.067
zfinestraG=zfinestra*0.2
finestra=assemblyDiagram([[xsezfinP,xsezfinG,xsezfinP*2,xsezfinG, xsezfinP],[0.05,spigolo-0.1, 0.05]
    ,[zfinestraP,zfinestraG,zfinestraP,zfinestraG,zfinestraP]])
finestra=removeCells(finestra, [16,18, 46, 48, 26, 28, 56, 58])
#mostraNumeroCelle(finestra, BLACK,0.1)

V,CV=finestra
c=[cell for k,cell in enumerate(CV) if k in [21,47,19,45]]
c1=[cell for k,cell in enumerate(CV) if not k in c]
CV=c+c1
finestra=[V,CV]
cellsamecolor=len(c)


finestraRuotata=assemblyDiagram([[0.05,spigolo-0.1, 0.05],[xsezfinP,xsezfinG,xsezfinP*2,xsezfinG, xsezfinP]
    ,[zfinestraP,zfinestraG,zfinestraP,zfinestraG,zfinestraP]])
finestraRuotata=removeCells(finestraRuotata, [6,8, 16,18,56, 58, 66, 68])
#mostraNumeroCelle(finestraRuotata,BLACK, 0.1)

V,CV=finestraRuotata
c=[cell for k,cell in enumerate(CV) if k in [27,37,29,39]]
c1=[cell for k,cell in enumerate(CV) if not k in c]
CV=c+c1
finestraRuotata=[V,CV]
cellsamecolorA=len(c)

w=MKPOLS(finestra)
wr=MKPOLS(finestraRuotata)

generalWindow=AA(colort(125,120,114))(w[cellsamecolor:])+ AA(colort(204,236,244,0.1))(w[:cellsamecolor])


####################INGRESSO################

ingressoPattern=[[0.3, primoblocco, 0.3, xscala*2, 0.3], [0.3, yscala*2, 0.3, 3.10,0.3, 1.64], [0.3, 3.,0.3]]
ingresso=assemblyDiagram(ingressoPattern)
#mostraNumeroCelle(ingresso,RED,1)

#costruisco la lista degli oggetti da eliminare
lista=[ 4,7,10,13,16,22,25,28,31,34,58]

#aggiungo gli spazi interni vuoti della parte destra
lista= lista+[70,40,64]

ingresso=removeCells(ingresso, lista)#rimuove i primi 2 blocchi per ciascuna riga, altezza
#DRAW(ingresso)


#le porte dell'ingresso e del salone
portaSalone= assemblyDiagram([[0.3],[1.5,xporta,(3.10-2.5)],[zporta,1]])
portaPrincipale=assemblyDiagram([[0.3,xporta,(2.14-0.3-1)],[.3],[zporta,1]])

ingresso = diagram2cell(portaSalone,ingresso,68) 
ingresso = diagram2cell(portaPrincipale,ingresso,49)
#mostraNumeroCelle(ingresso,CYAN,2)
# cella portaSalone=76
#cella portaprincipale=82
cellStarterColor=len(ingresso[1])

#finestre dell'androne
facciataInterna=assemblyDiagram([[(primoblocco*0.5-(xfinestra/2)), xfinestra,(primoblocco*0.5-(xfinestra/2))], [0.3], [3*0.3, 0.4, 3*0.7-0.4] ])
facciataEsterna=assemblyDiagram([[xscala*0.5-xfinestra-0.15, xfinestra, 0.3, xfinestra, xscala*0.5-xfinestra-0.15],[0.3],[3*0.3, 0.4, 3*0.7-0.4]])
#mostraNumeroCelle(ingresso, GREEN, 2)
ingresso= diagram2cell(mdp, ingresso, 82)
ingresso=diagram2cell(mdpr,ingresso, 76)
ingresso=diagram2cell(facciataEsterna, ingresso, 44)
ingresso=diagram2cell(facciataInterna, ingresso, 14)
cellStarterColorw=len(ingresso[1])
ingresso=diagram2cell(finestra, ingresso, 129)
ingresso=diagram2cell(finestra, ingresso, 120)
ingresso=diagram2cell(finestra, ingresso, 114)

mostraNumeroCelle(ingresso, BLACK, 1)
#129 114 120 finestre

w=MKPOLS(ingresso)

generalWindow=AA(colort(125,120,114))(ingresso[cellsamecolor:])+ AA(colort(204,236,244,0.1))(w[:cellsamecolor])


############CAMERA###########
cameraPattern= [[0.3, 3.94, 0.3], [0.3,2.84,0.3],[0.3, 3, 0.3]]
camera=assemblyDiagram(cameraPattern)
#mostraNumeroCelle(camera, CYAN,2)

porta= assemblyDiagram([[2.9,1,.04],[.3],[2,1]])
porta2=assemblyDiagram([[.3],[1.46,1,0.38],[2,1]])
camera = diagram2cell(porta,camera,10)
camera = diagram2cell(porta2,camera,21)
camera= diagram2cell(facciataEsterna,camera, 15)
camera=diagram2cell(finestra, camera,46)
camera=diagram2cell(finestra,camera, 40)
mostraNumeroCelle(camera, CYAN,0.3)


camera=removeCells(camera,[27,12,33])



i=0.
for val in ingressoPattern[1]:
    i = i+val 

camera= [larTranslate([0,i,0])(camera[0]), camera[1]]


######################Parte Destra della casa#######################
destraPattern=[[0.3, 3.73, 0.3, 3,0.3],[.3, 5.88, .3, 4.3, .3],[0.3, 3, 0.3]]
destra= assemblyDiagram(destraPattern)
#mostraNumeroCelle(destra, GREEN, 1)
destra=removeCells(destra,[73,22,19,25,4,7,10,40,55,70,58,34,49])

destra=[larTranslate([sommatore(ingressoPattern[0]),0,0])(destra[0]), destra[1]]

casa=STRUCT(MKPOLS(ingresso)+MKPOLS(camera)+MKPOLS(destra))

#VIEW(casa)


######################exercise2###########################

def simmetria3D(vec):
    return [ [[x*-1,y,z] for [x,y,z] in vec[0]], vec[1]] 

########genero elementi simmetrici#############
ingressoS=simmetria3D(ingresso)
destraS=simmetria3D(destra)
cameraS=simmetria3D(camera)

casa=STRUCT(MKPOLS(ingresso)+MKPOLS(camera)+MKPOLS(destra)+MKPOLS(ingressoS)+MKPOLS(cameraS)+MKPOLS(destraS) )

houseRowSkel = SKEL_1(STRUCT([casa, T(3)(sommatore(ingressoPattern[2]))]*5))
#LE MOLTIPLICAZIONI DI OGGETTI GRANDI LE FACCIO CON PYPLASM PER L'EFFICENZA
houseRow = STRUCT([casa, T(3)(sommatore(ingressoPattern[2]))]*5)


##############piano terra################################

x= sommatore(ingressoPattern[0]) + sommatore(destraPattern[0])
y=sommatore(destraPattern[1])
epsi=0.0
ypsi=1
high=3.6
a1 = BEZIER(S1)([[x*-1,0,0],[x*-1,0,high]])
a2 = BEZIER(S1)([[x,0,0],[x,0,high]])
a3 = BEZIER(S1)([[(x*-1-epsi),y+epsi,0],[(x*-1-ypsi), y+ypsi , high*.60]
    ,[(x*-1-epsi),y+epsi,high]])
a4 = BEZIER(S1)([[x+epsi, y+epsi,0],[(x*+1+ypsi), y+ypsi , high*.60]
    ,[x+epsi, y+epsi,high]])
a5 = BEZIER(S1)([[0,y,0],[0,y,high]])
controls = [a1,a3,a5,a4,a2]
knots = [0,0,0,1,2,3,3,3]
tbspline = TBSPLINE(S2)(2)(knots)(controls)
dom = larModelProduct([larDomain([10]),larDom(knots)])
muroNord = larMap(tbspline)(dom)
houseRow=T(3)(sommatore(ingressoPattern[2]))(houseRow)

muroNordStruct=STRUCT(MKPOLS(muroNord))

ground = T([1,3])([-x,-0.3])(CUBOID([x*2, y, 0.3]))


###############facciata#####################
facciata= assemblyDiagram([[x-0.3*x, .3*x*2, x-x*.3],[0.3], [high*.65, high-high*.65]])
#mostraNumeroCelle(facciata, GREEN, 2)
facciata=removeCells(facciata, [2])
facciata= [larTranslate([-x,0,0])(facciata[0]),facciata[1]]
facciataStruct=STRUCT(MKPOLS(facciata))

complesso=STRUCT([houseRow, muroNordStruct, facciataStruct, ground])
VIEW(complesso)