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


V=[[3,3],[19,3],[19,7],[15,7],[7,7],[3,7],[4,4],[6,4],[7,4],[15,4],[16,4],[18,4],[4,6],[6,6],[7,6],[15,6],[16,6],[18,6]]
CV=[[0,6,12,5],[5,12,13,4],[4,13,7,8,14],[4,14,15,3],[3,16,17,2],[3,16,10,9,15],[2,17,11,1],[0,6,7,8,9,10,11,1]]
sfloor= V,CV
model=SKELETON(1)(STRUCT(MKPOLS(sfloor)))

#riempimento=checkModel(larCylinder(5,))

ruota=larCrown([5,10])([6,40])
VIEW(STRUCT(MKPOLS(ruota)))

Vmod,cmod= larIntervals([5])([2*PI, 5])
print Vmod
print cmod
model= Vmod,cmod

VIEW(STRUCT(MKPOLS(model)))

tick=T([1,2])([-0.025,0.55])(CUBOID([0.05,0.2]))
VIEW(STRUCT(NN(12)([tick,R([1,2])(PI/6) ])))

V = [[3,3],[6,3],[13,3],[9,5],[12,5],[13,5],[15,5],[3,7],[6,7],[3,10],
[5,10],[9,10],[3,12],[5,12],[9,11],[12,11],[15,11]]
#celle
FV = [[9,10,13,12,9],[0,1,8,7,0],[1,2,5,4,3,11,10,9,7,8,1],[3,4,15,14,11,3],[4,5,6,16,15,4]]

#ricava spigoli
#[ 9,10,13,12]
#[10,13,12,9 ]

#crea modello 2D a partire dai vertici e dalle facce
model = MKPOLS((V,FV))
VIEW(STRUCT(model))
ex = EXPLODE(1.5,1.5,1)(model)
VIEW(ex)

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
print EV
evx = STRUCT((MKPOLS((V,EV))))
VIEW(evx)

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

#VIEW(STRUCT(MKPOLS(mod11D)))

modtot = STRUCT(MKPOLS(mod1D))
VIEW(modtot)

#VIEW(EXPLODE(1.3,1.3,1.3)(MKPOLS(mod11D) + MKPOLS(mod2D) + MKPOLS(mod1D)))