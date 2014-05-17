import sys
sys.path.insert(0, '/home/di-folca/lar-cc/lib/py/')
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

def sommatore(lista):
    res = .0
    for a in lista:
        res = a+res
    return res

DRAW = COMP([VIEW,STRUCT,MKPOLS])

####################INGRESSO################
ingressoPattern=[[0.3, (3.94-2.25-0.3), 0.3, 2.24, 0.3], [0.3, 2, 0.3, 3.10,0.3, 1.64], [0.3,3,0.3]]
ingresso=assemblyDiagram(ingressoPattern)

ingresso=removeCells(ingresso, range( (len(ingressoPattern[2])*len(ingressoPattern[1])*2) ) )#rimuove i primi 2 blocchi per ciascuna riga, altezza
#mostraNumeroCelle(ingresso,RED,1)
ingresso=removeCells(ingresso, [0,1,2,3,4,5,18,19,20,21,22,23,28,34])
#DRAW(ingresso)

#la porta dell'ingresso
#mostraNumeroCelle(ingresso, CYAN, 2)
porta= assemblyDiagram([[0.3],[1.5,1,(3.10-2.5)],[2,1]])
ingresso = diagram2cell(porta,ingresso,32)
ingresso=removeCells(ingresso,[41])
#mostraNumeroCelle(ingresso,CYAN,2)
porta2=assemblyDiagram([[0.3,1,(2.14-0.3-1)],[.3],[2,1]])
ingresso = diagram2cell(porta2,ingresso,13)
#mostraNumeroCelle(ingresso,CYAN,2)
ingresso=removeCells(ingresso,[45])

############CAMERA###########
cameraPattern= [[0.3, 3.94, 0.3], [0.3,2.84,0.3],[0.3, 3, 0.3]]
camera=assemblyDiagram(cameraPattern)
#mostraNumeroCelle(camera, CYAN,2)

porta= assemblyDiagram([[2.9,1,.04],[.3],[2,1]])
porta2=assemblyDiagram([[.3],[1.46,1,0.38],[2,1]])
camera = diagram2cell(porta,camera,10)
camera = diagram2cell(porta2,camera,21)
#mostraNumeroCelle(camera, CYAN,2)
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
mostraNumeroCelle(facciata, GREEN, 2)
facciata=removeCells(facciata, [2])
facciata= [larTranslate([-x,0,0])(facciata[0]),facciata[1]]
facciataStruct=STRUCT(MKPOLS(facciata))

complesso=STRUCT([houseRow, muroNordStruct, facciataStruct, ground])
VIEW(complesso)