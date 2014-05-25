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

def colort(r,g,b,t=1):
	return COLOR(Color4f([r/255.0, g/255.0, b/255.0, t]))


DRAW = COMP([VIEW,STRUCT,MKPOLS])

#definisco le misure
xporta=1
zporta=2

xfinestra=0.5
zfinestra=0.4
spigolo=0.3


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

modelloPortaRuotato=assemblyDiagram([[spigolo], [xporta],
    [ zsezGrande, zsezPicola, zsezGrande, zsezPicola, zsezGrande, zsezPicola, zsezGrande,zsezPicola, zsezGrande]])
mdpr=[modelloPortaRuotato[0],CV]

modelloPorta=MKPOLS(modelloPorta)
#per qualche assurda ragione i colori devono essere messi alla fine
generalDoor=modelloPorta[ doorcellsamecolor:]+AA(colort(61,43,31))(modelloPorta[:doorcellsamecolor])

#finestra
xsezfinG= xfinestra*.2
xsezfinP=xfinestra*.05
zfinestraP=zfinestra*0.067
zfinestraG=zfinestra*0.2
finestra=assemblyDiagram([[xsezfinP,xsezfinG,xsezfinP*2,xsezfinG, xsezfinP],[0.05,spigolo-0.1, 0.05]
    ,[zfinestraP,zfinestraG,zfinestraP,zfinestraG,zfinestraP]])

finestra=removeCells(finestra, [16,18, 46, 48, 26, 28, 56, 58])
#mostraNumeroCelle(finestra, BLACK,0.1)


#21, 47, 19, 45
V,CV=finestra
c=[cell for k,cell in enumerate(CV) if k in [21,47,19,45]]
c1=[cell for k,cell in enumerate(CV) if not k in c]
CV=c+c1
finestra=[V,CV]
cellsamecolor=len(c)

finestraRuotata=assemblyDiagram([[0.05,spigolo-0.1, 0.05],[xsezfinP,xsezfinG,xsezfinP*2,xsezfinG, xsezfinP]
    ,[zfinestraP,zfinestraG,zfinestraP,zfinestraG,zfinestraP]])
finestraRuotata=removeCells(finestraRuotata, [6,8, 16,18,56, 58, 66, 68])
mostraNumeroCelle(finestraRuotata,BLACK, 0.1)

V,CV=finestraRuotata
c=[cell for k,cell in enumerate(CV) if k in [27,37,29,39]]
c1=[cell for k,cell in enumerate(CV) if not k in c]
CV=c+c1
finestraRuotata=[V,CV]
cellsamecolorA=len(c)

finestra=MKPOLS(finestra)
finestraRuotata=MKPOLS(finestraRuotata)

generalWindow=AA(colort(125,120,114))(finestra[cellsamecolor:])+ AA(colort(204,236,244,0.1))(finestra[:cellsamecolor])
generalWindowR=AA(colort(125,120,114))(finestraRuotata[cellsamecolorA:])+ AA(colort(204,236,244,0.1))(finestraRuotata[:cellsamecolorA])
VIEW( STRUCT(generalWindow) )
VIEW( STRUCT(generalWindowR))